import React, { Component } from 'react'
import { Button, Card, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class ProjectItem extends Component {

    render() {

        const { project, auth } = this.props;
        const { username } = auth.user;

        return (
            <Card centered style={ { width: '80vw', margin: '15px auto' } }>
                <Card.Content>
                    <Card.Header >{ project.projectIdentifier }</Card.Header>
                    <Card.Description as={ Link } to={ `/project/${project.projectIdentifier}/config` } style={ { color: '#4183c4' } }>Project Metrics</Card.Description>
                </Card.Content>

                <Card.Content>

                    <Card.Header>{ project.projectName }</Card.Header>

                    <Card.Description>
                        <Container textalign="justified">
                            <p>Project Description :</p>
                            <p>{ project.description }</p>
                        </Container>

                    </Card.Description>

                    <Divider hidden />

                    <Button.Group floated="right">
                        <Button as={ Link } to={ `/project/${project.projectIdentifier}/projectTask` } basic color="green" style={ { marginRight: '2px' } }>View Project Board</Button>
                        <Button color="blue" as={ Link } to={ `/project/edit/${project.projectIdentifier}` } basic style={ { marginRight: '2px' } } disabled={ project.reportingPerson === username ? false : true }>Update Project</Button>
                        <Button as={ Link } to={ `/project/delete/${project.projectIdentifier}` } negative basic disabled={ project.reportingPerson === username ? false : true }>Delete Project</Button>
                    </Button.Group>
                </Card.Content>

                <Card.Content extra>
                    <Card.Meta>
                        <p>Created On : { project.createdAt }</p>
                        <span>Last Updated : { project.updatedAt ? `${project.updatedAt}` : `No Updates yet` }</span>
                    </Card.Meta>
                </Card.Content>
            </Card>

        )
    }
}


export default ProjectItem;