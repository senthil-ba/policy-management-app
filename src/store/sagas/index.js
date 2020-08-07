import * as actionTypes from '../actions/actionTypes'; 
import {takeEvery, all} from 'redux-saga/effects';
import { signUpSaga } from './auth';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.SIGNUP_USER, signUpSaga)
    ]);
}