import axios from 'axios';
import { GET_ALL_ATTACHMENTS, DOWNLOAD_ATTACHMENT, ADD_ATTACHMENTS, DELETE_ATTACHMENT } from './types';

const ROOT_URL = `http://localhost:8080/api/attachments`;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'multipart/form-data'
}


export const getAllAttachments = (projectId, projectTaskId) => async dispatch => {
    try {
        const res = await axios.get(`${ROOT_URL}/${projectId}/${projectTaskId}/`, { headers });
        dispatch({ type: GET_ALL_ATTACHMENTS, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} })


    } catch (err) {

        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}

export const downloadAttachment = (downloadUri) => async dispatch => {
    try {
        //await axios.get(``, { headers });

        const res = await axios({
            url: `${downloadUri}`,
            method: 'GET',
            responseType: 'blob', // important
        }, { headers });


        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', res.headers['x-suggested-filename']); //or any other extension
        document.body.appendChild(link);
        link.click();
        dispatch({ type: DOWNLOAD_ATTACHMENT });
        dispatch({ type: 'ERROR', payload: {} })


    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}


export const uploadAttachment = (projectId, projectTaskId, files) => async dispatch => {
    try {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        const res = await axios.post(`${ROOT_URL}/multipleUpload/${projectId}/${projectTaskId}`, formData, { headers });
        dispatch({ type: ADD_ATTACHMENTS, payload: res.data });
        dispatch({ type: 'ERROR', payload: {} })
    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}

export const deleteAttachment = (projectId, projectTaskId, fileId) => async dispatch => {
    try {
        await axios.delete(`${ROOT_URL}/${projectId}/${projectTaskId}/${fileId}`, { headers });
        dispatch({ type: DELETE_ATTACHMENT, payload: fileId });
        dispatch({ type: 'ERROR', payload: {} })

    } catch (err) {
        console.log(err);
        if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
        if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
        if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
        return dispatch({ type: 'ERROR', payload: err.config })
    }
}

