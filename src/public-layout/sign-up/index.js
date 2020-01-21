
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
import { FORGOT_PASSWORD, SIGN_IN } from '../../constants/routes';
import { isEmail, isName } from '../../services/validation.service';
import { selector, clearAction, initializeAction, updateAction, setMetaAction } from './reducer';

// configure
export const FORM_NAME = 'signUpForm';

class SignUp extends PureComponent {
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
            <Container className="bg-white" style={{ width: 420, maxWidth: '95%' }}>
                <Form onSubmit={handleSubmit}>
                    <BoxLoader active={!this.props.pageInitialized}>
                        <Row className="align-items-center">
                            <Col xs="12" className="text-center pt-3 mb-3">
                                <Logo className="img-fluid" style={{ width: 100 }} />
                                <h3 className="pt-1 text-center text-primary"> RAD Dummy </h3>
                            </Col>
                            <Col xs="12" tag="h3" className="text-center mb-4">
                                Please enter your data
                            </Col>
                            <Col xs={{ size: 10, offset: 1 }}>
                                <Field
                                    name="name"
                                    type="text"
                                    component={RFInput}
                                    disabled={disabled}
                                    placeholder="Username"
                                    label={<strong className="required-asterisk"> Name </strong>}
                                />
                            </Col>
                            <Col xs={{ size: 10, offset: 1 }}>
                                <Field
                                    type="text"
                                    name="email"
                                    component={RFInput}
                                    disabled={disabled}
                                    placeholder="Email"
                                    label={<strong className="required-asterisk"> Email Address </strong>}
                                />
                            </Col>
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
                                    placeholder="Confirmation"
                                    label={<strong className="required-asterisk"> Confirm Password </strong>}
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
                                    Sign Up
                                </Button>
                            </Col>
                            <Col xs="12" className="text-center mb-3">
                                <Link to={SIGN_IN.LINK()}>
                                    <strong> Sign In </strong>
                                </Link>
                            </Col>
                            <Col xs="12" className="text-center mb-3">
                                <Link to={FORGOT_PASSWORD.LINK()}>
                                    <strong> Forgot your password ? </strong>
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
        if (!isName(values.name)) {
            errors.name = 'Name is required and should contain at least 3 symbol character';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!isEmail(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must contain at least 8 symbol character';
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    }
})(SignUp));
