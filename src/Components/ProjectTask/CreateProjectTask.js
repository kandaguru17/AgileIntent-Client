import React, { Component } from 'react'
import ProjectTaskForm from './ProjectTaskForm';
import { connect } from 'react-redux';
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
        return (
            <div style={ { position: 'fixed', top: '100px', left: '25%', width: '90%' } }>
                <ProjectTaskForm onFormSubmit={ this.onFormSubmit } formName="Create Project Task" buttonName="Create Task" icon="tasks"/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return state;
}
export default connect(mapStateToProps, { createProjectTask, getAllProjects })(CreateProjectTask)