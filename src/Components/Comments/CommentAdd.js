import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../Actions/CommentActions';
import CommentForm from './CommentForm';

class CommentAdd extends Component {

    onSubmit = (formValues) => {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.addComment(projectId, projectTaskId, formValues);
    }

    render() {
        return (
            <div style={ { width: '90%', margin: '0 auto 10px' } }>
                <CommentForm  onSubmit={ this.onSubmit } buttonText="Add Comment" rows="5" />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return state;
}


export default connect(mapStateToProps, { addComment })(CommentAdd)



