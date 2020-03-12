import { GET_PROJECT_TASKS, CREATE_PROJECT_TASK, GET_PROJECT_TASK, DELETE_PROJECT_TASK, UPDATE_PROJECT_TASK } from './types';
import axios from 'axios'
import history from '../history'
import { APP_URI } from '../AppConst'

const ROOT_URL = `${APP_URI}/api/backlog`
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}


export const getAllProjectTasks = (projectId) => async dispatch => {
    try {
        const res = await axios.get(`${ROOT_URL}/${projectId}`, { headers });
        dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });

    } catch (err) {

        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })

    }

}

export const createProjectTask = (projectId, formValues) => async (dispatch) => {

    try {
        const res = await axios.post(`${ROOT_URL}/${projectId}`, formValues, { headers });
        dispatch({ type: CREATE_PROJECT_TASK, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });
        history.push(`/project/${projectId}/projectTask`)
    }
    catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}


export const getProjectTask = (projectId, projectTaskId) => async dispatch => {
    try {
        const res = await axios.get(`${ROOT_URL}/${projectId}/projectTask/${projectTaskId}`, { headers });
        dispatch({ type: GET_PROJECT_TASK, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });
    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }

}

export const deleteProjectTask = (projectId, projectTaskId) => async dispatch => {
    try {
        await axios.delete(`${ROOT_URL}/${projectId}/projectTask/${projectTaskId}`, { headers });
        dispatch({ type: DELETE_PROJECT_TASK, payload: projectTaskId });
        dispatch({ type: 'ERROR', payload: {} });

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}


export const updateProjectTask = (projectId, projectTaskId, formValues) => async dispatch => {
    try {

        const res = await axios.put(`${ROOT_URL}/${projectId}/projectTask/${projectTaskId}`, formValues, { headers });
        dispatch({ type: UPDATE_PROJECT_TASK, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });
        history.push(`/project/${projectId}/projectTask/${projectTaskId}`)

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }

}



export const getAssignedProjectTasks = () => async dispatch => {
    try {

        const res = await axios.get(`${ROOT_URL}/currentUser`, { headers });
        dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} });

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }

}

