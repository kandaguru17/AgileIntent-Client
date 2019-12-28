import jwt_decode from "jwt-decode";
import setHeaders from '../api/jsonAPI';
import history from '../history';
import axios from 'axios';
import { LOG_OUT, LOGIN, REGISTER } from './types'

const ROOT_URL = `http://localhost:8080/api`;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}

export const authenticate = (formValues) => async dispatch => {

    try {
        const res = await axios.post(`${ROOT_URL}/users/authenticate`, formValues, { headers });
        const { authenticated, token } = res.data;
        localStorage.setItem('token', token);
        setHeaders(token);
        const decoded = jwt_decode(token);
        dispatch({ type: LOGIN, payload: { isAuthenticated: authenticated, user: decoded } });
        dispatch({ type: 'ERROR', payload: {} })
        history.push('/dashboard');

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config });
    }
}

export const logOut = () => async dispatch => {
    try {
        localStorage.removeItem('token');
        setHeaders(null);
        dispatch({ type: LOG_OUT, payload: { isAuthenticated: false, user: {} } });
        dispatch({ type: 'ERROR', payload: {} });
        history.push('/auth');
    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config });
    }

}


export const registerUser = (formValues) => async dispatch => {
    try {
        await axios.post(`${ROOT_URL}/users/register`, formValues, { headers });
        dispatch({ type: REGISTER, payload: {} });
        dispatch({ type: 'ERROR', payload: {} });
        history.push('/success');
    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config });
    }

}