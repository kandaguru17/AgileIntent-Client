import React, { Component } from 'react';
import { Button, Header, Form, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {

    renderInput = (fieldProps) => {
        let { touched, error } = fieldProps.meta;
        error = (touched && error) ? true : false;
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
                    <Field component={ this.renderInput } placeholder="Email" width={ 6 } name="username"></Field>
                    <Field component={ this.renderInput } placeholder="Password" width={ 6 } type="password" name="password"></Field>
                    <Button primary type="submit" content="Log In"></Button>
                </Form>
            </>

        )
    }
}


const formValidations = (formValues) => {

    const error = {}
    if (!formValues.username) {
        error.username = 'User Name is required';
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