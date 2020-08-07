import * as actionTypes from './actionTypes';

export const signUp = (userDetails) => {
    return {
        type: actionTypes.SIGNUP_USER,
        userDetails: userDetails
    }
};

export const signUpSucceed = (userDetails) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userDetails: userDetails
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