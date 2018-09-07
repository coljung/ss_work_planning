import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Checkbox, Row, Col } from 'antd';
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

        return (
            <span>
                <Modal
                    title={i18n.t('filterModal.title')}
                    visible={this.state.isModalActive}
                    className='filterModal'
                    width={600}
                    onOk={this.handleSave}
                    okText={i18n.t('filterModal.saveButton')}
                    okButtonProps={{ disabled: !this.state.metricCheckedList.length || !this.state.planCheckedList.length }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('filterModal.cancelButton')}>
                        <Row>
                            <Col className='column-header' span={5}>{i18n.t('filterModal.metric')}</Col>
                            <Col className='filter-divider-line-pre' span={5}>
                                <Checkbox
                                    onChange={this.onMetricCheckAllChange}
                                    indeterminate={this.state.metricIndeterminateCheck}
                                    checked={this.state.checkAllMetric}>
                                    {i18n.t('filterModal.selectAll')}
                                </Checkbox>
                            </Col>
                            <Col className='column-header filter-divider-line-post' span={14}>{i18n.t('filterModal.planType')}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col span={10} className="col filter-divider-line-pre" >
                                <div className="col-container">
                                    <div id='metricFilter'>
                                       <Checkbox.Group options={metricOptions} value={this.state.metricCheckedList} onChange={this.onMetricCheckedListChange} />
                                    </div>
                                </div>
                            </Col>
                            <Col span={14} className="col filter-divider-line-post">
                                <div id='planTypeFilter'>
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
                                </div>
                            </Col>
                        </Row>
                </Modal>
                <Button icon="switcher" onClick={this.showModal}>{i18n.t('budgetView.filter')}</Button>
            </span>
        );
    }
}
