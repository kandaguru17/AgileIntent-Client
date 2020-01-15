import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Button,
    Form
} from 'semantic-ui-react';
import { Link } from 'react-router-dom'


class ProjectForm extends Component {

    renderInput = (fieldProps) => {
        let { touched, error } = fieldProps.meta;
        const { fieldPlaceholder } = fieldProps
        error = (touched && error) ? { content: error, pointing: 'below' } : false
        return (<Form.Input error={ error } autoComplete="off" width={ 8 } placeholder={ fieldPlaceholder } { ...fieldProps.input } disabled={ fieldProps.disabled } />);
    }

    renderTextArea = (fieldProps) => {
        let { touched, error } = fieldProps.meta;
        const { fieldPlaceholder } = fieldProps;
        error = (touched && error) ? { content: error } : false
        return (
            <Form.TextArea error={ error } autoComplete="off" placeholder={ fieldPlaceholder } width={ 8 }  { ...fieldProps.input } rows="10" />
        );
    }

    renderDate = (fieldProps) => {
        const { fieldPlaceholder } = fieldProps;
        const { name } = fieldProps.input;
        return (
            <>
                <Form.Input type="label">{ fieldPlaceholder }</Form.Input>
                <Form.Input type="date" name={ name } { ...fieldProps.input } width={ 8 } format="DD MMMM YYYY" required />
            </>
        )
    }

    onFormSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        const { handleSubmit, formName, cancelLink } = this.props;
        return (
            <>
                <Form onSubmit={ handleSubmit(this.onFormSubmit) } >
                    {/* <Form.Group grouped style={ { marginLeft: '33%' } }> */ }
                    <Field name="projectIdentifier"
                        component={ this.renderInput }
                        fieldPlaceholder="Enter Project Identifier"
                        disabled={ formName === 'Update Project' ? true : false }
                    />
                    <Field name="projectName" component={ this.renderInput } fieldPlaceholder=" Project Name" />
                    <Field name="description" component={ this.renderTextArea } fieldPlaceholder=" Project Description" />
                    <Field name="startDate" component={ this.renderDate } fieldPlaceholder="Project Start Date" />
                    <Field name="endDate" component={ this.renderDate } fieldPlaceholder="Project End Date" />
                    {/* <Button positive type='submit' icon="plus" content={ this.props.formName } style={ { width: '30%', margin: '0 150px 50px' } } ></Button> */ }
                    <Button type="submit" positive content={ this.props.formName } />
                    <Button as={ Link } basic color="yellow" content="Cancel" to={ cancelLink } />
                </Form>
            </>
        )
    }
}


const formValidations = (formValues) => {

    const error = {}

    if (!formValues.projectIdentifier) {
        error.projectIdentifier = 'Project Identifier is mandatory';
    } else if (!(formValues.projectIdentifier.length > 3 && formValues.projectIdentifier.length < 6)) {
        error.projectIdentifier = 'Project Identifier should be 4 or 5 characters in length';
    }

    if (!formValues.projectName)
        error.projectName = 'Project Name is mandatory';

    if (!formValues.description)
        error.description = 'Description is mandatory';


    return error;
}

export default reduxForm({
    form: 'ProjectForm',
    validate: formValidations
})(ProjectForm);

