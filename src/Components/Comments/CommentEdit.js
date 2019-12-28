import React, { Component } from 'react'
import CommentForm from './CommentForm'
import { connect } from 'react-redux';
import { getComment, editComment } from '../../Actions/CommentActions';


class CommentEdit extends Component {

    render() {
        console.log(this.props)
       
        return (
            <>
                <CommentForm form="commentEdit" initialValues={ this.props.initialValues } buttonText="Update Comment" onSubmit={ this.props.onSubmit } />
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { comment: state.comments[ownProps.match.params.commentId] };
}

export default connect(mapStateToProps, { getComment, editComment })(CommentEdit);