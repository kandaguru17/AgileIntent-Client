import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProject } from '../../Actions/ProjectActions';
import { Dimmer, Loader } from 'semantic-ui-react';

class ShowProject extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getProject(id);
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
            <div >

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return { project: state.projects[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { getProject })(ShowProject)