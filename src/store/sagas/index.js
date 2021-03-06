import * as actionTypes from '../actions/actionTypes';
import { takeEvery, all } from 'redux-saga/effects';
import { signUpSaga, signInSaga, checkAuthTimeoutSaga, logoutSaga, authCheckStateSaga, updateUserSaga, fetchUserSaga } from './auth';
import { purchasePolicySaga, fetchPoliciesSaga } from './policy';


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.SIGNUP_USER, signUpSaga),
        takeEvery(actionTypes.SIGNIN_USER, signInSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.UPDATE_USER, updateUserSaga),
        takeEvery(actionTypes.FETCH_USER, fetchUserSaga)
    ]);
}

export function* watchPolicy() {
    yield all([
        takeEvery(actionTypes.PURCHASE_POLICY, purchasePolicySaga),
        takeEvery(actionTypes.FETCH_POLICIES, fetchPoliciesSaga)
    ]);
}