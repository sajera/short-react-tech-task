
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
import { SIGN_UP, SIGN_IN } from '../../constants/routes';
import { isEmail } from '../../services/validation.service';
import { selector, clearAction, initializeAction, updateAction, setMetaAction } from './reducer';

// configure
export const FORM_NAME = 'forgotPasswordForm';

class ForgotPassword extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        clear: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        pageInitialized: PropTypes.bool.isRequired,
    };

    // static defaultProps = { };

    componentDidMount = () => this.props.init();

    componentWillUnmount = () => this.props.clear();

    render () {
        const { disabled, handleSubmit } = this.props;
        return <div className="d-flex align-items-center justify-content-around h-100">
            <Container className="bg-white" style={{ width: 390, maxWidth: '95%' }}>
                <Form onSubmit={handleSubmit}>
                    <BoxLoader active={!this.props.pageInitialized}>
                        <Row className="align-items-center">
                            <Col xs="12" className="text-center pt-3 mb-3">
                                <Logo className="img-fluid" style={{ width: 100 }} />
                                <h3 className="pt-1 text-center text-primary"> RAD Dummy </h3>
                            </Col>
                            <Col xs="12" tag="h2" className="text-center text-info">
                                Forgot password ?
                            </Col>
                            <Col xs="12" tag="h4" className="text-center text-muted mb-4">
                                Please enter your email address, and we&apos;ll send you a password reset email.
                            </Col>
                            <Col xs={{ size: 10, offset: 1 }}>
                                <Field
                                    type="text"
                                    name="email"
                                    component={RFInput}
                                    disabled={disabled}
                                    placeholder="Email Address"
                                />
                            </Col>
                            <Col xs={{ size: 10, offset: 1 }}>
                                <Button
                                    block
                                    outline
                                    type="submit"
                                    color="primary"
                                    className="mb-3"
                                    disabled={disabled}
                                    style={{ borderRadius: 20 }}
                                >
                                    Reset Password
                                </Button>
                            </Col>
                            <Col xs="6" className="text-center mb-3">
                                <Link to={SIGN_IN.LINK()}>
                                    <strong> Sign In </strong>
                                </Link>
                            </Col>
                            <Col xs="6" className="text-center mb-3">
                                <Link to={SIGN_UP.LINK()}>
                                    <strong> Sign Up </strong>
                                </Link>
                            </Col>
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
        pageInitialized: selector(state).initialized, // redux-form add "initialized" property as property of form
    }),
    dispatch => ({
        clear: () => dispatch(clearAction()),
        init: () => dispatch(initializeAction()),
        onSubmit: formData => dispatch(updateAction(formData)),
        clearError: () => dispatch(setMetaAction({ errorMessage: null })),
    }),
)(reduxForm({
    form: FORM_NAME,
    // enableReinitialize: true,
    validate: values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!isEmail(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    }
})(ForgotPassword));
