import React, { Component } from 'react';
import ProjectMembers from './ProjectMembers';
import ProjectDetails from './ProjectDetails'
import ProgressChart from './ProgressChart'

export default class ProjectMetrics extends Component {
    render() {
        return (
            <div>
                <ProjectDetails { ...this.props } />
                <ProjectMembers { ...this.props } />
                <ProgressChart { ...this.props } />

            </div>
        )
    }
}
