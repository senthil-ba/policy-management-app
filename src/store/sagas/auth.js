import axios from "axios";
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* signUpSaga(action) {
    yield put(actions.signUpStart);

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
            const response = yield axios.post(signUpUrl, authData);

            const expirationDate = yield new Date(
                new Date().getTime() + response.data.expiresIn * 1000
            );

            yield localStorage.setItem("token", response.data.idToken); 
            yield localStorage.setItem("expirationDate", expirationDate); 
            yield localStorage.setItem("userId", response.data.localId);

            yield axios.post(userlookupUrl, userLookupData);
            yield axios.post(userDetailsUrl, action.userDetails);
            console.log('Before closing if loop');
            yield put(actions.signUpSucceed(response.data.idToken, response.data.localId));
        } else {
            yield put(actions.signUpFail('User is already present. Please use different user/email id'));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.signUpFail(error.response.data.error));
    }
}


export function* signInSaga (action) {
    yield put(actions.signInStart);
    const userlookupUrl = "https://policy-management-app-97345.firebaseio.com/userLookup.json";
    const queryParams = '?orderBy="username"&equalTo="' + action.username + '"';
    const lookupUrl = userlookupUrl + queryParams;
    const signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA52UmrfJZWgm5etszmAwZnw246lVplDy0";
    try {
        const userResponse = yield axios.get(lookupUrl);
        if(Object.entries(userResponse.data).length > 0) {
            let userResponseObject;
            for(let key in userResponse.data) {
                userResponseObject = userResponse.data[key];
            }
            const credentials = {
                email: userResponseObject['email'],
                password: action.password,
                returnSecureToken: true
            };
            const response = yield axios.post(signInUrl, credentials);

            const expirationDate = yield new Date(
                new Date().getTime() + response.data.expiresIn * 1000
            );

            yield localStorage.setItem("token", response.data.idToken); 
            yield localStorage.setItem("expirationDate", expirationDate); 
            yield localStorage.setItem("userId", response.data.localId);
            yield put(
                actions.signInSuccess(response.data.idToken, response.data.localId)
            );
        } else {
            yield put(actions.signInFail('No such User'));
        }
    } catch(error) {
        yield put(actions.signInFail(error.response.data.error));
    }
}
