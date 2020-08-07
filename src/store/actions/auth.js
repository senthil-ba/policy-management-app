import * as actionTypes from './actionTypes';
 
export const signUp = (userDetails) => {
   
   console.log(JSON.stringify(userDetails));
    return{
        type: actionTypes.SIGNUP_USER,
        userDetails: userDetails
    }
};

export const signUpSucceed = (userDetails) => {
    console.log('Inside signup succeed');
    console.log(userDetails);
    return {
        type: actionTypes.SIGNUP_SUCCESS, 
        userDetails: userDetails
    }
};