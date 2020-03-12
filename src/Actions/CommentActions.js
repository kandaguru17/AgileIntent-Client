import axios from 'axios'
import history from '../history';
import { reset } from 'redux-form'
import { ADD_COMMENT, GET_ALL_COMMENTS, GET_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from './types'
import { APP_URI } from '../AppConst'

const ROOT_URL = `${APP_URI}/api/comments`;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}


export const addComment = (projectId, projectTaskId, formValues) => async dispatch => {
    try {
        const res = await axios.post(`${ROOT_URL}/${projectId}/${projectTaskId}/`, formValues, { headers })
        dispatch({ type: ADD_COMMENT, payload: res.data });
        dispatch(reset('commentForm'));
        dispatch({ type: 'ERROR', payload: {} })
        history.push(`/project/${projectId}/projectTask/${projectTaskId}`);

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}


export const getComment = (projectId, projectTaskId, commentId) => async dispatch => {
    try {
        const res = await axios.get(`${ROOT_URL}/${projectId}/${projectTaskId}/${commentId}`, { headers })
        dispatch({ type: GET_COMMENT, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} })

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}


export const getAllComments = (projectId, projectTaskId) => async dispatch => {
    try {
        const res = await axios.get(`${ROOT_URL}/${projectId}/${projectTaskId}`, { headers });
        dispatch({ type: GET_ALL_COMMENTS, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} })

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}

export const deleteComment = (projectId, projectTaskId, commentId) => async dispatch => {

    try {
        await axios.delete(`${ROOT_URL}/${projectId}/${projectTaskId}/${commentId}`, { headers });
        dispatch({ type: DELETE_COMMENT, payload: commentId });
        dispatch({ type: 'ERROR', payload: {} })
        history.push(`/project/${projectId}/projectTask/${projectTaskId}`)
    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config });
    }
}


export const editComment = (projectId, projectTaskId, commentId, formValues) => async dispatch => {

    try {
        const res = await axios.put(`${ROOT_URL}/${projectId}/${projectTaskId}/${commentId}`, formValues, { headers });
        dispatch({ type: EDIT_COMMENT, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });
        history.push(`/project/${projectId}/projectTask/${projectTaskId}`);
    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config });
    }
}