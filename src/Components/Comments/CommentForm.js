import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import './comments.css';

class CommentForm extends Component {

    renderInput = (fieldProps) => {

        const { type, placeholder } = fieldProps;
        if (type === 'textArea')
            return (<Form.TextArea
                { ...fieldProps.input }
                placeholder={ placeholder }
                rows="5"
            />)
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {

        return (
            <div>
                <Form reply onSubmit={ this.props.handleSubmit(this.onSubmit) }>
                    <Field name="commentText" type="textArea" component={ this.renderInput } placeholder="Add Comment" style={ { whiteSpace: 'pre-wrap' } } />
                    <Button content={ this.props.buttonText } basic color="green" />
                    { this.props.form === 'commentEdit' ? <Button content="cancel" basic color="red" onClick={ this.props.closeEditor } /> : '' }
                </Form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'commentForm'
})(CommentForm)