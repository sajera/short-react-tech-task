
// outsource dependencies
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

// local dependencies
import { unsubscribeAction, subscribeAction, getRecord, updateRecord, hasRecord } from './saga';

/* HOOK */
export default controller => {
    const name = controller.name;
    const subscriber = controller.subscriber;
    if (!hasRecord(name)) { updateRecord(name, { subscriber, ready: false, channel: null }); }
    const dispatch = useDispatch();
    const subscribe = useCallback(() => dispatch(subscribeAction(controller)), [controller, dispatch]);
    const unsubscribe = useCallback(() => dispatch(unsubscribeAction(controller)), [controller, dispatch]);
    useEffect(() => subscribe() && (() => unsubscribe()), [subscribe, unsubscribe]);
    return getRecord(name).ready;
};
