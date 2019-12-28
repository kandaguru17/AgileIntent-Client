import React, { Component } from 'react';
import { getProjectTask, deleteProjectTask } from '../../Actions/ProjectTaskActions';
import { connect } from 'react-redux';
import history from '../../history';
import { Dimmer, Loader } from 'semantic-ui-react';
import ModalComponent from '../Project/Modal'


class ProjectTaskDelete extends Component {

    componentDidMount() {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.getProjectTask(projectId, projectTaskId);
    }

    onAccept = () => {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.deleteProjectTask(projectId, projectTaskId);
        history.push(`/project/${projectId}/projectTask/`);
    }

    onDismiss = () => {
        history.push('/dashboard');
    }

    render() {
        if (!this.props.projectTasks) {
            return (
                <div>
                    <Dimmer active>
                        <Loader >Loading</Loader>
                    </Dimmer>
                </div>
            )
        }
        return (
            <ModalComponent modalOpen={ true } onAccept={ this.onAccept } onDismiss={ this.onDismiss } />
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return state;
}

export default connect(mapStateToProps, { getProjectTask, deleteProjectTask })(ProjectTaskDelete);