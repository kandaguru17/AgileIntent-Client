import React, { Component } from 'react';
import { PieChart, Pie, BarChart, Bar, Legend, Tooltip, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { connect } from 'react-redux';
import { getAllProjectTasks } from '../../../Actions/ProjectTaskActions';
import { Segment, Header } from 'semantic-ui-react'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

class ProgressChart extends Component {

    componentDidMount() {
        const { projectId } = this.props.match.params;
        this.props.getAllProjectTasks(projectId);
    }


    render() {
        const { projectTasks } = this.props;

        const statusData = [
            { name: 'DONE', value: projectTasks.filter(it => it.status === 'DONE').length },
            { name: 'IN_PROGRESS', value: projectTasks.filter(it => it.status === 'IN PROGRESS').length },
            { name: 'TO_DO', value: projectTasks.filter(it => it.status === 'TO DO').length }];


        const PriorityData = [
            { name: '4-Low', value: projectTasks.filter(it => it.status !== 'DONE' && it.priority === 4).length },
            { name: '3-Medium', value: projectTasks.filter(it => it.status !== 'DONE' && it.priority === 3).length },
            { name: '2-High', value: projectTasks.filter(it => it.status !== 'DONE' && it.priority === 2).length },
            { name: '1-Critical', value: projectTasks.filter(it => it.status !== 'DONE' && it.priority === 1).length }];

        return (
            <div style={ { margin: '50px auto', width: '90vw' } }>
                <Header as='h3' dividing >
                    Reporting
                </Header>
                <Segment.Group horizontal>
                    <Segment style={ { overflow: 'auto' } }>
                        <PieChart width={ 550 } height={ 350 } margin={ { top: 0, right: 0, left: 160, bottom: 5, } }>
                            <Pie dataKey="value" isAnimationActive={ false } data={ statusData } cx={ 200 } cy={ 150 } outerRadius={ 130 } fill="#8884d8"   >
                                { statusData.map((entry, index) => <Cell key={ `cell-${index}` } fill={ COLORS[index % COLORS.length] } />) }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Segment>

                    <Segment  style={ { overflow: 'auto' } }>
                        <BarChart
                            width={ 550 }
                            height={ 350 }
                            data={ PriorityData }
                            margin={ { top: 0, right: 0, left: 160, bottom: 5, } }
                            cx={ 200 } cy={ 150 } 
                           >
                            <CartesianGrid strokeDasharray="5 5"
                            />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                        </BarChart>
                    </Segment>

                </Segment.Group>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { projectTasks: Object.values(state.projectTasks) }
}

export default connect(mapStateToProps, { getAllProjectTasks })(ProgressChart)