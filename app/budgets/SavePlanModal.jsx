import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

export default class SavePlanModal extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
    };

    state = {
        isModalActive: false,
    };

    handleSave = () => {
        this.props.onSave();

        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            isModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            isModalActive: true,
        });
    };

    render() {
        return (
            <span>
                <Modal
                    title={i18n.t('budgetView.savePlanModal.title')}
                    visible={this.state.isModalActive}
                    className='savePlanModal'
                    width={400}
                    onOk={this.handleSave}
                    okText={i18n.t('budgetView.savePlanModal.saveButton')}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('budgetView.savePlanModal.cancelButton')}>
                    Hello
                </Modal>
                <Button title={i18n.t('budgetView.saveButton')} icon="save" onClick={this.showModal} />
            </span>
        );
    }
}
