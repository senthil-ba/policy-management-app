import * as actions from '../actions/index';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* purchasePolicySaga(action) {
    yield put(actions.purchasePolicyStart());
    const policyDetailsUrl = "https://policy-management-app-97345.firebaseio.com/policyDetails.json?auth=" + action.token;
    const policyData = action.policyDetails;

    try {
        const response = yield axios.post(policyDetailsUrl, policyData);
        const updatedPolicyData = { ...policyData, id: response.data['name'] };
        yield put(actions.purchasePolicySuccess(updatedPolicyData));
    } catch (error) {
        yield put(actions.purchasePolicyFail(error));
    }
}

export function* fetchPoliciesSaga(action) {
    yield put(actions.fetchPoliciesStart());

    const queryParams = "?auth=" + action.token + '&orderBy="userId"&equalTo="' +
        action.userId + '"';
    const policyDetailsUrl = "https://policy-management-app-97345.firebaseio.com/policyDetails.json" + queryParams;

    try {
        const response = yield axios.get(policyDetailsUrl);

        const fetchedPolicies = [];
        for (let key in response.data) {
            fetchedPolicies.push({
                ...response.data[key],
                id: key
            });
        }

        yield put(actions.fetchPoliciesSuccess(fetchedPolicies));
    } catch (error) {
        yield put(actions.fetchPoliciesFail(error));
    }
}