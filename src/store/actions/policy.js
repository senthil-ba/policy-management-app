import * as actionTypes from './actionTypes';

export const purchasePolicy = (policyDetails) => {
    console.log(JSON.stringify(policyDetails));
    return {
        type: actionTypes.PURCHASE_POLICY,
        policyDetails: policyDetails
    }

};

export const purchasePolicySuccess = (policyDetails) => {
    return {
        type: actionTypes.PURCHASE_POLICY_SUCCESS,
        policyDetails: policyDetails
    }
}