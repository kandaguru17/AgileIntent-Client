import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Dimmer, Container, Header, Image, Loader, Button, Dropdown, Divider, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DropZoneComponent from '../Attachments/DropZoneComponent'
import { getProjectTask } from '../../Actions/ProjectTaskActions';
import { PRIORITY_OPTIONS } from './ProjectTaskOptions';
import CommentAdd from '../Comments/CommentAdd';
import CommentList from '../Comments/CommentList';
import AttachmentList from '../Attachments/AttachmentList';
import AssignPT from './AssignPT1'
import '../../styles/assignPT.css'
import store from '../../Reducers/index'
import axios from 'axios';

import { APP_URI } from '../../AppConst'
const ROOT_URL = `${APP_URI}/api/members/assign`
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}

class ProjectTaskDetails extends Component {


    state = { editingMode: false }

    componentDidMount() {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.getProjectTask(projectId, projectTaskId);

        ["click", "keydown"].forEach(it => {
            window.addEventListener(it, (e) => {
                if (it === "keydown" && e.key === 'Escape')
                    this.setState({ editingMode: false });

                if (it === "click" && this.state.editingMode && e.target.id !== 'assignInput' && e.target.id !== 'assign-user')
                    this.setState({ editingMode: false });
            }, false)
        })

    }


    onSubmit = async (e, username) => {
        const { dispatch } = store;

        try {
            const { projectId, projectTaskId } = this.props.match.params;
            e.preventDefault();
            await axios.post(`${ROOT_URL}/${projectId}/${projectTaskId}`, username, { headers });
            //document.getElementById('assignInput').value = ''
            dispatch(getProjectTask(projectId, projectTaskId));
            this.setState({ editingMode: false })
        } catch (err) {
            console.log(err.response);
            if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
            if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
            if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
            return dispatch({ type: 'ERROR', payload: err.config })
        }
    }


    renderPriority = (priority) => {
        return PRIORITY_OPTIONS.find(it => {
            return parseInt(it.key) === priority;
        }).text
    }

    onClick = () => {
        this.setState(prevState => ({
            editingMode: !prevState.editingMode
        }));
    }

    renderAssignedTo = () => {
        const { user } = this.props.projectTask;
        const { editingMode } = this.state;

        if (editingMode)
            return <AssignPT { ...this.props } onSubmit={ this.onSubmit } />

        return (
            <>
                <p id="assign-user" onClick={ this.onClick } className="assign-user"><Icon name="user" />
                    { user !== null ? `${user.firstName} ${user.lastName}` : <em>Unassigned</em> }</p>
            </>
        )
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
                <Segment.Group style={ { width: '90%', margin: '100px auto' } }>
                    <Segment basic style={ { width: '100%', maxHeight: '500px', overflow: 'auto' } }>
                        <Container textAlign="justified" >
                            <Header as="h1">{ `${projectTaskSequence} : ${summary}` }</Header>
                            <Header>Acceptance Criteria :</Header>
                            <p style={ { maxWidth: '100%', whiteSpace: 'pre-wrap' } }>
                                { acceptanceCriteria === null ? '' : acceptanceCriteria }
                            </p>
                        </Container>
                    </Segment>
                    <Segment.Group horizontal style={ { height: '350px' } }>

                        <Segment textAlign="center" basic>
                            <Header>Type :</Header>
                            { issueType }
                            <Header > Status :</Header>
                            <p>{ status }</p>
                            <Header>Priority :</Header>
                            <p>{ this.renderPriority(priority) }</p>
                            <Header className="border-hover"  >Assigned to : </Header>
                            { this.renderAssignedTo() }
                        </Segment>

                        <Segment textAlign="center" basic >
                            <Header>Due Date :</Header>
                            <p>{ dueDate }</p>
                            <Header>Created On :</Header>
                            <p>{ createdAt }</p>
                            <Header>Last Updated :</Header>
                            <p>{ updatedAt === null ? 'No Updates Yet' : updatedAt }</p>
                        </Segment>

                    </Segment.Group>

                    <Divider />

                    <Button.Group color="blue" basic style={ { margin: '0px 0px 10px 10px' } }>
                        <Button as={ Link } to={ `/project/${projectIdentifier}/projectTask` } >Back to Project Tasks</Button>
                        <Dropdown className='button icon' >
                            <Dropdown.Menu>
                                <Dropdown.Item as={ Link } to={ `/project/${projectIdentifier}/projectTask/edit/${projectTaskSequence}` } text="Edit" />
                                <Dropdown.Item as={ Link } to={ `/project/${projectIdentifier}/projectTask/delete/${projectTaskSequence}` } text="Delete" />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>

                </Segment.Group>


                <Container style={ { width: '90%', margin: '0 auto' } }>
                    <Header as='h3' >
                        Attachments
                </Header>
                </Container>

                <Segment style={ { width: '90%', margin: '10px auto', maxHeight: '500px', overflow: 'auto' } }>
                    <DropZoneComponent { ...this.props } />
                    <AttachmentList { ...this.props } />
                </Segment>


                <Container style={ { width: '90%', margin: '10px auto' } }>
                    <Header as='h3' dividing>
                        Comments
                </Header>
                </Container>

                <Segment style={ { maxWidth: '90%', margin: '10px auto', maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' } }>
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