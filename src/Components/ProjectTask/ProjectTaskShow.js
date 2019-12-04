import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Image, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProjectTask } from '../../Actions/ProjectTaskActions';
import history from '../../history';


const PRIORITY_OPTIONS = [
    { key: '1', value: '1', text: '1-Critical' },
    { key: '2', value: '2', text: '2-High' },
    { key: '3', value: '3', text: '3-Medium' },
    { key: '4', value: '4', text: '4-Low' }
]

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
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
            )

        const { projectTaskSequence, summary, priority, status, createdAt, updatedAt, acceptanceCriteria } = this.props.projectTask;

        return (
            <>
                <Modal open={ this.state.open } >
                    <Modal.Header>{ `${projectTaskSequence} - ${summary}` } </Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <Header>Acceptance Criteria :</Header>
                            <p>{ acceptanceCriteria }</p>
                            <Header>Priority :</Header>
                            <p>{ this.renderPriority(priority) }</p>
                            <Header>Status :</Header>
                            <p>{ status }</p>
                            <Header>Created At :</Header>
                            <p>{ createdAt }</p>
                            <Header>Updated At :</Header>
                            <p>{ updatedAt === null ? 'No Updates Yet' : updatedAt }</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={ this.onDismiss }>
                            Back to Project Tasks
                        </Button>
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



{/* <TransitionablePortal onClose={ this.props.handleClose } open={ open }>
<Segment style={ {
    position: "relative",
    bottom: "100%",
    width: "60%",
    margin: "0 auto",
    height: "100%",
    zIndex: '1000px'
} }>

    <Header>{ projectIdentifier }</Header>
    <Header>{ projectTaskSequence }</Header>
    <p>{ summary }</p>
    <p>{ acceptanceCriteria }</p>
    <p>{ priority }</p>
    <p>{ status }</p>
    <p>{ createdAt }</p>
    <p>{ updatedAt }</p>
</Segment>
</TransitionablePortal> */}