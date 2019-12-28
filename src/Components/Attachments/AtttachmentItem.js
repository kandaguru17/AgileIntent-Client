import React, { Component } from 'react';
import { Icon, Grid, Card, Header, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import store from '../../Reducers';
import { downloadAttachment, deleteAttachment } from '../../Actions/AttachmentActions';

export default class AtttachmentItem extends Component {


    downloadAttachment = () => {
        const { attachment } = this.props;
        store.dispatch(downloadAttachment(attachment.downloadUri));
    }

    deleteAttachment = () => {
        const { attachment } = this.props;
        const { projectId, projectTaskId } = this.props.match.params;
        store.dispatch(deleteAttachment(projectId, projectTaskId, attachment.fileId));
    }

    render() {
        const { attachment } = this.props;
        if (!attachment)
            return 'loading';

        return (

            <Grid.Column style={ { marginBottom: '10px' } }>
                <Card style={ { height: '100%' } }>
                    <Card.Content textAlign="center" >
                        <Icon name="file" size="huge" />
                        <Header as="h4" style={ { wordBreak: 'break-word' } }>
                            <p> { attachment.attachmentName.length > 50 ? ` ${attachment.attachmentName.substring(0, 50)}...` : attachment.attachmentName }</p>
                        </Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon corner name="delete" link onClick={ this.deleteAttachment } />
                        <Icon corner name="download" link onClick={ this.downloadAttachment } />
                    </Card.Content>
                </Card>
            </Grid.Column >


        )
    }
}
