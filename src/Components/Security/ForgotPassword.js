import React, { Component } from 'react'
import { Form, Header, Icon, Button } from 'semantic-ui-react'
import { sendForgotPasswordEmail } from '../../Actions/SecurityActions';
import { connect } from 'react-redux';

class ForgotPassword extends Component {

    state = { username: '' }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.sendForgotPasswordEmail(this.state);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div style={ { overflow: 'hidden' } }>
                <Header as='h2' icon textAlign="center" style={ { margin: '50px auto' } }>
                    <Icon name='settings' size="huge" />
                    Reset Password
                </Header>
                <Form style={ { textAlign: "center" } } onSubmit={ this.onSubmit }>
                    <Form.Input name="username" placeholder="johnDoe@abc.com" style={ { width: "20%" } } onChange={ this.onChange } />
                    <Button primary type="submit" content="Send Password Reset Link" />
                </Form>
            </div>
        )
    }
}

export default connect(null, { sendForgotPasswordEmail })(ForgotPassword);