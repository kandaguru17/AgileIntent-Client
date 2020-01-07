import { LIST_PROJECT_MEMBERS, ADD_PROJECT_MEMBER, REMOVE_PROJECT_MEMBER } from '../Actions/types'

export const projectMemberReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_PROJECT_MEMBERS:
            const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['id']]: it })));
            return { ...arrToObj };

        case ADD_PROJECT_MEMBER:
            return { ...state, [action.payload.id]: action.payload };

        case REMOVE_PROJECT_MEMBER:
            const newState = { ...state };
            delete newState[action.payload.id];
            return newState;

        default:
            return state;
    }
}