import { GET_PROJECT_TASKS } from '../Actions/types'


export const projectTaskReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_PROJECT_TASKS:
            const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['projectTaskSequence']]: it })));
            return { ...arrToObj }

        default:
            return state;
    }

}