import React, { Component } from 'react';
import { Card, Icon, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PRIORITY_OPTIONS } from './ProjectTaskOptions';
import '../../styles/projectTaskShow.css';


class ProjectTaskItem extends Component {

    renderPriority = (priority) => {
        return PRIORITY_OPTIONS.find(it => {
            return parseInt(it.key) === priority;
        }).text
    }

    render() {
        const { projectTaskSequence, summary, priority, status, createdAt, updatedAt, acceptanceCriteria, projectIdentifier, issueType } = this.props;
        return (
            <Grid.Column style={ { marginBottom: '10px' } }>
                <Card style={ { height: '100%', width: '100%' } }>
                    <Card.Content>
                        <span>
                            <Header as={ Link }
                                to={ `/project/${projectIdentifier}/projectTask/${projectTaskSequence}` }
                                onClick={ this.handleClick }
                                style={ { width: '80px' } }
                                className='header-link'>
                                { `${projectTaskSequence} - ${summary}` }
                            </Header>
                        </span>
                        <Card.Description><strong>Type : </strong>{ issueType }</Card.Description>
                        <Card.Description><strong>Priority : </strong>{ this.renderPriority(priority) }</Card.Description>
                        <Card.Description><strong>Status : </strong>{ status }</Card.Description>
                        <Card.Description ><strong>Acceptance Criteria: </strong><br></br>{ acceptanceCriteria === null ? '' : `${acceptanceCriteria.substring(0, 150)}...` }</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='calendar' /> Created On : { createdAt }
                        <br></br>
                        <Icon name='calendar' /> Last Updated : { updatedAt ? updatedAt : <em>No updates yet</em> }
                    </Card.Content>
                </Card>
            </Grid.Column>
        )
    }
}

export default ProjectTaskItem;