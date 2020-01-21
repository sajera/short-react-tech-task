
// outsource dependencies
import _ from 'lodash';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { takeEvery, put, call, delay, select, debounce } from 'redux-saga/effects';

// local dependencies
import { instanceAPI } from '../services/request';
import { prepareController } from '../services/controller';

// configure
const initial = {
    page: 0,
    total: 0,
    list: [],
    message: '',
    // page meta
    disabled: false,
    initialized: false,
};

export const controller = prepareController({
    initial,
    prefix: 'task-chart',
    types: ['INITIALIZE', 'UPDATE_FILTER', 'ADD_MESSAGE'],
    subscriber: function * () {
        yield takeEvery(controller.TYPE.INITIALIZE, initializeSaga);
        yield takeEvery(controller.TYPE.ADD_MESSAGE, addMessageSaga);
        yield debounce(0.1 * 1000, controller.TYPE.UPDATE_FILTER, updateFilterSaga);
    }
});
export default controller;

function * initializeSaga ({ type, payload }) {
    // NOTE case for allowed reinitialize
    yield put(controller.action.clearCtrl());
    // NOTE please look at good animation
    yield delay(1.8 * 1000);
    // NOTE initial request
    yield call(updateFilterSaga, {});
    // NOTE any case initialized
    yield put(controller.action.updateCtrl({ initialized: true }));
}

function * updateFilterSaga ({ type, payload }) {
    const loadMore = _.get(payload, 'loadMore', false);
    yield put(controller.action.updateCtrl({ ...payload, disabled: true }));
    try {
        const actual = yield select(controller.selector);
        const newPage = !loadMore ? 0 : actual.page + 1;
        const { content, totalElements, page } = yield call(instanceAPI.getFilteredPage, { page: newPage, size: 20 });
        // console.log('%c result ', 'color: #FF6766; font-weight: bolder; font-size: 12px;'
        //     , '\n content:', content
        //     , '\n totalElements:', totalElements
        //     , '\n page:', page
        // );
        const list = !loadMore ? content : actual.list.concat(content);
        yield put(controller.action.updateCtrl({ list, total: totalElements, page }));
    } catch ({ message }) {
        yield call(toastr.error, 'Error', message);
    }
    yield put(controller.action.updateCtrl({ disabled: false }));
}

function * addMessageSaga () {
    yield put(controller.action.updateCtrl({ disabled: true }));
    try {
        const { message } = yield select(controller.selector);
        // NOTE may be we should validate the message ...
        yield call(instanceAPI.addMessage, {
            text: message,
            status: 'sent',
            direction: 'out',
            id: _.uniqueId('new'),
            timestamp: moment().format('X')
        });
        yield put(controller.action.updateCtrl({ message: '' }));
        // NOTE update list
        yield call(updateFilterSaga, { page: 0 });
    } catch ({ message }) {
        yield call(toastr.error, 'Error', message);
    }
    yield put(controller.action.updateCtrl({ disabled: false }));
}
