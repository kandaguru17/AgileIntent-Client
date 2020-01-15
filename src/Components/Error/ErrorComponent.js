import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import store from '../../Reducers';

class ErrorComponent extends Component {

    handleDismiss = () => {
        this.setState({ visible: false })
        store.dispatch({type:'ERROR',payload:{}})
    }
  
    render() {
        const { error } = this.props;
        if (Object.values(error).length !== 0)
            return <Message 
            style={ {position:'absolute',top:'45px',left:'90px', width: '90vw',maxHeight:'50px' } } 
            negative content={ Object.values(error)[0] } 
            header="Something went wrong"
            icon="bug"
            onDismiss={this.handleDismiss}    
           />
        
      
        return (<React.Fragment />)
        
       
    }
}


const mapStateToProps = (state, ownProps) => {
    return { error: state.error }
}

export default connect(mapStateToProps)(ErrorComponent);