import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class ProjectTaskItem extends Component {
    render() {
        const { projectTaskSequence, summary, priority, status, createdAt, updatedAt, acceptanceCriteria } = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header as={ Link } to="">{ projectTaskSequence }</Card.Header>
                    <Card.Description><strong>Priority : </strong>{ priority }</Card.Description>
                    <Card.Description><strong>Status : </strong>{ status }</Card.Description>
                    <Card.Description><strong>Task Summary: </strong><br></br>{ summary }</Card.Description>
                    <Card.Description><strong>Acceptance Criteria: </strong><br></br>{ acceptanceCriteria }</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='calendar' /> Created On : { createdAt }
                    <br></br>
                    <Icon name='calendar' /> Last Updated : { updatedAt ? updatedAt : <em>No updates yet</em> }
                </Card.Content>
            </Card>
        )
    }
}

export default ProjectTaskItem;