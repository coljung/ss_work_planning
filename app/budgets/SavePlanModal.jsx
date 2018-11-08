import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Radio } from 'antd';

export default class SavePlanModal extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        existingPlans: PropTypes.array.isRequired,
    };

    state = {
        isModalActive: false,
        selectedPlan: null,
        isExistingPlanSelected: false,
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
            isExistingPlanSelected: this.props.existingPlans.includes(selection.target.value),
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
            isExistingPlanSelected: false,
        });
    };

    showModal = () => {
        this.setState({
            selectedPlan: null,
            isModalActive: true,
            isExistingPlanSelected: false,
        });
    };

    render() {
        const footer =
        <div>
            {this.state.isExistingPlanSelected &&
                <div className="note">
                    {i18n.t('budgetView.savePlanModal.existingPlanSelected', { plan: i18n.t(`budgetView.savePlanModal.planTypes.${this.state.selectedPlan}`) })}
                </div>
            }
            <span>
                <Button onClick={this.closeModal}>
                    {i18n.t('budgetView.savePlanModal.cancelButton')}
                </Button>
                <Button onClick={this.handleSave}
                        type='primary'
                        disabled={ !this.state.selectedPlan }>
                        {i18n.t('budgetView.savePlanModal.saveButton')}
                </Button>
            </span>
        </div>;

        return (
            <span>
                <Modal
                    title={i18n.t('budgetView.savePlanModal.title')}
                    visible={this.state.isModalActive}
                    className='save-plan-modal'
                    width={400}
                    onCancel={this.closeModal}
                    footer={footer}>
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
