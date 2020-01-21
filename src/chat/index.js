
// outsource dependencies
import _ from 'lodash';
import moment from 'moment';
import { Container, FormGroup, Input } from 'reactstrap';
import React, { memo, useCallback, useEffect, useMemo } from 'react';

// local dependencies
import controller from './controller';
import { useController } from '../services/controller';

import { Avatar } from '../images';
import Fa from '../components/fa-icon';
import { BoxLoader } from '../components/preloader';

// TODO not resolved scroll behavior
// adding new messages - should be scroll bottom
// lazy load - should be improved
import ScrollToTop from '../components/scroll-to-top';

import Message from './message';

// configure
const hasDifferentDates = (x, y) => {
    const a = moment.unix(x);
    const b = moment.unix(y);
    return a.day() !== b.day() || a.month() !== b.month() || a.year() !== b.year();
};

export default memo(() => {
    const [
        { initialized, disabled, list, total, message },
        { initialize, updateCtrl, updateFilter, addMessage },
        isControllerConnected
    ] = useController(controller);
    // NOTE initialize business logic
    useEffect(() => { initialize(); }, [initialize]);
    // NOTE prepare page actions
    const handleUpdateMessage = useCallback(e => updateCtrl({ message: e.target.value }), [updateCtrl]);
    const handleAddMessage = useCallback(e => {
        e.preventDefault();
        addMessage({});
    }, [addMessage]);
    const handleScrollChange = useCallback(() => {
        if (!disabled && _.size(list) < total) {
            updateFilter({ loadMore: true });
        }
    }, [updateFilter, disabled, list, total]);
    // NOTE prepare list for view insert date delimiters
    const messages = useMemo(() => {
        const results = [];
        list.map((item, index) => {
            results.push(item);
            const next = _.get(list, index + 1, null);
            if (next && hasDifferentDates(item.timestamp, next.timestamp)) {
                results.push({
                    direction: 'delimiter',
                    timestamp: next.timestamp,
                    id: _.uniqueId('delimiter'),
                });
            }
            return null;
        });
        return results.reverse();
    }, [list]);


    return <BoxLoader active={!initialized || !isControllerConnected}>
        <div className="d-flex align-items-center justify-content-center h-100">
            <div style={{ width: 500, height: 800 }} className="mw-100 mh-100 d-flex flex-column">
                <div className="d-flex flex-row flex-grow-0 align-items-center border-bottom bg-white">
                    <Fa icon="chevron-left" size="lg" tag="strong" className="text-primary m-3" />
                    <Avatar src={null} style={{ height: 35, width: 35 }} className="d-flex flex-grow-0 m-1 ml-3"/>
                    <div className="flex-grow-1 p-1 ml-2">
                        <strong> User name </strong>
                        <p className="text-muted m-0"> User is typing... </p>
                    </div>
                </div>
                <ScrollToTop disabled={true} onUpdate={handleScrollChange}>
                    <Container fluid className="bg-white">
                        { messages.map(item => <Message key={item.id} {...item} />) }
                    </Container>
                </ScrollToTop>
                <form onSubmit={handleAddMessage} className="flex-row flex-grow-0 border-top">
                    <FormGroup className="mb-0">
                        <Input
                            name="text"
                            id="message"
                            value={message}
                            autoComplete="off"
                            disabled={disabled}
                            className="border-0"
                            placeholder="Send message..."
                            onChange={handleUpdateMessage}
                        />
                    </FormGroup>
                </form>
            </div>
        </div>
    </BoxLoader>;
});
