import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ProjectTaskShow from './ProjectTaskShow';

class ProjectTaskItem extends Component {

    state = { open: false }
    handleClick = () => this.setState({ open: true })
    handleClose = () => this.setState({ open: false })
    


    render() {
        const { projectTaskSequence, summary, priority, status, createdAt, updatedAt, acceptanceCriteria, projectIdentifier } = this.props;
        return (
            <>

                <Card style={ { width: '32%' } }>
                    <Card.Content>
                        <Card.Header as={ Link }
                            to={ `/project/${projectIdentifier}/projectTask/${projectTaskSequence}` }
                            onClick={ this.handleClick }
                            style={{width:'80px'}}>
                            { projectTaskSequence }
                        </Card.Header>
                        <Card.Description><strong>Priority : </strong>{ priority }</Card.Description>
                        <Card.Description><strong>Status : </strong>{ status }</Card.Description>
                        <Card.Description><strong>Task Summary: </strong><br></br>{ summary }</Card.Description>
                        <Card.Description><strong>Acceptance Criteria: </strong><br></br>{ `${acceptanceCriteria.substring(0, 50)}...` }</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='calendar' /> Created On : { createdAt }
                        <br></br>
                        <Icon name='calendar' /> Last Updated : { updatedAt ? updatedAt : <em>No updates yet</em> }
                    </Card.Content>
                </Card>
            </>
        )
    }
}

export default ProjectTaskItem;