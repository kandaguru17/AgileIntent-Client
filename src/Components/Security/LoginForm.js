import React, { Component } from 'react';
import { Button, Header, Form, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {

    renderInput = (fieldProps) => {
        let { touched, error } = fieldProps.meta;
        error = (touched && error) ? { content: error, pointing: 'below' } : false;

        return (
            <Form.Input error={ error } { ...fieldProps }></Form.Input>
        )
    }

    onFormSubmit = (formValues) => {
        this.props.authenticate(formValues);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <>
                <Form onSubmit={ handleSubmit(this.onFormSubmit) }>
                    <Header as='h2' textAlign='center'>
                        <Icon size="tiny" name='sign in' />
                        Log In
                    </Header>
                    <Field component={ this.renderInput } placeholder="username" width={ 6 } name="username"></Field>
                    <Field component={ this.renderInput } placeholder="password" width={ 6 } type="password" name="password"></Field>
                    <Button primary type="submit" content="Login"></Button>
                </Form>
            </>

        )
    }
}


const formValidations = (formValues) => {

    const error = {}
    if (!formValues.username) {
        error.username = 'username is required';
    }

    if (!formValues.password)
        error.password = 'Password is required';

    return error;
}

export default reduxForm(
    {
        form: 'LoginForm',
        validate: formValidations
    }
)(LoginForm);