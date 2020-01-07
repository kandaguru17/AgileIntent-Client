import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadAttachment } from '../../Actions/AttachmentActions'

class DropZoneComponent extends Component {

    handleOnDrop = (acceptedFiles, rejectedFiles) => {
        const { projectId, projectTaskId } = this.props.match.params;
        this.props.uploadAttachment(projectId, projectTaskId, acceptedFiles);

    }

    renderSection = ({ getRootProps, getInputProps }) => {

        return <div style={ { width: '100%', margin: '10px auto', border: '1px dashed grey', height: '50px', textAlign: 'center' } } { ...getRootProps() }>
            <input { ...getInputProps() } />
            <p style={ { marginTop: '15px' } }>Drag 'n' drop some files here, or click to select files</p>
        </div>
    }

    render() {
        return (
            <Dropzone onDrop={ this.handleOnDrop }>
                { this.renderSection }
            </Dropzone>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return state;
}

export default connect(mapStateToProps, { uploadAttachment })(DropZoneComponent)