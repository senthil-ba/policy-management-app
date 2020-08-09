import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
    userDetails: [],
    token: null,
    userId: null,
    username: null,
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
        username: action.username,
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
        username: action.username,
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

const updateUserStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const updateUserSuccess = (state, action) => {
    const updatedUserDetails = {...action.userDetails};

    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        username: action.username,
        userDetails: updatedUserDetails,
        error: null,
        loading: false,
        authRedirectPath: "/home"
    });
};

const updateUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false, 
        authRedirectPath: "/home"
    });
};

const fetchUserStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const fetchUserSuccess = (state, action) => {
    const updatedUserDetails = {...action.userDetails};

    return updateObject(state, {
        userDetails: updatedUserDetails,
        error: null,
        loading: false,
        authRedirectPath: "/home"
    });
};

const fetchUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false, 
        authRedirectPath: "/home"
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

        case actionTypes.UPDATE_USER_START: return updateUserStart(state,action);
        case actionTypes.UPDATE_USER_SUCCESS: return updateUserSuccess(state,action);
        case actionTypes.UPDATE_USER_FAIL: return updateUserFail(state,action);

        case actionTypes.FETCH_USER_START: return fetchUserStart(state,action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state,action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state,action);

        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);

        default: 
            return state;
    }
};

export default reducer;