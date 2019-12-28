import React, { Component } from 'react'
import ProjectItem from './ProjectItem';
import { Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjects } from '../../Actions/ProjectActions'
import ErrorComponent from '../Error/ErrorComponent';


class ProjectList extends Component {

    componentDidMount() {
        this.props.getAllProjects();
    }

    renderProjectList = () => {
        return this.props.projects.length !== 0 ?
            this.props.projects.map(project => <ProjectItem project={ project } key={ project.projectIdentifier } />) :
            <Message info style={ { margin: '100px auto', width: '80%' } }>No Projects Created</Message>
    }

    render() {
        return (
            <div>
                <Button icon="plus" basic positive content="Create Project" floated="right" style={ { margin: '50px 150px' } } as={ Link } to="/project/new" />
                <br></br>
                { this.renderProjectList() }
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return { projects: Object.values(state.projects) }

}

export default connect(mapStateToProps, { getAllProjects })(ProjectList)