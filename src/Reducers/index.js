import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { projectReducer, errorReducer } from './ProjectReducer'
import { projectTaskReducer } from './ProjectTaskReducer'
import { securityReducer } from './SecurityReducer'


const reducers = combineReducers({
    form: formReducer,
    projects: projectReducer,
    projectTasks: projectTaskReducer,
    error: errorReducer,
    auth: securityReducer
});


//redux dev tools config
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;