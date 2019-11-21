import { LOGIN ,LOG_OUT} from '../Actions/types'

const initialState = {
    isAuthenticated: false,
    user: null
}

export const securityReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const { isAuthenticated, user } = action.payload;
            return { ...state, isAuthenticated, user }
        case LOG_OUT:
            return {...state,isAuthenticated:false,user:null}
        default:
            return state;
    }

}