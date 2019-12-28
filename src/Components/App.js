import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import SecuredRoute from './SecuredRoute';


import Navbar from './Navbar/Navbar';
import ProjectList from './Project/ProjectList';
import CreateProject from './Project/CreateProject';
import EditProject from './Project/EditProject';
import ShowProject from './Project/ShowProject';
import DeleteProject from './Project/DeleteProject';
import Authentication from './Security/Authentication';
import setHeaders from '../api/jsonAPI'
import store from '../Reducers';
import { logOut } from '../Actions/SecurityActions'
import ProjectTaskList from './ProjectTask/ProjectTaskList';
import CreateProjectTask from './ProjectTask/CreateProjectTask';
import ProjectTaskDelete from './ProjectTask/ProjectTaskDelete';
import ProjectTaskEdit from './ProjectTask/ProjectTaskEdit';
import SampleComponent from './Security/SampleComponent';
import ProjectTaskDetails from './ProjectTask/ProjectTaskDetails';
import { Reponsive, Responsive } from 'semantic-ui-react';
import ErrorComponent from './Error/ErrorComponent'

const token = localStorage.token
if (token) {
  setHeaders(token);
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  //this is for user to stay in the app after log-in and preventing from entering the /auth route
  if (decoded.exp < currentTime)
    store.dispatch(logOut());

  store.dispatch(
    {
      type: 'LOGIN',
      payload: { isAuthenticated: true, user: decoded }
    });
}

class App extends Component {



  render() {



    return (
      <>
        <ErrorComponent />
        <Navbar />
        {
          /*public routes */
        }
        <Route path="/auth" exact component={ Authentication } />
        <Route path="/" exact render={ () => <h2>WELCOME</h2> } />
        <Route path="/success" exact component={ SampleComponent } />
        {
          /*secured routes  */
        }
        <Switch>
          <SecuredRoute exact path="/dashboard" component={ ProjectList } />
          <SecuredRoute exact path="/project/new" component={ CreateProject } />
          <SecuredRoute exact path="/project/edit/:id" component={ EditProject } />
          <SecuredRoute exact path="/project/delete/:id" component={ DeleteProject } />
          <SecuredRoute exact path='/project/:id' component={ ShowProject } />

          <SecuredRoute exact path='/project/:projectId/projectTask/' component={ ProjectTaskList } />
          <SecuredRoute exact path='/project/:projectId/new' component={ CreateProjectTask } />
          <SecuredRoute exact path='/project/:projectId/projectTask/:projectTaskId' component={ ProjectTaskDetails } />
          <SecuredRoute exact path='/project/:projectId/projectTask/delete/:projectTaskId/' component={ ProjectTaskDelete } />
          <SecuredRoute exact path='/project/:projectId/projectTask/edit/:projectTaskId/' component={ ProjectTaskEdit } />

        </Switch>
      </>
    )
  }
}

export default App;