import React, { Component } from 'react';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';
import { authenticate, registerUser } from '../../Actions/SecurityActions'
import { Divider, Grid, Segment, Image, Message } from 'semantic-ui-react';
import RegistrationForm from './RegistrationForm'
import myLogo from '../Navbar/MyLogo.png';
import history from '../../history'

class Authentication extends Component {

    authenticate = (formValues) => {
        this.props.authenticate(formValues);
    }

    registerUser = (formValues) => {
        this.props.registerUser(formValues)
    }

    checkValidationErrors = () => {
        const { error } = this.props
        const errArr = Object.entries(error);
        console.log(errArr);
        if (errArr.length > 0) {
            const newErrArr = errArr.map((it, i) => {
                return (`${it[0]} : ${it[1]}`);
            })
            return <Message
                negative
                header='There was some errors with your submission'
                list={ newErrArr }
                style={ { position: 'relative', top: 50, width: '40%', margin: '0 auto' } } ></Message>
        }
    }

    checkAlreadyLoggedIn = () => {
        const { user } = this.props.auth;
        const currentTime = Date.now() / 1000;
        if (user && user.exp > currentTime)
            history.push('/dashboard')
    }

    render() {
        return (
            <>
                {/* { this.checkAlreadyLoggedIn() } */ }
                 {/* { this.checkValidationErrors() } */}
                <Image size="medium" src={ myLogo } centered />
                <Segment placeholder style={ { width: '90%', margin: '0 auto', marginTop: '5px' } }>
                    <Grid columns={ 2 } relaxed='very' stackable>
                        <Grid.Column verticalAlign='middle'>
                            <RegistrationForm registerUser={ this.registerUser } />
                        </Grid.Column>
                        <Grid.Column verticalAlign='middle'>
                            <LoginForm authenticate={ this.authenticate } />
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>
            </>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return state;
}

export default connect(mapStateToProps, { authenticate, registerUser })(Authentication);