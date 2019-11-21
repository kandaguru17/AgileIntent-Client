import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { getProject, deleteProject } from '../../Actions/ProjectActions'
import ModalComponent from './Modal';
import history from '../../history';


class DeleteProject extends Component {

    componentDidMount() {

        const { id } = this.props.match.params
        this.props.getProject(id);
    }


    onAccept = () => {
        const { id } = this.props.match.params;
        this.props.deleteProject(id);
        history.push('/dashboard')
    }

    onDismiss = () => {
        history.push('/dashboard');
    }

    render() {

        if (!this.props.project) {
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
    return { project: state.projects[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { getProject, deleteProject })(DeleteProject);