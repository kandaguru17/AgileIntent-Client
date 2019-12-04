import { GET_PROJECT_TASKS, CREATE_PROJECT_TASK, GET_PROJECT_TASK } from '../Actions/types'


export const projectTaskReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_PROJECT_TASKS:
            const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['projectTaskSequence']]: it })));
            return { ...arrToObj }

        case CREATE_PROJECT_TASK:
            return { ...state, [action.payload.projectTaskSequence]: action.payload }

        case GET_PROJECT_TASK:
            return { ...state, [action.payload.projectTaskSequence]: action.payload }
        default:
            return state;
    }

}