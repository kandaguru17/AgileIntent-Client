import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import ProjectForm from './ProjectForm';
import { createProject } from '../../Actions/ProjectActions'

class CreateProject extends Component {


    onSubmit = (formValues) => {
        this.props.createProject(formValues);
    }

    render() {

        return (

            <>
                <Header as='h3' icon style={ { position: 'relative', top: '100px', left: '40px', width: '90%' } }>
                    <Icon name="tasks" />
                    Create New Project
            </Header>
                <div style={ { position: 'relative', top: 100, left: '27%', width: '90%' } }>
                    <ProjectForm onSubmit={ this.onSubmit } formName="Create New Project" cancelLink={ `/dashboard` } buttonName="Create Project" />
                </div>
            </>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { project: state.projects, error: state.error };
}

export default connect(mapStateToProps, { createProject })(CreateProject);
