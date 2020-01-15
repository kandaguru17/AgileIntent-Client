import React, { Component } from 'react'
import { Segment, Form, Button, List, Header} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { listProjectMembers, addProjectMember, removeProjectMember } from '../../../Actions/ProjectMemberActions'
import { getProject } from '../../../Actions/ProjectActions'

class ProjectMembers extends Component {

    state = { username: '' }

    componentDidMount() {
        const { projectId } = this.props.match.params;
        this.props.listProjectMembers(projectId);
        this.props.getProject(projectId);

    }

    renderProjectMembers = () => {
        const { projectMembers } = this.props;
        return projectMembers.map(it =>
            <List.Item key={ it.id }>
                <List.Icon name='user' />
                <List.Content>
                    <List.Header>{ `${it.firstName} ${it.lastName}` }</List.Header>
                    <a href={ `mailto:${it.username}` }>{ it.username }</a>
                    <List.Description>

                    </List.Description>
                </List.Content>
            </List.Item>);
    }

    addMember = (e) => {
        e.preventDefault();
        const { projectId } = this.props.match.params;
        this.props.addProjectMember(this.state, projectId);
        document.getElementById('add-member').value = ''

    }


    removeMember = (e) => {
        e.preventDefault();
        const { projectId } = this.props.match.params;
        this.props.removeProjectMember(this.state, projectId);
        document.getElementById('remove-member').value = ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    render() {

        return (
            <div style={ { overflow: 'auto' } }>
                <Header as='h3' dividing style={ { margin: '50px auto', width: '90vw' ,marginBottom: '10px'} }>
                    Project Members
                </Header>

                <Segment.Group horizontal style={ { margin: '0px auto', width: '90vw', } }>
                    <Segment >
                        <Form onSubmit={ this.addMember }>
                            <Form.Field width={ 8 }>
                                <label>Add Member</label>
                                <input  placeholder='john@abc.com' name="username" id="add-member" onChange={ this.onChange } required />
                            </Form.Field>
                            <Button basic color="teal" type='submit'>Add Member</Button>
                        </Form>
                    </Segment>
                    <Segment >
                        <Form onSubmit={ this.removeMember }>
                            <Form.Field width={ 8 }>
                                <label>Remove Member</label>
                                <input  placeholder='john@abc.com' name="username" id="remove-member" onChange={ this.onChange } required />
                            </Form.Field>
                            <Button basic negative type='submit'>Remove Member</Button>
                        </Form>
                    </Segment>

                    <Segment style={ { height: '250px', overflow: 'auto' } }>
                        <List>
                            { this.renderProjectMembers() }
                        </List>
                    </Segment>
                </Segment.Group>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return { project: state.project, projectMembers: Object.values(state.projectMembers) };
}

export default connect(mapStateToProps, { listProjectMembers, getProject, addProjectMember, removeProjectMember })(ProjectMembers)