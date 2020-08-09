import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectPath: "/"
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

const signUpStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const signUpSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        authRedirectPath: "/"
    });
};

const signUpFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false, 
        authRedirectPath: "/signup"
    });
};

const signInStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const signInSuccess = (state, action) => {
    console.log('Inside signin success');
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        authRedirectPath: "/home"
    });
};

const signInFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signUpStart(state,action);
        case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state,action);
        case actionTypes.SIGNUP_FAIL: return signUpFail(state,action);
        
        case actionTypes.SIGNIN_START: return signInStart(state,action);
        case actionTypes.SIGNIN_SUCCESS: return signInSuccess(state,action);
        case actionTypes.SIGNIN_FAIL: return signInFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);

        default: 
            return state;
    }
};

export default reducer;