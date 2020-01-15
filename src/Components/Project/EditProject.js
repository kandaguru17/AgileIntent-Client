import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dimmer, Loader,Icon,Header } from 'semantic-ui-react';


import ProjectForm from './ProjectForm';
import { getProject, updateProject } from '../../Actions/ProjectActions'

class EditProject extends Component {

    state = { projectLoaded: true }


    componentDidMount() {

        const { id } = this.props.match.params
        this.props.getProject(id);
    }

    onSubmit = (formValues) => {
        const { id } = this.props.match.params
        this.props.updateProject(id, formValues);
    }


    render() {
        const { project } = this.props

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
               <Header as='h2' icon style={ { position: 'relative', top: 100, left: '0%', width: '90%'  } }>
                    <Icon name='edit' />
                     Edit Project 
                </Header>
            <div style={ { position: 'relative', top: 100, left: '27%', width: '100%' } }>
                <ProjectForm onSubmit={ this.onSubmit } initialValues={ project } formName={ `Update Project` } cancelLink={`/dashboard`} />
            </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {


    console.log(ownProps);
    return { project: state.projects[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { getProject, updateProject })(EditProject);