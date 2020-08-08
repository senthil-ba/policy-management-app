import * as actionTypes from './actionTypes';

export const purchasePolicy = (policyDetails) => {
    return {
        type: actionTypes.PURCHASE_POLICY,
        policyDetails: policyDetails
    };
};

export const purchasePolicyStart = () => {
    return {
        type: actionTypes.PURCHASE_POLICY_START
    };
}

export const purchasePolicySuccess = (policyDetails) => {
    return {
        type: actionTypes.PURCHASE_POLICY_SUCCESS,
        policyDetails: policyDetails
    };
}

export const purchasePolicyFail = error => {
    return {
        type: actionTypes.PURCHASE_POLICY_START,
        error: error
    };
}

export const fetchPolicies = () => {
    return {
        type: actionTypes.FETCH_POLICIES
    };
};

export const fetchPoliciesStart = () => {
    return {
        type: actionTypes.FETCH_POLICIES_START
    };
};

export const fetchPoliciesSuccess = (policiesDetails) => {
    return {
        type: actionTypes.FETCH_POLICIES_SUCCESS,
        policiesDetails: policiesDetails
    };
}

export const fetchPoliciesFail = error => {
    return {
        type: actionTypes.FETCH_POLICIES_FAIL,
        error: error
    };
};