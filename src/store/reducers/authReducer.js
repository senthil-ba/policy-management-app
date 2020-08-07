import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    userDetails: null
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

const signUpSuccess = (state, action) => {
    const updatedUserDetails = updateObject(state.userDetails, action.userDetails);

    const updatedState = {
        userDetails: updatedUserDetails
    }
    console.log('In reducer');
    console.log(JSON.stringify(action.userDetails));
    return updateObject(state, updatedState);

};

const signInSuccess = (state, action) => {
    console.log('Inside signin success');
    return state;

};

const reducer = (state = initialState, action) => {
    console.log('inside reducer'); 
    console.log(action.type); 
    console.log(JSON.stringify(action.userDetails));
    switch (action.type) {
        case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state,action);
        case actionTypes.SIGNIN_SUCCESS: return signInSuccess(state,action);
        default: 
            return state;
    }
};

export default reducer;