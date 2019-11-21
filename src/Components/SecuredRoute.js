import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class SecuredRoute extends Component {

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const Component = this.props.component;
        return (
            <Route exact path={ this.props.path } render={ (props) => isAuthenticated && user ? <Component { ...props } /> : <Redirect to="/auth" /> } />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, {})(SecuredRoute);