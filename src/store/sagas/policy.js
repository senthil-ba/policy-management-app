import * as actions from '../actions/index';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* purchasePolicySaga(action) {
    yield put(actions.purchasePolicyStart());
    const policyDetailsUrl = "https://policy-management-app-97345.firebaseio.com/policyDetails.json";
    const policyData = action.policyDetails;

    try {
        const response = yield axios.post(policyDetailsUrl, policyData);
        const updatedPolicyData = {...policyData, id: response.data['name']};
        console.log('purchasesaga' , updatedPolicyData);
        yield put(actions.purchasePolicySuccess(updatedPolicyData));
    } catch (error) {
        alert(error);
        yield put(actions.purchasePolicyFail(error));
    }
}

export function* fetchPoliciesSaga(action) {
    yield put(actions.fetchPoliciesStart());
    const policyDetailsUrl = "https://policy-management-app-97345.firebaseio.com/policyDetails.json";

    try {
        const response = yield axios.get(policyDetailsUrl);
        console.log('policy fetch response', response);
        const fetchedPolicies = [];
        for (let key in response.data) {
            fetchedPolicies.push({
                ...response.data[key], 
                id: key
            });
        }
        console.log('policy fetch response', fetchedPolicies);
        
        yield put(actions.fetchPoliciesSuccess(fetchedPolicies));
    } catch (error) {
        alert(error);
        yield put(actions.fetchPoliciesFail(error));
    }

}