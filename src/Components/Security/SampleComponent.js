import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class SampleComponent extends Component {
    render() {
        return (
            <Segment style={ { margin: '100px auto 500px', width: '90%', height: '60%' } }>
                <Header as="h2">Successfully Regiestered</Header>
                <Link to={ `/auth` }>go to login page!!</Link>
            </Segment>
        )
    }
}
