import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class RegistrationComponent extends Component {
    render() {
        return (
            <Segment style={ { margin: '100px auto 500px', width: '90%', height: '60%' } }>
                <Header as="h2">You are just a Step away</Header>
                <Header as="h4">Please Activate your account using your registered email address! and <Link to={ `/auth` }>Login</Link> </Header>
            </Segment>
        )
    }
}
