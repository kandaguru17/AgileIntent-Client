import { GET_PROJECT_TASKS } from './types';
import axios from 'axios'

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