import React, { Component } from 'react'
import ProjectTaskForm from './ProjectTaskForm';
import { connect } from 'react-redux';
import { createProjectTask } from '../../Actions/ProjectTaskActions'
import { getAllProjects } from '../../Actions/ProjectActions'

class CreateProjectTask extends Component {

    componentDidMount() {
        this.props.getAllProjects();
    }


    onFormSubmit = (formValues) => {
        const { projectId } = this.props.match.params;
        this.props.createProjectTask(projectId, formValues)
    }

    render() {
        return (
            <div style={ { position: 'relative', top: 100, left: '27%', width: '90%' } }>
                <ProjectTaskForm onFormSubmit={ this.onFormSubmit } />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return state;
}
export default connect(mapStateToProps, { createProjectTask, getAllProjects })(CreateProjectTask)