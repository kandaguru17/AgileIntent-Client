import React, { Component } from 'react';
import { Button, Header, Dropdown, Modal, Image, Segment, Dimmer, Loader, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProjectTask } from '../../Actions/ProjectTaskActions';
import history from '../../history';
import { Link } from 'react-router-dom';
import { PRIORITY_OPTIONS } from './ProjectTaskOptions';

class ProjectTaskShow extends Component {

    state = { open: true }

    onDismiss = () => {
        const { projectId } = this.props.match.params;
        this.setState({ open: false });
        history.push(`/project/${projectId}/projectTask`);
    }

    componentDidMount() {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.getProjectTask(projectId, projectTaskId);
    }

    renderPriority = (priority) => {
        return PRIORITY_OPTIONS.find(it => {
            console.log(it.text)
            return parseInt(it.key) === priority;
        }).text
    }


    render() {

        if (!this.props.projectTask)
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Image
                        src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
            )

        const { projectTaskSequence, summary, priority, status, createdAt, updatedAt, acceptanceCriteria, projectIdentifier, dueDate, issueType } = this.props.projectTask;

        return (
            <>
                <Modal open={ this.state.open } onClose={ this.onDismiss }>
                    <Modal.Header>{ `${projectTaskSequence} - ${summary}` } </Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <Container textAlign="justified" >
                                <Header>Acceptance Criteria :</Header>
                                <p style={ { maxWidth: '100%', whiteSpace: 'pre-wrap' } }>
                                    { acceptanceCriteria === null ? '' : acceptanceCriteria }
                                </p>
                            </Container>
                            <Header>Issue Type :</Header>
                            <p> { issueType } </p>
                            <Header>Status :</Header>
                            <p>{ status }</p>
                            <Header>Priority :</Header>
                            <p>{ this.renderPriority(priority) }</p>
                            <Header>Due Date :</Header>
                            <p>{ dueDate }</p>
                            <Header>Created On :</Header>
                            <p>{ createdAt }</p>
                            <Header>Last Updated :</Header>
                            <p>{ updatedAt === null ? 'No Updates Yet' : updatedAt }</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button.Group color='blue'>
                            <Button as={ Link } to={ `/project/${projectIdentifier}/projectTask` }>Back to Project Tasks</Button>
                            <Dropdown className='button icon' >
                                <Dropdown.Menu>
                                    <Dropdown.Item as={ Link } to={ `/project/${projectIdentifier}/${projectTaskSequence}/details` } text="View Details" />
                                    <Dropdown.Item as={ Link } to={ `/project/${projectIdentifier}/projectTask/edit/${projectTaskSequence}` } text="Edit" />
                                    <Dropdown.Item as={ Link } to={ `/project/${projectIdentifier}/projectTask/delete/${projectTaskSequence}` } text="Delete" />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { projectTask: state.projectTasks[ownProps.match.params.projectTaskId] };
}

export default connect(mapStateToProps, { getProjectTask })(ProjectTaskShow);