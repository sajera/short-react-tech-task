
// outsource dependencies
import { call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { TYPE, setMetaAction } from './reducer';
import { instancePUB } from '../../services/request.service';

function * initializeSaga ({ token }) {
    console.log('%c EMAIL_CONFIRMATION initialize ', 'color: #FF6766; font-weight: bolder; font-size: 12px;'
        , '\n token:', token
    );
    let isTokenValid;
    try {
        yield call(instancePUB, { method: 'POST', url: '/auth/token/confirmation', data: { token } });
        isTokenValid = true;
    } catch ({ message }) {
        isTokenValid = false;
    }
    yield put(setMetaAction({ initialized: true, isTokenValid }));
}

export function * sagas () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
}

export default sagas;
