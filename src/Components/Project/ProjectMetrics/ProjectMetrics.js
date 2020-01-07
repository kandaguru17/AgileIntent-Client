import React, { Component } from 'react';
import ProjectMembers from './ProjectMembers'

export default class ProjectMetrics extends Component {
    render() {
        return (
            <div>
                <ProjectMembers { ...this.props } />
            </div>
        )
    }
}
