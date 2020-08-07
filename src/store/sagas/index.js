import * as actionTypes from '../actions/actionTypes'; 
import {takeEvery, all} from 'redux-saga/effects';
import { signUpSaga, signInSaga } from './auth';
import { purchasePolicySaga } from './policy';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.SIGNUP_USER, signUpSaga),
        takeEvery(actionTypes.SIGNIN_USER, signInSaga)
    ]);
}

export function* watchPolicy() {
    yield all([
        takeEvery(actionTypes.PURCHASE_POLICY, purchasePolicySaga)
    ]); 
}