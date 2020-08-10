import axios from "axios";

import { put, call, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    yield call([localStorage, "removeItem"], "customerId");
    yield call([localStorage, "removeItem"], "username");
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

    const userDetailsUrl = "https://policy-management-app-97345.firebaseio.com/userDetails.json";
    const signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA52UmrfJZWgm5etszmAwZnw246lVplDy0";

    try {
        const userLookupResponse = yield checkIsUserPresentInDB(action.userDetails.username);

        if (Object.entries(userLookupResponse.data).length === 0) {
            //if user is not present then signup in firebase
            const response = yield axios.post(signUpUrl, authData);

            const expirationDate = yield new Date(
                new Date().getTime() + response.data.expiresIn * 1000
            );
            const customerId = getCustomerId();

            yield localStorage.setItem("token", response.data.idToken);
            yield localStorage.setItem("expirationDate", expirationDate);
            yield localStorage.setItem("userId", response.data.localId);
            yield localStorage.setItem("username", action.userDetails.username);
            yield localStorage.setItem("customerId", customerId);

            //add the details in user details
            const userResponse = yield axios.post(userDetailsUrl, { ...action.userDetails, customerId });
            
            //unique record of user details. This is required for fetching data
            const userRecordId = userResponse.data.name;
            
            const userlookupUrl = "https://policy-management-app-97345.firebaseio.com/userLookup.json";
            //store all the details specific to user
            yield axios.post(userlookupUrl, { ...userLookupData, customerId, userRecordId });

            yield put(actions.signUpSucceed(response.data.idToken, response.data.localId, action.userDetails.username, customerId));
        } else {
            yield put(actions.signUpFail('User is already present. Please use different user/email id'));
        }
    } catch (error) {
        yield put(actions.signUpFail(error.response));
    }
};

function* checkIsUserPresentInDB(username) {
    const userlookupUrl = "https://policy-management-app-97345.firebaseio.com/userLookup.json";
    const queryParams = '?orderBy="username"&equalTo="' + username + '"';
    const lookupUrl = userlookupUrl + queryParams;
    return yield axios.get(lookupUrl);;
}

function getCustomerId() {
    //3 digit number
    const randomNumber = Math.random() * 1000;
    let customerId = '' + Math.floor(randomNumber);
    while (customerId.length < 3) {
        customerId = '0' + customerId;
    }
    return 'R-' + customerId;
};

export function* signInSaga(action) {
    yield put(actions.signInStart);

    const signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA52UmrfJZWgm5etszmAwZnw246lVplDy0";
    try {
        const userLookupResponse = yield checkIsUserPresentInDB(action.username);
        
        if (Object.entries(userLookupResponse.data).length > 0) {
            let userResponseObject;
            for (let key in userLookupResponse.data) {
                userResponseObject = userLookupResponse.data[key];
            }
            const credentials = {
                email: userResponseObject['email'],
                password: action.password,
                returnSecureToken: true
            };

            try {
                const response = yield axios.post(signInUrl, credentials);
                if (!response) {
                    throw new Error("Authentication Failed");
                }
                const expirationDate = yield new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );

                yield localStorage.setItem("token", response.data.idToken);
                yield localStorage.setItem("expirationDate", expirationDate);
                yield localStorage.setItem("userId", response.data.localId);
                yield localStorage.setItem("username", action.username);
                yield localStorage.setItem("customerId", userResponseObject['customerId']);
                yield put(
                    actions.signInSuccess(response.data.idToken, response.data.localId, action.username, userResponseObject['customerId'])
                );
            } catch (error) {
                yield put(actions.signInFail(error));
            }
        } else {
            throw new Error("No Such User");
        }
    } catch (error) {
        yield put(actions.signInFail(error));
    }
};


export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            yield put(actions.logout);
        } else {
            const userId = yield localStorage.getItem("userId");
            const username = yield localStorage.getItem("username");
            const customerId = yield localStorage.getItem("customerId");
            yield put(actions.signInSuccess(token, userId, username, customerId));
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
};

export function* updateUserSaga(action) {
    yield put(actions.updateUserStart);

    try {
        const username = yield localStorage.getItem("username");
        const userLookupResponse = yield checkIsUserPresentInDB(username);
        
        if (Object.entries(userLookupResponse.data).length > 0) {
            let userResponseObject;
            for (let key in userLookupResponse.data) {
                userResponseObject = userLookupResponse.data[key];
            }
            const userRecordId = userResponseObject['userRecordId'];
            console.log(userRecordId);
            const userDetailsUrl = "https://policy-management-app-97345.firebaseio.com/userDetails/" + userRecordId + ".json";
            yield axios.put(userDetailsUrl, action.userDetails);
            yield put(actions.updateUserSuccess(action.username, action.userDetails));
        } else {
            throw new Error('No such user in DB.');
        }        
    } catch (error) {
        console.log(error)
        yield put(actions.updateUserFail(error));
    }
}

export function* fetchUserSaga(action) {
    yield put(actions.fetchUserStart);
    try {
        const userLookupResponse = yield checkIsUserPresentInDB(action.username);      
        if (Object.entries(userLookupResponse.data).length > 0) {
            let userResponseObject;
            for (let key in userLookupResponse.data) {
                userResponseObject = userLookupResponse.data[key];
            }
            const userRecordId = userResponseObject['userRecordId'];
            console.log(userRecordId);
            const userDetailsUrl = "https://policy-management-app-97345.firebaseio.com/userDetails/" + userRecordId + '.json';
            const response = yield axios.get(userDetailsUrl);

            console.log(response);
            yield put(actions.fetchUserSuccess(response.data));
        } else {
            throw new Error("No User details available in DB");
        }
    } catch (error) {
        yield put(actions.fetchUserFail);
    }
}