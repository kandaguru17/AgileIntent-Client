import {
    GET_PROJECTS,
    GET_PROJECT,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from '../Actions/types'


export const projectReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['projectIdentifier']]: it })))
            return { ...state, ...arrToObj }

        case CREATE_PROJECT:
            return { ...state, [action.payload.projectIdentifier]: action.payload }

        case GET_PROJECT:
            return { ...state, [action.payload.projectIdentifier]: action.payload }

        case UPDATE_PROJECT:
            return { ...state, [action.payload.projectIdentifier]: action.payload }

        case DELETE_PROJECT:
            const newState = { ...state }
            delete newState[action.payload]
            return newState

        default: return state;
    }

}


export const errorReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ERROR':
            return action.payload;

        default: return state;
    }
}



