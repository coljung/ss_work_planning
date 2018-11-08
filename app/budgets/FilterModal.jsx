import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Checkbox, Row, Col, Divider } from 'antd';
import CheckedRadioGroup from '../components/common/CheckedRadioGroup';

export default class FilterModal extends Component {
    static propTypes = {
        filters: PropTypes.object.isRequired,
        availableOptions: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
    };

    state = {
        isModalActive: false,
        metricCheckedList: [],
        planCheckedList: [],
        metricIndeterminateCheck: true,
        checkAllMetric: false,
        planUncheckedList: [],
    };

    onMetricCheckedListChange = (metricCheckedList) => {
        this.setState({
            metricCheckedList,
            metricIndeterminateCheck: !!metricCheckedList.length && (metricCheckedList.length < this.props.availableOptions.availableMetrics.length),
            checkAllMetric: metricCheckedList.length === this.props.availableOptions.availableMetrics.length,
        });
    };

    onPlanCheckedListChange = (name, isPlanChecked, selectedOption) => {
        const changedPlanType = {
            plan: name,
            numberOfHistoricalYears: selectedOption,
        };

        const planTypeOptions = [...this.state.planCheckedList];
        const uncheckedPlanTypeOptions = [...this.state.planUncheckedList];

        // remove checked planTypesOption from an array by found Index
        const indexFound = planTypeOptions.map(x => x.plan === name).indexOf(true);
        if (indexFound > -1) {
            planTypeOptions.splice(indexFound, 1);
        }

        // remove unchecked planTypesOption from an array by found Index
        const indexUncheckedFound = uncheckedPlanTypeOptions.map(x => x.plan === name).indexOf(true);
        if (indexUncheckedFound > -1) {
            uncheckedPlanTypeOptions.splice(indexUncheckedFound, 1);
        }

        // Push to the appropriate array selected/unselected planType
        if (isPlanChecked === true) {
            planTypeOptions.push(changedPlanType);
        } else {
            uncheckedPlanTypeOptions.push(changedPlanType);
        }

        this.setState({
            planCheckedList: planTypeOptions,
            planUncheckedList: uncheckedPlanTypeOptions,
        });
    };

    onMetricCheckAllChange = (e) => {
        this.setState({
            metricCheckedList: e.target.checked ? this.props.availableOptions.availableMetrics : [],
            metricIndeterminateCheck: false,
            checkAllMetric: e.target.checked,
        });
    };

    handleSave = () => {
        const selectedMetricFilters = this.props.availableOptions.availableMetrics.filter(val => this.state.metricCheckedList.indexOf(val) !== -1);

        const selectedPlanFilters = [];
        for (let i = 0; i < this.props.availableOptions.availablePlans.length; i++) {
            const foundPlan = this.state.planCheckedList.find(x => x.plan === this.props.availableOptions.availablePlans[i]);
            if (foundPlan) {
                selectedPlanFilters.push(foundPlan);
            }
        }

        this.props.onSave({ selectedMetrics: selectedMetricFilters, selectedPlanTypes: selectedPlanFilters });

        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            metricCheckedList: [],
            planCheckedList: [],
            metricIndeterminateCheck: false,
            checkAllMetric: false,
            isModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            metricCheckedList: this.props.filters.selectedMetrics,
            planCheckedList: this.props.filters.selectedPlanTypes,
            metricIndeterminateCheck: !!this.props.filters.selectedMetrics.length && (this.props.filters.selectedMetrics.length < this.props.availableOptions.availableMetrics.length),
            checkAllMetric: this.props.filters.selectedMetrics.length === this.props.availableOptions.availableMetrics.length,
            isModalActive: true,
        });
    };

    render() {
        const metricOptions = this.props.availableOptions.availableMetrics.map(x => ({
            label: i18n.t(`filterModal.filters.metrics.${x}`),
            value: x,
        }));
        const planOptions = this.props.availableOptions.availablePlans.map(x => ({
            label: i18n.t(`filterModal.filters.plans.${x}`),
            value: x,
        }));

        const yearOptions = [1, 2, 3, 5].map(x => ({
            label: i18n.t(`filterModal.filters.years.${x}`),
            value: x,
        }));
        const footer =
        <div>
            { this.state.isModalActive && (!this.state.metricCheckedList.length || !this.state.planCheckedList.length) &&
                <div className="note" >
                    {i18n.t('filterModal.note')}
                </div>
            }
            <span>
                <Button onClick={this.closeModal}>
                    {i18n.t('filterModal.cancelButton')}
                </Button>
                <Button onClick={this.handleSave}
                        type='primary'
                        disabled={ !this.state.metricCheckedList.length || !this.state.planCheckedList.length }>
                        {i18n.t('filterModal.saveButton')}
                </Button>
            </span>
        </div>;

        return (
            <span>
                <Modal
                    title={i18n.t('filterModal.title')}
                    visible={this.state.isModalActive}
                    className='filterModal'
                    width={600}
                    onCancel={this.closeModal}
                    footer={footer}>
                        <Row>
                            <Col className='col-header' span={10}>
                                <Row>
                                    <Col span={8}>{i18n.t('filterModal.metric')}</Col>
                                    <Col span={12} offset={4}>
                                        <Checkbox
                                            onChange={this.onMetricCheckAllChange}
                                            indeterminate={this.state.metricIndeterminateCheck}
                                            checked={this.state.checkAllMetric}>
                                            {i18n.t('filterModal.selectAll')}
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='col-header' span={14}>{i18n.t('filterModal.planType')}</Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col span={10} className="col" >
                                <Checkbox.Group options={metricOptions} value={this.state.metricCheckedList} onChange={this.onMetricCheckedListChange} />
                            </Col>
                            <Col span={14} className="col">
                                {planOptions.map((x) => {
                                    const planFound = this.state.planCheckedList.find(y => y.plan === x.value);
                                    const uncheckedPlan = this.state.planUncheckedList.find(y => y.plan === x.value);
                                    const planUncheckedFound = uncheckedPlan || {};
                                    return (
                                    <CheckedRadioGroup
                                    key={x.value}
                                    name={x.value}
                                    text={x.label}
                                    onChange={this.onPlanCheckedListChange}
                                    options={yearOptions}
                                    selectedOption={planFound ? planFound.numberOfHistoricalYears : planUncheckedFound.numberOfHistoricalYears ? planUncheckedFound.numberOfHistoricalYears : 5 }
                                    checked={!!planFound}>
                                    </CheckedRadioGroup>
                                    );
                                })
                                }
                            </Col>
                        </Row>
                </Modal>
                <Button title={i18n.t('budgetView.filter')} icon="switcher" onClick={this.showModal} />
            </span>
        );
    }
}
