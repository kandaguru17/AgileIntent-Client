import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';


class ModalComponent extends Component {

    render() {

        return (
            <Modal open={ this.props.modalOpen } basic size='small'>
                <Header icon='delete' content='Delete' />
                <Modal.Content>
                    <p>
                        Are you sure you want to Delete this item?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={ this.props.onDismiss } basic color='red' inverted>
                        <Icon name='remove' /> No
                     </Button>
                    <Button onClick={ this.props.onAccept } color='green' inverted>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}



export default ModalComponent;