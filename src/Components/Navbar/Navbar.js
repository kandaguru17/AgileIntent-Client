import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logOut } from '../../Actions/SecurityActions';

class Navbar extends Component {

    state = { active: '' }

    handleClick = (e, menuAttribute) => {
        console.log(menuAttribute.name)
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
                <Menu.Item content="Assigned To Me"
                    name="assigned"
                    as={ Link } to="/assigned-issues"
                    onClick={ this.handleClick }
                    active={ active === 'assigned' }
                />


                <Menu.Menu position='right' style={ { marginRight: '20px' } }>
                    <Dropdown icon='user' pointing item>
                        <Dropdown.Menu>
                            <Dropdown.Header icon='user' content={ `Hi, ${user.firstName} ` } />
                            <Divider />
                            <Dropdown.Item as={ Link }
                                active={ active === 'assigned' }
                                name="assigned"
                                to='/assigned-issues'>
                                Assigned To me
                            </Dropdown.Item>

                            <Dropdown.Item as={ Link }
                                to="/auth"
                                onClick={ this.handleClick }
                                name="logOut"
                            >Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </>
            :
            <>
                <Menu.Item content="Get Started"
                    position="right"
                    as={ Link } to="/auth"
                    name="getStarted"
                    active={ active === 'getStarted' }
                    style={ { fontWeight: 'bold' } }
                    onClick={ this.handleClick }
                />
            </>
    }


    render() {
        const { active } = this.state;
        return (
            <div>
                <Menu inverted className="fixed" size="small">
                    <Menu.Item content="AgileIntent"
                        as={ Link } to="/"
                        name="index"
                        active={ active === 'index' }
                        style={ { fontFamily: 'cursive', fontWeight: 'bold' } }
                        onClick={ this.handleClick }
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












