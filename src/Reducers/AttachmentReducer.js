import { GET_ALL_ATTACHMENTS, ADD_ATTACHMENTS, DOWNLOAD_ATTACHMENT, DELETE_ATTACHMENT } from '../Actions/types'


export const attachmentReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_ATTACHMENTS:
            const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['fileId']]: it })));
            return { ...arrToObj };

        case ADD_ATTACHMENTS:
            const addAttachmentsArrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['fileId']]: it })));
            return { ...state, ...addAttachmentsArrToObj };

        case DOWNLOAD_ATTACHMENT:
            return { ...state };

        case DELETE_ATTACHMENT:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;

        default:
            return state;
    }
}