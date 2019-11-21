import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class ProjectTaskForm extends Component {
    render() {
        return (
            <div>
                ProjectForm
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

