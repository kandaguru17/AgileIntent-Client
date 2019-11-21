import React, { Component } from 'react';
import { Segment, Card, Button, Message } from 'semantic-ui-react'
import ProjectTaskItem from './ProjectTaskItem';
import { connect } from 'react-redux';
import { getAllProjectTasks } from '../../Actions/ProjectTaskActions';
import { getProject } from '../../Actions/ProjectActions';
import { Link } from 'react-router-dom'

class ProjectTaskList extends Component {

    componentDidMount() {
        const { projectId } = this.props.match.params;
        this.props.getAllProjectTasks(projectId);
    }


    renderProjectTasks = () => {
        return this.props.projectTasks.length !== 0 ?
            <Segment>
                <Card.Group>
                    { this.props.projectTasks.map(it => <ProjectTaskItem key={ it.projectTaskSequence } { ...it } />) }
                </Card.Group>
            </Segment>
            :
            <Message info >
                <p>No Project Tasks Created</p>
            </Message>
    }

    render() {
        const { projectId } = this.props.match.params;

        return (
            <div style={ { position: 'relative', top: 100, width: '80%', margin: '0 auto' } }>
                <Button color="teal"  icon="plus" content="Create new Task" as={ Link } to={ `/project/${projectId}/new` } />
                { this.renderProjectTasks() }
            </div>
        )
    }
}

const mapStateToProps = (state, pwnProps) => {
    console.log(state);
    return { projects: state.projects, projectTasks: Object.values(state.projectTasks), auth: state.auth };
}

export default connect(mapStateToProps, { getAllProjectTasks, getProject })(ProjectTaskList)