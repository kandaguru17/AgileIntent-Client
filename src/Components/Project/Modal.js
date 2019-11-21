import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';


class ModalComponent extends Component {

    render() {

        return (
            <Modal open={ this.props.modalOpen } basic size='small'>
                <Header icon='archive' content='Archive Old Messages' />
                <Modal.Content>
                    <p>
                        Your inbox is getting full, would you like us to enable automatic
                        archiving of old messages?
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