import axios from "axios";

import {put, call, delay} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    yield put(actions.logoutSuccess());
    

}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000); 
    yield put(actions.logout());
}

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
            console.log('Response from service')
            console.log(response);

            const expirationDate = yield new Date(
                new Date().getTime() + response.data.expiresIn * 1000
            );

            yield localStorage.setItem("token", response.data.idToken); 
            yield localStorage.setItem("expirationDate", expirationDate); 
            yield localStorage.setItem("userId", response.data.localId);
            yield localStorage.setItem("username", action.userDetails.username);

            yield axios.post(userlookupUrl, userLookupData);
            yield axios.post(userDetailsUrl, action.userDetails);

            console.log('Before closing if loop');
            yield put(actions.signUpSucceed(response.data.idToken, response.data.localId, action.userDetails.username));
        } else {
            yield put(actions.signUpFail('User is already present. Please use different user/email id'));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.signUpFail(error.response));
    }
};


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

            try{
                const response = yield axios.post(signInUrl, credentials);
                console.log('Response from service')
                console.log(response);
                if(!response) {
                    throw new Error("Authentication Failed");
                }
                const expirationDate = yield new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
    
                yield localStorage.setItem("token", response.data.idToken); 
                yield localStorage.setItem("expirationDate", expirationDate); 
                yield localStorage.setItem("userId", response.data.localId);
                yield localStorage.setItem("username", action.username);
                yield put(
                    actions.signInSuccess(response.data.idToken, response.data.localId, action.username)
                );
            } catch(error) {
                console.log('New error'); 
                console.log(error);
                yield put(actions.signInFail(error));
            }
        } else {
            throw new Error("No Such User");
        }
    } catch(error) {  
        
        yield put(actions.signInFail(error));
    }
};


export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token"); 
    if(!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if(expirationDate <= new Date()) {
            yield put(actions.logout);
        } else {
            const userId = yield localStorage.getItem("userId"); 
            const username = yield localStorage.getItem("username"); 
            yield put(actions.signInSuccess(token, userId, username)); 
            yield put (
                actions.checkAuthTimeout(
                 (expirationDate.getTime() - new Date().getTime()) / 1000   
                )
            );
        }
    }
};

export function* updateUserSaga(action) {
    const token = yield localStorage.getItem("token"); 
    const userId = yield localStorage.getItem("userId"); 
    yield put(actions.updateUserStart);
    const userDetailsUrl = "https://policy-management-app-97345.firebaseio.com/userDetails.json";
    const queryParams = '?orderBy="username"&equalTo="' + action.username + '"';
    try {
        yield axios.put(userDetailsUrl+queryParams, action.userDetails);
        yield put(actions.updateUserSuccess(token, userId, action.username));
    } catch(error) {
        console.log(error);
        yield put(actions.updateUserFail(error));
    }
}

export function* fetchUserSaga(action) {
    yield put(actions.fetchUserStart);
    const token = yield localStorage.getItem("token"); 
    const userId = yield localStorage.getItem("userId"); 
    console.log(token, userId);

    const userDetailsUrl = "https://policy-management-app-97345.firebaseio.com/userDetails.json";
    const queryParams = '?orderBy="username"&equalTo="' + action.username + '"';
    try {
        const response = yield axios.get(userDetailsUrl + queryParams);
        console.log(response);

        const fetchedUserDetails = [];
        for (let key in response.data) {
            fetchedUserDetails.push({
                ...response.data[key],
                id: key
            });
        }
        console.log('Fetched User details', fetchedUserDetails);

        yield put(actions.fetchUserSuccess(fetchedUserDetails));
    } catch(error) {
        yield put(actions.fetchUserFail);
    }   

}