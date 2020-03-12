import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { STATUS_OPTIONS, PRIORITY_OPTIONS, ISSUETYPE_OPTIONS } from './ProjectTaskOptions';

class ProjectTaskForm extends Component {

    renderInput = (fieldProps) => {
        const { type, options, placeholder } = fieldProps;
        let { touched, error } = fieldProps.meta;
        error = (touched && error) ? { content: error } : false

        if (type === 'text')
            return (<Form.Input
                { ...fieldProps.input }
                width={ 8 } placeholder={ placeholder }
                error={ error }
            />);

        if (type === 'textArea')
            return (<Form.TextArea
                { ...fieldProps.input }
                width={ 8 } rows="15"
                placeholder={ placeholder }
                error={ error }
            />)

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
                clearable={ true }
                error={ error }
                required
            />)

        if (type === 'date')
            return (<>
                <Form.Input type="label">{ fieldProps.placeholder }</Form.Input>
                <Form.Input
                    type="date"
                    { ...fieldProps.input }
                    width={ 8 }
                    format="DD MMMM YYYY"
                    error={ error }
                    required />

            </>)
    }

    onFormSubmit = (formValues) => {
        this.props.onFormSubmit(formValues);
    }

    render() {
        const { handleSubmit, cancelLink } = this.props;

        return (
            <div >
                <Form onSubmit={ handleSubmit(this.onFormSubmit) } >
                    <Field name="summary" type="text" component={ this.renderInput } placeholder="Task Summary" />
                    <Field name="acceptanceCriteria" type="textArea" component={ this.renderInput } placeholder="Acceptance Criteria" style={ { whiteSpace: 'pre-wrap' } } />
                    <Field name="status" type="dropDown" options={ STATUS_OPTIONS } component={ this.renderInput } placeholder="Status" />
                    <Field name="priority" type="dropDown" options={ PRIORITY_OPTIONS } component={ this.renderInput } placeholder="Priority" />
                    <Field name="issueType" type="dropDown" options={ ISSUETYPE_OPTIONS } component={ this.renderInput } placeholder="issueType" />
                    <Field name="dueDate" type="date" component={ this.renderInput } placeholder="DueDate" />
                    <Button type="submit" positive content={ this.props.buttonName } />
                    <Button as={ Link } basic color="yellow" content="Cancel" to={ cancelLink } />

                </Form>

            </div>
        )
    }
}

const validateForm = (formValues) => {
    const err = {};

    if (!formValues.summary)
        err.summary = "Summary is required"

    if (!formValues.acceptanceCriteria)
        err.acceptanceCriteria = "Acceptance Criteria is required"

    if (!formValues.status)
        err.status = "Status is required"

    if (!formValues.issueType)
        err.issueType = "Issue Type is required"

    if (!formValues.priority)
        err.priority = "Priority is required"

    return err;
}

export default reduxForm({
    form: 'ProjectTaskForm',
    validate: validateForm
})(ProjectTaskForm)

