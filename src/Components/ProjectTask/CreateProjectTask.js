import React, { Component } from 'react'
import ProjectTaskForm from './ProjectTaskForm';
import { connect } from 'react-redux';
import {Icon ,Header} from 'semantic-ui-react';

import { createProjectTask } from '../../Actions/ProjectTaskActions'
import { getAllProjects } from '../../Actions/ProjectActions'
import history from '../../history';

class CreateProjectTask extends Component {

    componentDidMount() {
        this.props.getAllProjects();
    }


    onFormSubmit = (formValues) => {
        const { projectId } = this.props.match.params;
        this.props.createProjectTask(projectId, formValues)
    }

    state = { open: true }

    onDismiss = () => {
        const { projectId } = this.props.match.params;
        this.setState({ open: false });
        history.push(`/project/${projectId}/projectTask`);
    }


    render() {
        const { projectId } = this.props.match.params;
        return (
            <>
            <Header as='h2' icon style={ { position: 'relative', top: '100px', left: '0', width: '90%' } }>
                    <Icon name="tasks" />
                    Create Project Task
            </Header>
            <div style={ { position: 'relative', top: '100px', left: '25%', width: '90%' } }>
                <ProjectTaskForm onFormSubmit={ this.onFormSubmit } formName="Create Project Task" buttonName="Create Task" icon="tasks" cancelLink={`/project/${projectId}/projectTask`}/>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return state;
}
export default connect(mapStateToProps, { createProjectTask, getAllProjects })(CreateProjectTask)