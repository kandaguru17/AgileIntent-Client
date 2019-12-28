import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { projectReducer, errorReducer } from './ProjectReducer';
import { projectTaskReducer } from './ProjectTaskReducer';
import { securityReducer } from './SecurityReducer';
import { commentReducer } from './CommentReducer';
import { attachmentReducer } from './AttachmentReducer';
import { LOG_OUT } from '../Actions/types';


const reducers = combineReducers({
    form: formReducer,
    projects: projectReducer,
    projectTasks: projectTaskReducer,
    comments: commentReducer,
    attachments: attachmentReducer,
    error: errorReducer,
    auth: securityReducer
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT)
        state = undefined;
    return reducers(state, action);
}


//redux dev tools config
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;