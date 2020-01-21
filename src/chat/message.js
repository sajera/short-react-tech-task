
// outsource dependencies
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import { Alert, Row, Col } from 'reactstrap';

// local dependencies
import Fa from '../components/fa-icon';

// configure
const DIRECTION = {
    IN: 'in',
    OUT: 'out',
    DELIMITER: 'delimiter',
};
const STATUS = {
    SENT: 'sent',
    READ: 'read',
    RECEIVED: 'received',
};

export const Message = memo(({ direction, ...attr }) => {
    const View = useMemo(() => {
        switch (direction) {
            default: return null;
            case DIRECTION.IN: return MessageIn;
            case DIRECTION.OUT: return MessageOut;
            case DIRECTION.DELIMITER: return Delimiter;
        }
    }, [direction]);
    return <View {...attr} />;
});
Message.propTypes = {
    direction: PropTypes.oneOf(Object.keys(DIRECTION).map(key => DIRECTION[key])).isRequired,
};
Message.DIRECTION = DIRECTION;
export default Message;

const StatusIcon = memo(({ status }) => {
    switch (status) {
        default: return null;
        case STATUS.SENT: return null;
        case STATUS.READ: return <Fa icon="check-double" className="text-primary" />;
        case STATUS.RECEIVED: return <Fa icon="check" className="text-muted" />;
    }
});
StatusIcon.propTypes = {
    status: PropTypes.oneOf(Object.keys(STATUS).map(key => STATUS[key])).isRequired,
};

const Delimiter = memo(({ timestamp }) => <div className="d-flex flex-row align-items-center justify-content-center">
    <Alert color="dark" className="p-1">
        <strong> { moment.unix(timestamp).format('DD MMMM YYYY') } </strong>
    </Alert>
</div>);
Delimiter.propTypes = {
    timestamp: PropTypes.string.isRequired,
};

const MessageIn = memo(({ text, status, timestamp }) => <Row noGutters>
    <Col xs={{ size: 10 }}>
        <Alert color="info" className="d-inline-block p-1">
            <h4> { text } </h4>
            <p className="m-0">
                <StatusIcon status={status} />
                &nbsp;&nbsp;
                { moment.unix(timestamp).format('H:MM') }
            </p>
        </Alert>
    </Col>
</Row>);
MessageIn.propTypes = {
    ...StatusIcon.propTypes,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
};

const MessageOut = memo(({ text, status, timestamp }) => <Row noGutters>
    <Col xs={{ size: 10, offset: 2 }} className="text-right">
        <Alert color="warning" className="d-inline-block text-left p-1">
            <h4> { text } </h4>
            <p className="text-right m-0">
                { moment.unix(timestamp).format('H:MM') }
                &nbsp;&nbsp;
                <StatusIcon status={status} />
            </p>
        </Alert>
    </Col>
</Row>);
MessageOut.propTypes = {
    ...StatusIcon.propTypes,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
};
