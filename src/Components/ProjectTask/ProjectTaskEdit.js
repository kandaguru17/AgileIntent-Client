import React, { Component } from 'react'
import ProjectTaskForm from './ProjectTaskForm'
import { connect } from 'react-redux';
import { getProjectTask, updateProjectTask } from '../../Actions/ProjectTaskActions';
import { Icon, Header } from 'semantic-ui-react';
import { PRIORITY_OPTIONS } from './ProjectTaskOptions';



class ProjectTaskEdit extends Component {

    componentDidMount() {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.getProjectTask(projectId, projectTaskId);
    }

    onFormSubmit = (formValues) => {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.updateProjectTask(projectId, projectTaskId, formValues);
    }


    render() {

        if (!this.props.projectTask)
            return 'loading';

        const { projectTask } = this.props;
        const found = PRIORITY_OPTIONS.find(it => {
            return parseInt(it.value) === projectTask.priority;
        }).value;

        return (
            <>
                <Header as='h2' icon style={ { position: 'relative', top: '100px', left: '40%' } }>
                    <Icon name="edit" />
                    Edit Project Task
             </Header>

                <div style={ { position: 'relative', top: '100px', left: '25%' } }>
                    <ProjectTaskForm initialValues={ { ...projectTask, priority: found } } onFormSubmit={ this.onFormSubmit } buttonName="Edit Task" cancelLink={ `/project/${projectTask.projectIdentifier}/projectTask/${projectTask.projectTaskSequence}` } />
                </div>

            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { projectTask: state.projectTasks[ownProps.match.params.projectTaskId] };
}

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(ProjectTaskEdit)