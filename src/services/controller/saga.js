
// outsource dependencies
import { fork, takeEvery, cancel } from 'redux-saga/effects';

// NOTE specific saga actions to subscribe and unsubscribe controllers by annotation
const TYPE = (prefix => ({
    SUBSCRIBE: `${prefix}SUBSCRIBE`,
    UNSUBSCRIBE: `${prefix}UNSUBSCRIBE`,
}))('@CSD-action/');

// NOTE store to grab some specific private information about controller states
const CACHE = {};
export const getRecord = id => CACHE[id] || {};
export const hasRecord = id => Boolean(CACHE[id]);
export const updateRecord = (id, data) => CACHE[id] = { ...(CACHE[id] || {}), ...data };

export const subscribeAction = options => ({ payload: { ...options }, type: TYPE.SUBSCRIBE });
function * subscribeSaga ({ type, payload }) {
    // console.log(`%c ${type}: ${payload.name} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    //     , '\n payload:', payload
    //     , '\n CACHE:', getRecord(payload.name)
    // );
    if (getRecord(payload.name).channel) {
        console.error(`%c DUPLICATION ${payload.name} `, 'color: #FF6766; font-weight: bolder; font-size: 18px;'
            , '\n Please make sure you use only one instance of Controller within DOM in same time'
            , '\n CACHE:', getRecord(payload.name)
        );
    }
    const channel = yield fork(getRecord(payload.name).subscriber);
    updateRecord(payload.name, { ready: true, channel });
}

export const unsubscribeAction = options => ({ payload: { ...options }, type: TYPE.UNSUBSCRIBE });
function * unsubscribeSaga ({ type, payload }) {
    // console.log(`%c ${type}: ${payload.name} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    //     , '\n payload:', payload
    //     , '\n controller:', getRecord(payload.name)
    // );
    yield cancel(getRecord(payload.name).channel);
    updateRecord(payload.name, { ready: false, channel: null });
}

export function * sagas () {
    yield takeEvery(TYPE.SUBSCRIBE, subscribeSaga);
    yield takeEvery(TYPE.UNSUBSCRIBE, unsubscribeSaga);
}
