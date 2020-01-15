import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import { getAssignedProjectTasks } from '../../Actions/ProjectTaskActions'
class AssignedTask extends Component {


    componentDidMount() {
        this.props.getAssignedProjectTasks()
    }


    renderAssignedTasks = () => {
        const { assignedProjectTasks } = this.props;

        if (assignedProjectTasks.length === 0)
            return <p>No Tasks Assigned Yet!!</p>


        return assignedProjectTasks.map(it => <Segment size="small" key={ it.projectTaskSequence }> <Link to={ `project/${it.projectIdentifier}/projectTask/${it.projectTaskSequence}/` }>{ it.projectTaskSequence }</Link>{ ` - ${it.summary}` } </Segment>)
    }

    render() {
        const { assignedProjectTasks } = this.props;

        return (
            <div style={ { overflow: 'auto' } }>
                <Header as='h3' dividing style={ { margin: '100px auto', width: '90vw', marginBottom: '10px' } }>
                    Assigned To Me
                </Header>
                <Segment.Group style={ { margin: '10px auto', width: '90vw', marginBottom: '10px' } }>
                    <Segment textAlign={ assignedProjectTasks.length === 0 ? 'center' : '' }>
                        { this.renderAssignedTasks() }
                    </Segment>

                </Segment.Group>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth, assignedProjectTasks: Object.values(state.projectTasks) }
}

export default connect(mapStateToProps, { getAssignedProjectTasks })(AssignedTask)