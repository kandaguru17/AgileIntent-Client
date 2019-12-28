import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Header, Icon } from 'semantic-ui-react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, ISSUETYPE_OPTIONS } from './ProjectTaskOptions';

class ProjectTaskForm extends Component {

    renderInput = (fieldProps) => {
        const { type, options, placeholder } = fieldProps;

        if (type === 'text')
            return (<Form.Input
                { ...fieldProps.input }
                width={ 8 } placeholder={ placeholder }
            />);

        if (type === 'textArea')
            return (<Form.TextArea
                { ...fieldProps.input }
                width={ 8 } rows="15"
                placeholder={ placeholder } />)

        if (type === 'dropDown')
            return (<Form.Select
                search selection
                label={ fieldProps.label }
                name={ fieldProps.input.name }
                onChange={ (e, { value }) => fieldProps.input.onChange(value) }
                options={ options }
                placeholder={ placeholder }
                value={ fieldProps.input.value }
                width={ 8 }
            />)

        if (type === 'date')
            return (<>
                <Form.Input type="label">{ fieldProps.placeholder }</Form.Input>
                <Form.Input
                    type="date"
                    { ...fieldProps.input }
                    width={ 8 }
                    format="DD MMMM YYYY" />
            </>)
    }

    onFormSubmit = (formValues) => {
        this.props.onFormSubmit(formValues);
    }

    render() {
        const { handleSubmit } = this.props;
        console.log(this.props.initialValues);
        return (
            <>
                <Header as='h2' icon style={ { marginLeft: '200px' } }>
                    <Icon name='settings' />
                    { this.props.formName }
                </Header>
                <Form onSubmit={ handleSubmit(this.onFormSubmit) }>
                    <Field name="summary" type="text" component={ this.renderInput } placeholder="Task Summary" />
                    <Field name="acceptanceCriteria" type="textArea" component={ this.renderInput } placeholder="Acceptance Criteria" style={ { whiteSpace: 'pre-wrap' } } />
                    <Field name="status" type="dropDown" options={ STATUS_OPTIONS } component={ this.renderInput } placeholder="Status" />
                    <Field name="priority" type="dropDown" options={ PRIORITY_OPTIONS } component={ this.renderInput } placeholder="Priority" />
                    <Field name="issueType" type="dropDown" options={ ISSUETYPE_OPTIONS } component={ this.renderInput } placeholder="issueType" />
                    <Field name="dueDate" type="date" component={ this.renderInput } placeholder="DueDate" />
                    <Button type="submit" positive content={ this.props.buttonName } style={ { width: '30%', margin: '0 150px 50px' } } />
                </Form>
            </>
        )
    }
}

const validateForm = () => {
    const err = {};
    return err;
}

export default reduxForm({
    form: 'ProjectTaskForm',
    validate: validateForm
})(ProjectTaskForm)

