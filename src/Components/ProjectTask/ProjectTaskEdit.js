import React, { Component } from 'react'
import ProjectTaskForm from './ProjectTaskForm'
import { connect } from 'react-redux';
import { getProjectTask, updateProjectTask } from '../../Actions/ProjectTaskActions';
import { Button } from 'semantic-ui-react';
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
                <div>
                    <Button content="Back To Project Tasks" />
                    <div style={ { position: 'fixed', top: '100px', left: '25%', width: '90%' } }>
                        <ProjectTaskForm initialValues={ { ...projectTask, priority: found } } onFormSubmit={ this.onFormSubmit } formName="Edit Task" buttonName="Edit Task" icon="edit" />
                    </div>  
                </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { projectTask: state.projectTasks[ownProps.match.params.projectTaskId] };
}

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(ProjectTaskEdit)