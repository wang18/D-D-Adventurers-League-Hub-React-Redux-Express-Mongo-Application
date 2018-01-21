import {userLoggedIn} from "./auth";
import api from '../api';
import {USER_FETCHED} from '../types';

export const signup = data => dispatch =>
    api.user.signup(data).then(user => {
        localStorage.bookwormJWT = user.token;
        dispatch(userLoggedIn(user));
    });

export const userFetched = user =>({
    type: USER_FETCHED,
    user
});

export const fetchCurrentUser=()=>(dipatch)=>
    api.user.fetchCurrentUser().then(user => dipatch(userFetched(user)));