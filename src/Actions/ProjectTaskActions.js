import { GET_PROJECT_TASKS, CREATE_PROJECT_TASK, GET_PROJECT_TASK } from './types';
import axios from 'axios'
import history from '../history'

const ROOT_URL = `http://localhost:8080/api/backlog`;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}


export const getAllProjectTasks = (projectId) => async dispatch => {
    try {
        const res = await axios.get(`${ROOT_URL}/${projectId}`, { headers });
        dispatch({ type: GET_PROJECT_TASKS, payload: res.data });

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

        const res = await axios.post(`http://localhost:8080/api/backlog/${projectId}`, formValues, { headers });
        dispatch({ type: CREATE_PROJECT_TASK, payload: res.data });
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
    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }

}
