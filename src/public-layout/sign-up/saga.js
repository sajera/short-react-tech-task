
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { fork, takeEvery, cancel, delay, call, put } from 'redux-saga/effects';

// local dependencies
import { historyPush } from '../../store';
import { SIGN_IN } from '../../constants/routes';
import { TYPE, setMetaAction } from './reducer';
import { instancePUB } from '../../services/request.service';

function * initializeSaga () {
    console.log('%c SIGN_UP initialize ', 'color: #FF6766; font-weight: bolder; font-size: 12px;');
    // NOTE do nothing
    yield put(setMetaAction({ initialized: true }));
}

function * updateSaga ({ type, ...data }) {
    yield put(setMetaAction({ expectAnswer: true, errorMessage: null }));
    try {
        console.log('%c SIGN_UP update ', 'color: #FF6766; font-weight: bolder; font-size: 12px;'
            , '\n formData:', data
        );
        yield call(instancePUB, { method: 'POST', url: '/auth/token/sign-up', data });
        yield call(toastr.success, 'Sign Up', 'Data was successfully sent');
        yield delay(3 * 1000);
        yield call(historyPush, SIGN_IN.LINK());
    } catch ({ message }) {
        yield call(toastr.error, 'Error', message);
        yield put(setMetaAction({ errorMessage: message }));
    }
    yield put(setMetaAction({ expectAnswer: false }));
}

/**
 * connect page sagas
 *
 * @private
 */
function * activityTasks () {
    yield takeEvery(TYPE.UPDATE, updateSaga);
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
}

/**
 * define activity behavior
 * on component unmount we fire action CLEAR to bring reducer data to default and here
 * we renew all sagas to prevent executing actions which does not finish yet
 */
export function * sagas () {
    let activity = yield fork(activityTasks);
    yield takeEvery(TYPE.CLEAR, function * () {
        yield cancel(activity);
        activity = yield fork(activityTasks);
    });
}

export default sagas;
