import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export default class AssignPT extends Component {

    state = { username: '' }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        this.props.onSubmit(e, this.state);
    }

    render() {

        return (
            <form onSubmit={ this.onSubmit } >
                <Input type="email" icon='users' iconPosition='left' placeholder='Assign To...' name="username" onChange={ this.onChange } id='assignInput' />
            </form>
        )
    }
}
