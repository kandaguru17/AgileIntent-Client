import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Form, Icon } from 'semantic-ui-react';

class RegistrationForm extends Component {

    renderInput = (fieldProps) => {
        let { touched, error } = fieldProps.meta;

        console.log(error, touched)
        error = (touched && error) ? { content: error, pointing: 'below' } : false;
        return (
            <Form.Input error={ error } { ...fieldProps }></Form.Input>
        )
    }


    registerUser = (formValues) => {
        this.props.registerUser(formValues);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={ handleSubmit(this.registerUser) }>
                <Header as='h2' textAlign='center'>
                    <Icon size="tiny" name='user' />
                    Sign up
                </Header>
                <Field name="firstName" placeholder="firstName" component={ this.renderInput } width={ 6 }></Field>
                <Field name="lastName" placeholder="lastName" component={ this.renderInput } width={ 6 }></Field>
                <Field name="username" placeholder="username" component={ this.renderInput } width={ 6 }></Field>
                <Field name="password" placeholder="password" component={ this.renderInput } type="password" width={ 6 }></Field>
                <Field name="confirmPassword" placeholder="confirmPassword" component={ this.renderInput } type="password" width={ 6 }></Field>
                <Button positive type="submit" content="Register" />
            </Form>
        )
    }
}


const validateForm = (formValues) => {

    const error = {}
    if (!formValues.username) {
        error.username = 'User Name is required';
    }

    if (!formValues.firstName) {
        error.firstName = 'First Name is required';
    }

    if (!formValues.lastName) {
        error.lastName = 'Last Name is required';
    }

    if (!formValues.password) {
        error.password = 'password is required';
    }

    if (!formValues.confirmPassword) {
        error.confirmPassword = 'confirm Password is required';
    }

    if (formValues.password !== formValues.confirmPassword) {
        error.confirmPassword = 'passwords do not match';
    }

    return error;

}


export default reduxForm({
    form: 'RegistrationForm',
    validate: validateForm
})(RegistrationForm);