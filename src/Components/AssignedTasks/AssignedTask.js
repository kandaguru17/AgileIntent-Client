import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Header, Table, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import { getAssignedProjectTasks } from '../../Actions/ProjectTaskActions';

class AssignedTask extends Component {


    componentDidMount() {
        this.props.getAssignedProjectTasks();
    }


    renderAssignedTasks = () => {
        const { assignedProjectTasks } = this.props;

        return assignedProjectTasks.map(it =>
            <Table.Row>
                <Table.Cell>{ it.issueType }</Table.Cell>
                <Table.Cell><Link to={ `/project/${it.projectIdentifier}/projectTask/${it.projectTaskSequence}` } >{ it.projectTaskSequence }
                </Link></Table.Cell>
                <Table.Cell>{ it.status }</Table.Cell>
                <Table.Cell>{ it.priority }</Table.Cell>
                <Table.Cell>{ it.summary }</Table.Cell>
            </Table.Row>
        )

    }


    renderTableHeader = () => {
        return <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Key</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Priority</Table.HeaderCell>
                <Table.HeaderCell>Summary</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

    }

    render() {

        const { assignedProjectTasks } = this.props;

        if (assignedProjectTasks.length === 0)
            return (<>
                <Header as='h3' dividing style={ { margin: '100px auto', width: '90vw', marginBottom: '10px' } }>
                    Assigned To Me
                </Header>
                <Message style={ { margin: '10px auto', width: '90vw' } }>You currently have no issues assigned to you. Enjoy your day!</Message>
            </>
            )


        return (
            <div style={ { overflow: 'auto' } }>
                <Header as='h3' dividing style={ { margin: '100px auto', width: '90vw', marginBottom: '10px' } }>
                    Assigned To Me
                </Header>
                <Table style={ { overflow: 'auto', margin: '10px auto', width: '90vw' } } striped fixed>
                    { this.renderTableHeader() }
                    <Table.Body>
                        { this.renderAssignedTasks() }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.auth, assignedProjectTasks: Object.values(state.projectTasks) }
}

export default connect(mapStateToProps, { getAssignedProjectTasks })(AssignedTask)