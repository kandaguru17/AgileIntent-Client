import { GET_PROJECT_TASKS, CREATE_PROJECT_TASK, GET_PROJECT_TASK, DELETE_PROJECT_TASK, UPDATE_PROJECT_TASK } from '../Actions/types'


export const projectTaskReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_PROJECT_TASKS:
            const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['projectTaskSequence']]: it })));
            return { ...arrToObj };

        case CREATE_PROJECT_TASK:
            return { ...state, [action.payload.projectTaskSequence]: action.payload };

        case GET_PROJECT_TASK:
            return { ...state, [action.payload.projectTaskSequence]: action.payload };

        case UPDATE_PROJECT_TASK:
            return { ...state, [action.payload.projectTaskSequence]: action.payload };

        case DELETE_PROJECT_TASK:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;

        default:
            return state;
    }

}