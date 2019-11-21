import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectForm from './ProjectForm';
import { createProject } from '../../Actions/ProjectActions'

class CreateProject extends Component {


    onSubmit = (formValues) => {
        this.props.createProject(formValues);
    }

    render() {

        return (
            <>
                <ProjectForm onSubmit={ this.onSubmit } formName="Create New Project" />
            </>


        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { project: state.projects, error: state.error };
}

export default connect(mapStateToProps, { createProject })(CreateProject);
