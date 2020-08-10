import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    policiesDetails: [],
    loading: false,
    purchased: false
}

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

const purchasePolicyStart = (state, action) => {
    return updateObject(state, {loading: true, purchased: false});
}

const purchasePolicySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        purchased: true,
        policiesDetails: state.policiesDetails.concat(action.policyDetails)
    });
};

const purchasePolicyFail = (state, action) => {
    return updateObject(state, {loading: false, purchased: false});
}

const fetchPoliciesStart = (state, action) => {
    return updateObject(state, {loading: true, purchased: false});
}

const fetchPoliciesSuccess = (state, action) => {
    
    return updateObject(state, {
        policiesDetails: action.policiesDetails,
        loading: false,
        purchased: false
    });
}

const fetchPoliciesFail = (state, action) => {
    return updateObject(state, {loading: false, purchased: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_POLICY_START: return purchasePolicyStart(state,action);
        case actionTypes.PURCHASE_POLICY_SUCCESS: return purchasePolicySuccess(state,action);
        case actionTypes.PURCHASE_POLICY_FAIL: return purchasePolicyFail(state,action);
        case actionTypes.FETCH_POLICIES_START: return fetchPoliciesStart(state,action);
        case actionTypes.FETCH_POLICIES_SUCCESS: return fetchPoliciesSuccess(state,action);
        case actionTypes.FETCH_POLICIES_FAIL: return fetchPoliciesFail(state,action);

        default: 
            return state;
    }
};

export default reducer;