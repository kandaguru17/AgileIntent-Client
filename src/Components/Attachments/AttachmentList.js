import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllAttachments } from '../../Actions/AttachmentActions';
import AtttachmentItem from './AtttachmentItem';
import { Grid } from 'semantic-ui-react';


class AttachmentList extends Component {

    componentDidMount() {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.getAllAttachments(projectId, projectTaskId);
    }

    renderAttachments = () => {
        const { attachments } = this.props;
        return attachments.map(it => <AtttachmentItem { ...this.props } attachment={ it } key={ it.fileId } />);
    }

    render() {

        const { attachments } = this.props;
        if (attachments.length === 0)
            return 'no attachments added';

        return (
            <>
                <Grid>
                    <Grid.Row columns={ 5 } >
                        { this.renderAttachments() }
                    </Grid.Row>

                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { attachments: Object.values(state.attachments) }
}


export default connect(mapStateToProps, { getAllAttachments })(AttachmentList)