import React, { Component } from 'react'
import ProjectItem from './ProjectItem';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllProjects } from '../../Actions/ProjectActions'

class ProjectList extends Component {

    componentDidMount() {
        console.log('get all proj')
        this.props.getAllProjects();
    }

    renderProjectList = () => {
        return this.props.projects.map(project => <ProjectItem project={ project } key={ project.projectIdentifier } />)
    }

    render() {
        return (
            <div>
                <Button icon="plus" positive content="Create Project" floated="right" style={ { margin: '50px 150px' } } as={ Link } to="/project/new" />
                <br></br>

                { this.renderProjectList() }

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return { projects: Object.values(state.projects) }

}

export default connect(mapStateToProps, { getAllProjects })(ProjectList)