import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
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
                clearable={ true }
            />)

        if (type === 'date')
            return (<>
                <Form.Input type="label">{ fieldProps.placeholder }</Form.Input>
                <Form.Input
                    type="date"
                    { ...fieldProps.input }
                    width={ 8 }
                    format="DD MMMM YYYY" required />
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

const validateForm = () => {
    const err = {};
    return err;
}

export default reduxForm({
    form: 'ProjectTaskForm',
    validate: validateForm
})(ProjectTaskForm)

