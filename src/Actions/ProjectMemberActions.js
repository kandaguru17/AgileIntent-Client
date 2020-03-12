import axios from 'axios';
import { LIST_PROJECT_MEMBERS, ADD_PROJECT_MEMBER, REMOVE_PROJECT_MEMBER } from './types';



import { APP_URI } from '../AppConst'

const ROOT_URL = `${APP_URI}/api/members`
const headers = {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'
}

export const listProjectMembers = (projectId) => async dispatch => {
    try {

        const res = await axios.get(`${ROOT_URL}/${projectId}`, { headers });
        dispatch({ type: LIST_PROJECT_MEMBERS, payload: res.data })
        dispatch({ type: 'ERROR', payload: {} })

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })

    }
}


export const addProjectMember = (formData, projectId) => async dispatch => {
    try {

        const res = await axios.post(`${ROOT_URL}/${projectId}`, formData, { headers });
        dispatch({ type: ADD_PROJECT_MEMBER, payload: res.data })
        dispatch({ type: 'ERROR', payload: {} })

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })

    }
}


export const removeProjectMember = (formData, projectId) => async dispatch => {
    try {
        console.log(formData)
        const res = await axios.delete(`${ROOT_URL}/${projectId}`, { data: formData, headers: headers });
        dispatch({ type: REMOVE_PROJECT_MEMBER, payload: res.data })
        dispatch({ type: 'ERROR', payload: {} })

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })

    }
}


