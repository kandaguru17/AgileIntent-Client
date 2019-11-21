import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Button,
    Form,
    Header,
    Icon
} from 'semantic-ui-react';


class ProjectForm extends Component {

    renderInput = (fieldProps) => {
        let { touched, error } = fieldProps.meta;
        const { fieldPlaceholder } = fieldProps
        error = (touched && error) ? { content: error, pointing: 'below' } : false
        return (<Form.Input error={ error } autoComplete="off" width={ 6 } placeholder={ fieldPlaceholder } { ...fieldProps.input } />);
    }

    renderTextArea = (fieldProps) => {
        let { touched, error } = fieldProps.meta;
        const { fieldPlaceholder } = fieldProps;
        error = (touched && error) ? { content: error } : false
        return (
            <Form.TextArea error={ error } autoComplete="off" placeholder={ fieldPlaceholder } width={ 6 }  { ...fieldProps.input } rows="10" />
        );
    }

    renderDate = (fieldProps) => {
        const { fieldPlaceholder } = fieldProps;
        const { name } = fieldProps.input;
        return (
            <>
                <Form.Input type="label">{ fieldPlaceholder }</Form.Input>
                <Form.Input type="date" name={ name } { ...fieldProps.input } width={ 6 } format="DD MMMM YYYY" />
            </>
        )
    }

    onFormSubmit = (formValues) => {
        console.log(formValues);
        this.props.onSubmit(formValues);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <>
                <Header as='h2' icon textAlign="center" style={ { marginTop: '150px' } }>
                    <Icon name='settings' />
                    { this.props.formName }
                </Header>

                <Form onSubmit={ handleSubmit(this.onFormSubmit) }>
                    <Form.Group grouped style={ { marginLeft: '38%' } }>
                        <Field name="projectIdentifier" component={ this.renderInput } fieldPlaceholder="Enter Project Identifier" />
                        <Field name="projectName" component={ this.renderInput } fieldPlaceholder="Enter Project Name" />
                        <Field name="description" component={ this.renderTextArea } fieldPlaceholder="Enter Project Description" />
                        <Field name="startDate" component={ this.renderDate } fieldPlaceholder="Enter Project Start Date" />
                        <Field name="endDate" component={ this.renderDate } fieldPlaceholder="Enter Project End Date" />
                        <Button positive type='submit' icon="plus" content={ this.props.formName } style={ { display: 'block', marginTop: '15px', width: '38%' } } ></Button>
                    </Form.Group>
                </Form>
            </>
        )
    }
}


const formValidations = (formValues) => {

    const error = {}

    if (!formValues.projectIdentifier){
        error.projectIdentifier = 'Project Identifier is mandatory';
    }else if(!(formValues.projectIdentifier.length > 3 && formValues.projectIdentifier.length < 6 )){
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

