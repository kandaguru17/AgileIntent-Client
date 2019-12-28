import { ADD_COMMENT, GET_ALL_COMMENTS, DELETE_COMMENT, GET_COMMENT, EDIT_COMMENT } from '../Actions/types'

export const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return { ...state, [action.payload.id]: action.payload };

        case GET_ALL_COMMENTS:
            const arrToObj = Object.assign({}, ...action.payload.map(it => ({ [it['id']]: it })));
            return { ...arrToObj };

        case GET_COMMENT:
            return { ...state, [action.payload.id]: action.payload }

        case EDIT_COMMENT:
            return { ...state, [action.payload.id]: action.payload }

        case DELETE_COMMENT:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;

        default:
            return state;
    }
}