import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Dropdown } from 'semantic-ui-react';


const STATUS_OPTIONS = [{ key: 'toDo', value: 'TO DO', text: 'TO DO' },
{ key: 'inProgress', value: 'IN PROGRESS', text: 'IN PROGRESS' },
{ key: 'done', value: 'DONE', text: 'DONE' },
]

const PRIORITY_OPTIONS = [
    { key: '1', value: '1', text: '1-Critical' },
    { key: '2', value: '2', text: '2-High' },
    { key: '3', value: '3', text: '3-Medium' },
    { key: '4', value: '4', text: '4-Low' }
]

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
        console.log(this.props)
        return (
            <Form onSubmit={ handleSubmit(this.onFormSubmit) }>
                <Field name="summary" type="text" component={ this.renderInput } placeholder="Task Summary" />
                <Field name="acceptanceCriteria" type="textArea" component={ this.renderInput } placeholder="Acceptance Criteria" />
                <Field name="status" type="dropDown" options={ STATUS_OPTIONS } component={ this.renderInput } placeholder="Status" />
                <Field name="priority" type="dropDown" options={ PRIORITY_OPTIONS } component={ this.renderInput } placeholder="Priority" />
                <Field name="dueDate" type="date" component={ this.renderInput } placeholder="DueDate" />
                <Button type="submit" positive content="Create Task" />
            </Form>
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

