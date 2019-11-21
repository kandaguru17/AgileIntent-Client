import React, { Component } from 'react'
import { Button, Card, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class ProjectItem extends Component {

    render() {

        const { project } = this.props;

        return (
            <Card centered style={ { width: '80%', marginTop: '15px' } }>
                <Card.Content>
                    <Card.Header>{ project.projectIdentifier }</Card.Header>
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
                        <Button as={ Link } to={ `/project/${project.projectIdentifier}/projectTask` } positive>View Project Board</Button>
                        <Button.Or />
                        <Button color="teal" as={ Link } to={ `/project/edit/${project.projectIdentifier}` }>Update Project</Button>
                        <Button.Or />

                        <Button as={ Link } to={ `/project/delete/${project.projectIdentifier}` } negative>Delete Project</Button>


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