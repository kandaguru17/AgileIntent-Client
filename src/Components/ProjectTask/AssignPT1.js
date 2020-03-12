import React, { Component } from 'react'
import { Input, List } from 'semantic-ui-react'
import Axios from 'axios'
import { APP_URI } from '../../AppConst'
import store from '../../Reducers'
import '../../styles/assignPT.css'

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}

export default class AssignPT1 extends Component {

    state = { suggestions: [], username: '', cursor: 0 }

    allMembers = [];

    onChange = async (e) => {
        const { dispatch } = store;
        const value = e.target.value;
        let suggestions = []

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.allMembers.filter(it => (regex.test(`${it.firstName}`)) || (regex.test(`${it.lastName}`)));
        }


        this.setState({ suggestions, username: e.target.value }, async () => {

            try {
                const { projectId } = this.props.match.params;
                const res = await Axios.get(`${APP_URI}/api/members/search/${projectId}/?firstName=${this.state.username}`, { headers })
                this.setState({ suggestions: res.data });

            } catch (err) {
                console.log(err.response);
                if (err.response) return dispatch({ type: 'ERROR', payload: err.response.data })
                if (err.request) return dispatch({ type: 'ERROR', payload: err.request })
                if (err.message) return dispatch({ type: 'ERROR', payload: err.message })
                return dispatch({ type: 'ERROR', payload: err.config })
            }
        });

    }


    onKeyDown = (e) => {
        const { cursor, suggestions } = this.state;

        if (e.key === 'ArrowUp' && cursor > 0) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1
            }))
        } else if (e.key === 'ArrowDown' && cursor < suggestions.length - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1
            }))
        }
    }


    onItemClick = (e, username) => {
        this.setState({ username: username, suggestions: [] })
        this.props.onSubmit(e, { username: username });
    }


    renderSuggestions = () => {
        const { suggestions, cursor } = this.state;
        if (suggestions.length === 0)
            return null;

        return (
            <List id="user-list">
                { suggestions.map((it, i) => {
                    return (
                        <List.Item className='user-item-list' id={ `${cursor === i ? 'active' : ''}` }
                            as='a' onClick={ (e) => this.onItemClick(e, it.username) } key={ it.username } >
                            <List.Header>{ it.username }</List.Header>
                            { `${it.firstName} ${it.lastName}` }
                        </List.Item>)
                })
                }
            </List>
        )

    }


    render() {
        return (
            <div>
                <Input placeholder='Search...' onChange={ this.onChange } value={ this.state.username } name="username" autoComplete="off" required style={ { width: '40%' } } id='assignInput' onKeyDown={ this.onKeyDown } />
                { this.renderSuggestions() }
            </div>

        )
    }
}
