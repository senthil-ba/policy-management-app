import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    policyDetails: null
}

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

const purchaseSuccess = (state, action) => {

    console.log('Inside purchase success');
    console.log('purchase details', action.policyDetails);
    const updatedPolicyDetails = updateObject(state.policyDetails, action.policyDetails);
    const updatedState = {
        policyDetails: updatedPolicyDetails
    }
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    console.log('inside reducer'); 
    console.log(action.type); 
    console.log(JSON.stringify(action.userDetails));
    switch (action.type) {
        case actionTypes.PURCHASE_POLICY_SUCCESS: return purchaseSuccess(state,action);

        default: 
            return state;
    }
};

export default reducer;