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
import history from '../history'
import ProjectTaskList from './ProjectTask/ProjectTaskList'

const token = localStorage.token
if (token) {
  setHeaders(token);
  const decoded = jwt_decode(token);
  store.dispatch(
    {
      type: 'LOGIN',
      payload: { isAuthenticated: true, user: decoded }
    })
  const currentTime = Date.now() / 1000;
  console.log(decoded.exp > currentTime)
  //this is to user to stay in the app after log-in and preventing from entering the /auth route
  if (decoded.exp < currentTime) store.dispatch(logOut())
}

class App extends Component {

  render() {
    return (
      <div>
        <Navbar />
        {
          /*public routes */
        }
        <Route path="/auth" exact component={ Authentication } />
        <Route path="/" exact render={ () => <h2>WELCOME</h2> } />
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
        </Switch>
      </div>
    )
  }
}

export default App;