import * as actionTypes from './actionTypes';

export const signUp = (userDetails) => {
    return {
        type: actionTypes.SIGNUP_USER,
        userDetails: userDetails
    }
};

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START        
    }
};

export const signUpSucceed = (token, userId, username) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: token, 
        userId: userId,
        username: username
    }
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
};

export const signIn = (username, password) => {
    console.log('User Name', username);
    return {
        type: actionTypes.SIGNIN_USER, 
        username: username,
        password: password
    }
}

export const signInStart = () => {
    return {
        type: actionTypes.SIGNIN_START        
    }
};

export const signInSuccess = (token, userId, username) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS, 
        idToken: token, 
        userId: userId, 
        username: username
    }
}

export const signInFail = error => {

    console.log('Inside signin fail action'); 
    console.log(error);
    return {
        type: actionTypes.SIGNIN_FAIL,
        error: error      
    }
};

export const checkAuthTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT, 
        expirationTime: expirationTime
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    } 
};

export const updateUser = userDetails => {
    return {
        type: actionTypes.UPDATE_USER,
        userDetails: userDetails
    };
};

export const updateUserStart = () => {
    return {
        type: actionTypes.UPDATE_USER_START        
    };
};

export const updateUserSuccess = (token, userId, username) => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        idToken: token, 
        userId: userId,
        username: username
    };
};

export const updateUserFail = (error) => {
    return {
        type: actionTypes.UPDATE_USER_FAIL,
        error: error
    };
};


export const fetchUser = username => {
    return {
        type: actionTypes.FETCH_USER,
        username: username, 
    };
};

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START        
    };
};

export const fetchUserSuccess = userDetails => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        userDetails: userDetails
    };
};

export const fetchUserFail = error => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    };
};