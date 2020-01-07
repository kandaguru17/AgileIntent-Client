import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

class ErrorComponent extends Component {

    render() {
        const { error } = this.props;

        if (Object.values(error).length !== 0)
            return <Message style={ { position:'absolute',margin: '45px 90px auto ', width: '90%' } } negative content={ Object.values(error)[0] } />

        return (<React.Fragment />)
    }
}


const mapStateToProps = (state, ownProps) => {
    ;
    return { error: state.error }
}

export default connect(mapStateToProps)(ErrorComponent);