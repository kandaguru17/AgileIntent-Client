import React, { Component } from 'react'
import { Message, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { APP_URI } from '../../AppConst'
import store from '../../Reducers';


const ROOT_URL = `${APP_URI}/api/users/activate`
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}

const style = {
    margin: '50px auto',
    width: '90vw',

}

export default class ConfirmAccount extends Component {

    state = { isConfirmed: false, isExpired: false, isAlreadyActivated: false }

    async componentDidMount() {
        try {
            const { search } = this.props.location;
            const token = search.substr(7);
            const res = await Axios.get(`${ROOT_URL}?token=${token}`, { headers });
            if (res.data.enabled)
                this.setState({ isConfirmed: true, isExpired: false, isAlreadyActivated: false });
        } catch (err) {
            if (err.response.data.userProfile.includes("activated"))
                return this.setState({ isExpired: false, isConfirmed: false, isAlreadyActivated: true });
            if (err.response.data.userProfile.includes("expired"))
                return this.setState({ isExpired: true, isConfirmed: false, isAlreadyActivated: false });
            store.dispatch({ type: 'ERROR', payload: err.response.data })
        }
    }

    renderMessages = () => {
        const { isExpired, isConfirmed, isAlreadyActivated } = this.state;

        if (isExpired)
            return <Message error style={ style }>Activation Link expired. Please sign up again with us</Message>

        if (isConfirmed)
            return <Message success style={ style }>Successfully Registered. <Link to='/auth'>Login</Link> to Continue</Message>

        if (isAlreadyActivated)
            return <Message warning style={ style }>You are already an active user with us</Message>

    }

    render() {

        return (
            <div style={ { overflow: 'auto' } }>
                <Header as='h1' icon textAlign='center' style={ { marginTop: '90px' } }>
                    <Icon name='settings' circular />
                    <Header.Content>Welcome to Agile Intent!</Header.Content>
                </Header>
                { this.renderMessages() }
            </div>
        )
    }
}
