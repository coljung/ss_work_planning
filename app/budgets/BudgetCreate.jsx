import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default class BudgetCreate extends Component {

    render() {
        return (
            <Modal
                title="Basic Modal"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onOverlayClick}>

                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}

BudgetCreate.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
};
