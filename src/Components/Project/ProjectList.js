import React, { Component } from 'react'
import ProjectItem from './ProjectItem';
import { Button, Message, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjects } from '../../Actions/ProjectActions'



class ProjectList extends Component {

    componentDidMount() {
        this.props.getAllProjects();
    }

    renderProjectList = () => {
        return this.props.projects.length !== 0 ?
            this.props.projects.map(project => <ProjectItem project={ project } key={ project.projectIdentifier } />) :
            <Message info style={ { margin: '100px auto', width: '80vw' } }>No Projects Created</Message>
    }

    render() {
        return (
            <div style={ { position: 'relative', top: 100, width: '90vw', margin: '0 auto' } }>
                <Button basic color="green" icon="plus" content="Create New Project" as={ Link } to={ `/project/new` } />
                <Container style={ { width: '100%' } }>
                    { this.renderProjectList() }
                </Container>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { projects: Object.values(state.projects) }

}

export default connect(mapStateToProps, { getAllProjects })(ProjectList)