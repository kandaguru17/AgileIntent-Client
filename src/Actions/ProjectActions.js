import axios from 'axios';
import history from '../history'
import {
    GET_PROJECTS,
    GET_PROJECT,
    CREATE_PROJECT,
    DELETE_PROJECT
} from './types'

import { APP_URI } from '../AppConst'

const ROOT_URL = `${APP_URI}/api`
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}

export const getAllProjects = () => async (dispatch) => {
    try {
        const res = await axios.get(`${ROOT_URL}/project`, { headers });
        dispatch({ type: GET_PROJECTS, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });

    } catch (err) {

        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }

}

export const createProject = (formValues) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${ROOT_URL}/project`, { ...formValues }, { headers });
            dispatch({ type: CREATE_PROJECT, payload: res.data });
            dispatch({ type: 'ERROR', payload: {} });
            history.push('/dashboard');

        } catch (err) {
            console.log(err);
            if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
            if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
            if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
            return dispatch({ type: 'ERROR', payload: err.config })
        }

    }
}


export const getProject = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${ROOT_URL}/project/${id}`, { headers });
        dispatch({ type: GET_PROJECT, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });
    } catch (err) {

        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}

export const updateProject = (id, formValues) => async (dispatch) => {

    try {
        const res = await axios.put(`${ROOT_URL}/project/${id}`, formValues, { headers });
        dispatch({ type: 'UPDATE_PROJECT', payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });
        history.push('/dashboard');

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}



export const deleteProject = (id) => async (dispatch) => {

    try {

        await axios.delete(`${ROOT_URL}/project/${id}`, { headers });
        dispatch({ type: DELETE_PROJECT, payload: id });
        dispatch({ type: 'ERROR', payload: {} });
        history.push('/dashboard');

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }

}

