
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';

// local dependencies
import { Logo } from '../../images';
import { SIGN_IN } from '../../constants/routes';
import { BoxLoader } from '../../components/preloader';
import { selector, initializeAction } from './reducer';

class EmailConfirmation extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        initialized: PropTypes.bool.isRequired,
        isTokenValid: PropTypes.bool.isRequired,
    };

    // static defaultProps = { };

    componentDidMount = () => this.props.init(this.props.match.params);

    render () {
        const { initialized, isTokenValid } = this.props;
        return <div className="d-flex align-items-center justify-content-around h-100">
            <Container className="bg-white" style={{ width: 480, maxWidth: '95%' }}>
                <BoxLoader active={!initialized}>
                    <Row className="align-items-center">
                        <Col xs="12" className="text-center pt-3 mb-3">
                            <Logo className="img-fluid" style={{ width: 100 }} />
                            <h3 className="pt-1 text-center text-primary"> RAD Dummy </h3>
                        </Col>
                        <Col xs="12" tag="h3" className="text-center mb-4">
                            Email verification
                        </Col>
                        { !isTokenValid ? <Col
                            tag="h5"
                            xs={{ size: 10, offset: 1 }}
                            className="text-justify text-danger mb-4"
                        >
                            Whoa there! The request token for this page is invalid.
                            It may have already been used, or expired because it is too old.
                            Please go back and try again.
                            <br/><br/>
                            <small className="text-muted"> it was probably just a mistake </small>
                        </Col> : <Col
                            tag="h4"
                            xs={{ size: 10, offset: 1 }}
                            className="text-center text-success mb-4"
                        >
                            The email address was successfully verified. Welcome aboard !
                        </Col>}
                        <Col xs="12" className="text-right mb-3">
                            <Link to={SIGN_IN.LINK()}> Sign In </Link>
                        </Col>
                    </Row>
                </BoxLoader>
            </Container>
        </div>;
    }
}

export default connect(
    state => ({
        initialized: selector(state).initialized,
        isTokenValid: selector(state).isTokenValid,
    }),
    dispatch => ({
        init: options => dispatch(initializeAction(options)),
    }),
)(EmailConfirmation);
