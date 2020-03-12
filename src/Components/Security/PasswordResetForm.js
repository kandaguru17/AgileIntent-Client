import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react'

class PasswordResetForm extends Component {

    renderInput = (fieldProps) => {
        let { touched, error } = fieldProps.meta;
        error = (touched && error) ? true : false;
        return (
            <Form.Input error={ error } { ...fieldProps }></Form.Input>
        )
    }


    render() {
        const { isLoading, handleSubmit } = this.props;

        return (
            <Form onSubmit={ handleSubmit(this.onFormSubmit) }>
                <Field component={ this.renderInput } placeholder="password" width={ 6 } name="password" />
                <Field component={ this.renderInput } placeholder="confirm Password" width={ 6 } name="confirmPassword" />
                <Button primary loading={ isLoading } disabled={ isLoading } type="submit" content="Reset Password" />
            </Form>
        )
    }
}


const formValidations = (formValues) => {


}

export default reduxForm({
    form: 'passwordReset',
    validate: formValidations
})(PasswordResetForm)