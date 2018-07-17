import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default class PrismModal extends Component {
    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave = () => {
        this.props.onSave();
    };

    handleCancel = () => {
        this.props.onCancel();
    };

    render() {
        return (
            <Modal
                title={i18n.t('filterModal.title')}
                visible={this.props.visible}
                className='filterModal'
                onOk={this.handleSave}
                okText={i18n.t('filterModal.saveButton')}
                onCancel={this.handleCancel}
                cancelText={i18n.t('filterModal.cancelButton')}>
                {this.props.content}
            </Modal>
        );
    }
}

PrismModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,

    content: PropTypes.element.isRequired,
};
