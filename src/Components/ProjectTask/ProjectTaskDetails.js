import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Dimmer, Container, Header, Image, Loader, Button, Dropdown, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



import DropZoneComponent from '../Attachments/DropZoneComponent'
import { getProjectTask } from '../../Actions/ProjectTaskActions';
import { PRIORITY_OPTIONS } from './ProjectTaskOptions';
import CommentAdd from '../Comments/CommentAdd';
import CommentList from '../Comments/CommentList';
import AttachmentList from '../Attachments/AttachmentList';



class ProjectTaskDetails extends Component {

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
                <Segment style={ { width: '90%', margin: '100px auto 100px' } }>
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
                <Segment style={ { width: '90%', margin: '100px auto' } }>
                    <Container textAlign="justified" style={ { width: '85%' } }>
                        <Header as="h1">{ `${projectTaskSequence} : ${summary}` }</Header>
                        <Header>Acceptance Criteria :</Header>
                        <p style={ { maxWidth: '100%', whiteSpace: 'pre-wrap' } }>
                            { acceptanceCriteria === null ? '' : acceptanceCriteria }
                        </p>
                        <Header>Type :</Header>
                        <p> { issueType } </p>
                        <Header > Status :</Header>
                        <p>{ status }</p>
                        <Header>Priority :</Header>
                        <p>{ this.renderPriority(priority) }</p>
                        <Header>Due Date :</Header>
                        <p>{ dueDate }</p>
                        <Header>Created On :</Header>
                        <p>{ createdAt }</p>
                        <Header>Last Updated :</Header>
                        <p>{ updatedAt === null ? 'No Updates Yet' : updatedAt }</p>
                    </Container>
                    <Divider />
                    <Button.Group color="blue" basic>
                        <Button as={ Link } to={ `/project/${projectIdentifier}/projectTask` } >Back to Project Tasks</Button>
                        <Dropdown className='button icon' >
                            <Dropdown.Menu>
                                <Dropdown.Item as={ Link } to={ `/project/${projectIdentifier}/projectTask/edit/${projectTaskSequence}` } text="Edit" />
                                <Dropdown.Item as={ Link } to={ `/project/${projectIdentifier}/projectTask/delete/${projectTaskSequence}` } text="Delete" />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>
                </Segment>

                <Container style={ { width: '90%', margin: '0 auto' } }>
                    <Header as='h3' >
                        Attachments
                </Header>
                </Container>

                <Segment style={ { width: '90%', margin: '10px auto', maxHeight: '300px', overflow: 'auto' } }>
                    <DropZoneComponent { ...this.props } />
                    <AttachmentList { ...this.props } />
                </Segment>


                <Container style={ { width: '90%', margin: '10px auto' } }>
                    <Header as='h3' dividing>
                        Comments
                </Header>
                </Container>

                <Segment style={ { maxWidth: '90%', margin: '10px auto', maxHeight: '400px', overflow: 'auto' } }>
                    <CommentList { ...this.props } />
                </Segment>
                <CommentAdd { ...this.props } />
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { projectTask: state.projectTasks[ownProps.match.params.projectTaskId] }
}

export default connect(mapStateToProps, { getProjectTask })(ProjectTaskDetails)