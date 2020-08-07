import axios from "axios";
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* signUpSaga(action) {
    yield console.log('Inside saga');

    const authData = {
        email: action.userDetails.email,
        password: action.userDetails.password, 
        returnSecureToken: true
    };

    const userLookupData = {
        username: action.userDetails.username,
        email: action.userDetails.email
    }
    const userlookupUrl = "https://policy-management-app-97345.firebaseio.com/userLookup.json";
    const queryParams = '?orderBy="username"&equalTo="' + action.userDetails.username + '"';
    const lookupUrl = userlookupUrl + queryParams;
    console.log(lookupUrl);
    const userDetailsUrl = "https://policy-management-app-97345.firebaseio.com/userDetails.json";

    const signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA52UmrfJZWgm5etszmAwZnw246lVplDy0";

    try {

        const userResponse = yield axios.get(lookupUrl);
        console.log(userResponse);
        console.log(Object.entries(userResponse.data).length);
        if(Object.entries(userResponse.data).length === 0) {
            console.log('inside if loop');
            yield axios.post(signUpUrl, authData);
            yield axios.post(userlookupUrl, userLookupData);
            yield axios.post(userDetailsUrl, action.userDetails);
            console.log('Before closing if loop');
            yield put(actions.signUpSucceed(action.userDetails));

        }
        console.log('response data');
    } catch (error) {
        console.log("Error occurred");
        console.log(error);
    }
}


export function* signInSaga (action) {
    const userlookupUrl = "https://policy-management-app-97345.firebaseio.com/userLookup.json";
    const queryParams = '?orderBy="username"&equalTo="' + action.username + '"';
    const lookupUrl = userlookupUrl + queryParams;
    console.log(lookupUrl);

    const signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA52UmrfJZWgm5etszmAwZnw246lVplDy0";


    try {
        const userResponse = yield axios.get(lookupUrl);
        console.log(userResponse);

        if(Object.entries(userResponse.data).length > 0) {
            console.log('Inside if loop');
            let userResponseObject;
            for(let key in userResponse.data) {
                userResponseObject = userResponse.data[key];
            }
            console.log('email', userResponseObject['email']);

            const credentials = {
                email: userResponseObject['email'],
                password: action.password
            };
            const response = yield axios.post(signInUrl, credentials);
            console.log(response);

        } else {
            alert('No such user');
        }       

    } catch(error) {
        alert(error);
    }

}
