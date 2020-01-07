import React, { Component } from 'react';
import { getAllComments } from '../../Actions/CommentActions';
import { connect } from 'react-redux';
import { Comment } from 'semantic-ui-react';
import CommentItem from './CommentItem';

class CommentList extends Component {

    componentDidMount() {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.getAllComments(projectId, projectTaskId);
    }

    renderComments = () => {
        const { comments } = this.props;
        return comments.length !== 0 ?

            <Comment.Group>
                { comments.map(comment => <CommentItem comment={ comment } key={ comment.id } { ...this.props } />) }
            </Comment.Group>
            :
            <>No Comments yet</>

    }

    render() {
        return (<>{ this.renderComments() }</>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return { auth: state.auth, comments: Object.values(state.comments) }
}

export default connect(mapStateToProps, { getAllComments })(CommentList)