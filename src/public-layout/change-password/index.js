
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { Container, Row, Col, Button } from 'reactstrap';

// local dependencies
import { Logo } from '../../images';
import { RFInput } from '../../components/input';
import { BoxLoader } from '../../components/preloader';
import { SIGN_IN, FORGOT_PASSWORD } from '../../constants/routes';
import { selector, clearAction, initializeAction, updateAction, setMetaAction } from './reducer';

// configure
export const FORM_NAME = 'changePasswordForm';

class ChangePassword extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        clear: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        disabled: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        isTokenValid: PropTypes.bool.isRequired,
        pageInitialized: PropTypes.bool.isRequired,
    };

    // static defaultProps = { };

    componentWillUnmount = () => this.props.clear();

    componentDidMount = () => this.props.init(this.props.match.params);

    render () {
        const { disabled, isTokenValid, handleSubmit } = this.props;
        return <div className="d-flex align-items-center justify-content-around h-100">
            <Container className="bg-white" style={{ width: 480, maxWidth: '95%' }}>
                <Form onSubmit={handleSubmit}>
                    <BoxLoader active={!this.props.pageInitialized}>
                        <Row className="align-items-center">
                            <Col xs="12" className="text-center pt-3 mb-3">
                                <Logo className="img-fluid" style={{ width: 100 }} />
                                <h3 className="pt-1 text-center text-primary"> RAD Dummy </h3>
                            </Col>
                            <Col xs="12" tag="h3" className="text-center mb-4">
                                Change password
                            </Col>
                            { !isTokenValid ? <InvalidTokenMessage /> : <>
                                <Col xs={{ size: 10, offset: 1 }}>
                                    <Field
                                        name="password"
                                        type="password"
                                        component={RFInput}
                                        disabled={disabled}
                                        placeholder="Password"
                                        label={<strong className="required-asterisk"> Password </strong>}
                                    />
                                </Col>
                                <Col xs={{ size: 10, offset: 1 }}>
                                    <Field
                                        type="password"
                                        component={RFInput}
                                        disabled={disabled}
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        label={<strong className="required-asterisk"> Confirm Password </strong>}
                                    />
                                </Col>
                                <Col xs={{ size: 10, offset: 1 }} className="text-right mb-3">
                                    <Button
                                        block
                                        outline
                                        type="submit"
                                        color="primary"
                                        className="mb-3"
                                        disabled={disabled}
                                        style={{ borderRadius: 20 }}
                                    >
                                        Change password
                                    </Button>
                                </Col>
                                <Col xs="6" className="mb-3">
                                    <Link to={SIGN_IN.LINK()}> Sign In </Link>
                                </Col>
                                <Col xs="6" className="text-right mb-3">
                                    <Link to={FORGOT_PASSWORD.LINK()}> Forgot Password ? </Link>
                                </Col>
                            </>}
                        </Row>
                    </BoxLoader>
                </Form>
            </Container>
        </div>;
    }
}

export default connect(
    state => ({
        initialValues: selector(state).data,
        disabled: selector(state).expectAnswer,
        errorMessage: selector(state).errorMessage,
        isTokenValid: selector(state).isTokenValid,
        pageInitialized: selector(state).initialized, // redux-form add "initialized" property as property of form
    }),
    dispatch => ({
        clear: () => dispatch(clearAction()),
        init: options => dispatch(initializeAction(options)),
        onSubmit: formData => dispatch(updateAction(formData)),
        clearError: () => dispatch(setMetaAction({ errorMessage: null })),
    }),
)(reduxForm({
    form: FORM_NAME,
    // enableReinitialize: true,
    validate: values => {
        const errors = {};
        if (!values.password) {
            errors.password = 'Password is required';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Password confirmation is required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords confirmation do not match with password';
        }
        return errors;
    }
})(ChangePassword));

const InvalidTokenMessage = () => <Col xs={{ size: 10, offset: 1 }} tag="h5" className="text-justify text-danger mb-4">
    Whoa there! The request token for this page is invalid.
    It may have already been used, or expired because it is too old.
    Please go back to the
    <Link to={FORGOT_PASSWORD.LINK()}> forgot password page </Link>
    and try again.
    <br/><br/>
    <small className="text-muted"> it was probably just a mistake </small>
</Col>;
