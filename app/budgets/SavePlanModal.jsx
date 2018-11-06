import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Radio } from 'antd';

export default class SavePlanModal extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
    };

    state = {
        isModalActive: false,
        selectedPlan: null,
    };

    revisedPlanTypes = [
        'op', // Original Plan
        'rp1', // Revised Plan 1
        'rp2', // Revised Plan 2
        'rp3', // Revised Plan 3
    ];

    handleSelectedPlanChange = (selection) => {
        this.setState({
            selectedPlan: selection.target.value,
        });
    };

    handleSave = () => {
        this.props.onSave(this.state.selectedPlan);

        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            selectedPlan: null,
            isModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            selectedPlan: null,
            isModalActive: true,
        });
    };

    render() {
        return (
            <span>
                <Modal
                    title={i18n.t('budgetView.savePlanModal.title')}
                    visible={this.state.isModalActive}
                    className='save-plan-modal'
                    width={400}
                    onOk={this.handleSave}
                    okText={i18n.t('budgetView.savePlanModal.saveButton')}
                    okButtonProps={{ disabled: !this.state.selectedPlan }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('budgetView.savePlanModal.cancelButton')}>
                    <Radio.Group value={this.state.selectedPlan}
                                 onChange={this.handleSelectedPlanChange}
                                 buttonStyle='solid'>
                        {
                            this.revisedPlanTypes.map(x => (
                                <Radio.Button key={x} value={x}>{i18n.t(`budgetView.savePlanModal.planTypes.${x}`)}</Radio.Button>
                            ))
                        }
                    </Radio.Group>
                </Modal>
                <Button title={i18n.t('budgetView.saveButton')} icon="save" onClick={this.showModal} />
            </span>
        );
    }
}
