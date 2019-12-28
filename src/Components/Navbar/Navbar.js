import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logOut } from '../../Actions/SecurityActions';

class Navbar extends Component {

    state = { active: 'dashboard' }

    handleClick = (e, menuAttribute) => {
        let { name } = menuAttribute;
        this.setState({ active: name });
        if (name === 'logOut') this.props.logOut();
    }


    renderMenu = () => {
        const { active } = this.state;
        const { isAuthenticated, user } = this.props.auth;
        return isAuthenticated ?
            <>
                <Menu.Item content="Dashboard"
                    name="dashboard"
                    as={ Link } to="/dashboard"
                    onClick={ this.handleClick }
                    active={ active === 'dashboard' }
                />

                <Menu.Item position="right"
                    as={ Link } to=""
                    name={ `${user.firstName} ${user.lastName}` } >
                </Menu.Item>
                <Menu.Item content="Log Out"
                    name="logOut"
                    as={ Link } to="/auth"
                    onClick={ this.handleClick }
                    active={ active === 'logOut' }
                />
            </>
            : ''
    }


    render() {
        return (
            <div>
                <Menu inverted className="fixed">
                    <Menu.Item content="AgileIntent"
                        as={ Link } to="/"
                        name="dashboard"
                        style={ { fontFamily: 'cursive', fontWeight: 'bold' } }
                    />
                    { this.renderMenu() }
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return { auth: state.auth }
}

export default connect(mapStateToProps, { logOut })(Navbar);












