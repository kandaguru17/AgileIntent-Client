import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';
import profileImg from '../Navbar/profile-img.png';
import { Link } from 'react-router-dom';
import { deleteComment, editComment } from '../../Actions/CommentActions'
import store from '../../Reducers';
import CommentEdit from './CommentEdit';
import './comments.css'

class CommentItem extends Component {

    state = { isEditing: false };

    openEditor = () => {
        this.setState({ isEditing: true })
    }

    closeEditor=()=>{
        this.setState({isEditing:false})
    }

    onSubmit = (formValues) => {
        const { comment } = this.props;
        const { projectId, projectTaskId } = this.props.match.params;
        store.dispatch(editComment(projectId, projectTaskId, comment.id, formValues));
        this.setState({ isEditing: false });
    }

    deleteComment = () => {
        const { comment } = this.props;
        const { projectId, projectTaskId } = this.props.match.params;
        store.dispatch(deleteComment(projectId, projectTaskId, comment.id));
    }

    renderDeleteEditOptions = () => {
        const { auth } = this.props;
        const { comment } = this.props;
        const { projectId, projectTaskId } = this.props.match.params;

        return ((auth.isAuthenticated) && (auth.user.username === comment.user.username)) ?
            <>
                <Link to={ `/project/${projectId}/projectTask/${projectTaskId}/` } onClick={ this.openEditor }>Edit</Link>
                <Link to={ `/project/${projectId}/projectTask/${projectTaskId}/` } onClick={ this.deleteComment }>Delete</Link>
            </> : ''
    }

    renderComment=()=>{
        const { comment } = this.props;
        return (this.state.isEditing)?
            <CommentEdit initialValues={ { ...comment } } buttonText="Edit Comment" onSubmit={ this.onSubmit } {...this.props} />
            :   
            <>
                <Comment.Metadata>
                        <span>{ comment.createdAt }</span>
                    </Comment.Metadata>
                    <Comment.Text style={ { whiteSpace: 'pre-wrap' } }>{ comment.commentText }
                    </Comment.Text>
                    <Comment.Actions>
                        { this.renderDeleteEditOptions() }
                    </Comment.Actions>
                
              </>      

        
    }

    render() {
       
        const { comment } = this.props;
        return(
        <Comment className="textarea-width">
             <Comment.Avatar as='a' src={ profileImg } />
             <Comment.Content>
             <Comment.Author as='a'>{ `${comment.user.firstName} ${comment.user.lastName}` }</Comment.Author>
                {this.renderComment()}
            </Comment.Content>
        </Comment>
        )
    }
}


export default CommentItem;