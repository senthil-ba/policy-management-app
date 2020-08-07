import * as actions from '../actions/index';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* purchasePolicySaga(action) {
    const policyDetailsUrl = "https://policy-management-app-97345.firebaseio.com/policyDetails.json";
    const policyData = action.policyDetails;

    try {
        const response = axios.post(policyDetailsUrl, policyData);
        console.log('purchasesaga' , response);
        yield put(actions.purchasePolicySuccess(action.policyDetails));
    } catch (error) {
        alert(error);
    }
}