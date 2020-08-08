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

export const signUpSucceed = (token, userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: token, 
        userId: userId
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

export const signInSuccess = (token, userId) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS, 
        idToken: token, 
        userId: userId
    }
}

export const signInFail = error => {
    return {
        type: actionTypes.SIGNIN_FAIL,
        error: error      
    }
};