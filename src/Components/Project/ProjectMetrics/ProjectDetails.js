import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProject } from '../../../Actions/ProjectActions';
import { Dimmer, Loader, Segment, Header, Icon } from 'semantic-ui-react';

class ProjectDetails extends Component {

    componentDidMount() {
        const { projectId } = this.props.match.params;
        this.props.getProject(projectId);
    }


    render() {

        const { project } = this.props;

        if (!project) {
            return (
                <div>
                    <Dimmer active>
                        <Loader >Loading</Loader>
                    </Dimmer>
                </div>
            )
        }

        return (
            <>
                <Header as='h3' dividing style={ { margin: '100px auto', width: '90vw',marginBottom: '10px' } }>
                    Project Details
                </Header>
                <Segment style={ { margin: '10px auto', width: '90vw',marginBottom: '10px'  } }>
                    <Header>Project Name :</Header>
                    <p style={ { maxWidth: '100%', whiteSpace: 'pre-wrap' } }>
                        { project.projectName }
                    </p>
                    <Header>Description :</Header>
                    <p style={ { maxWidth: '100%', whiteSpace: 'pre-wrap' } }>
                        { project.description }
                    </p>
                    <Header>Project Duration :</Header>
                    <p style={ { maxWidth: '100%', whiteSpace: 'pre-wrap' } }>
                        { `${project.startDate} - ${project.endDate}` }
                    </p>

                    <Header>Reporting Person :</Header>
                    <p style={ { maxWidth: '100%', whiteSpace: 'pre-wrap' } }>
                    <Icon name="user" />
                        { project.reportingPerson }
                    </p>
                </Segment>
            </>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return { project: state.projects[ownProps.match.params.projectId] };
}

export default connect(mapStateToProps, { getProject })(ProjectDetails)