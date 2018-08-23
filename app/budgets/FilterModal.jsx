import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Checkbox, Row, Col, Divider, div } from 'antd';
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

        const indexFound = planTypeOptions.map(x => x.plan === name).indexOf(true);
        if (indexFound > -1) {
            planTypeOptions.splice(indexFound, 1);
        }

        // Add selected checked plan
        if (isPlanChecked === true) {
            planTypeOptions.push(changedPlanType);
        }

        this.setState({
            planCheckedList: planTypeOptions,
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

        // order planCheckedList as receibed from API
        const orderedPlanTypeOptions = [];
        this.props.availableOptions.availablePlans.map(y => (this.state.planCheckedList.map(x => (x.plan === y ? orderedPlanTypeOptions.push(x) : false))));
        // Reset planCheckedList
        this.setState({
            planCheckedList: orderedPlanTypeOptions,
        });
        const selectedPlanFilters = this.state.planCheckedList;
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
            label: i18n.t(`metric.${x}`),
            value: x,
        }));
        const planOptions = this.props.availableOptions.availablePlans.map(x => ({
            label: i18n.t(`plan.${x}`),
            value: x,
        }));

        const yearOptions = [1, 2, 3, 5].map(x => ({
            label: i18n.t(`year.${x}`),
            value: x,
        }));

        return (
            <span>
                <Modal
                    title={i18n.t('filterModal.title')}
                    visible={this.state.isModalActive}
                    className='filterModal'
                    width={800}
                    onOk={this.handleSave}
                    okText={i18n.t('filterModal.saveButton')}
                    okButtonProps={{ disabled: !this.state.metricCheckedList.length || !this.state.planCheckedList.length }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('filterModal.cancelButton')}>
                        <Row>
                            <Col className='column-header' span={4}>{i18n.t('filterModal.metric')}</Col>
                            <Col className='filter-divider-line-pre' span={3}>
                            <Checkbox
                                onChange={this.onMetricCheckAllChange}
                                indeterminate={this.state.metricIndeterminateCheck}
                                checked={this.state.checkAllMetric}>
                                {i18n.t('filterModal.selectAll')}
                            </Checkbox>
                            </Col>
                            <Col className='column-header filter-divider-line-post filter-divider-line-pre' span={10}>{i18n.t('filterModal.planType')}</Col>
                            <Col className='column-header filter-divider-line-post ' span={7}>{i18n.t('filterModal.period')}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col span={24}>
                                <div className="col-container">
                                    <div id='metricFilter' className="col filter-divider-line-pre " >
                                       <Checkbox.Group options={metricOptions} value={this.state.metricCheckedList} onChange={this.onMetricCheckedListChange} />
                                    </div>
                                    <div id='planTypeFilter' className="col filter-divider-line-pre filter-divider-line-post" >
                                        {planOptions.map((x) => {
                                            const planFound = this.state.planCheckedList.find(y => y.plan === x.value);
                                            return (
                                            <CheckedRadioGroup
                                            key={x.value}
                                            name={x.value}
                                            text={x.label}
                                            onChange={this.onPlanCheckedListChange}
                                            options={yearOptions}
                                            selectedOption={planFound ? planFound.numberOfHistoricalYears : 5}
                                            checked={!!planFound}>
                                            </CheckedRadioGroup>
                                            );
                                        })
                                        }
                                    </div>
                                    <div id='periodFilter' className="col filter-divider-line-post" >
                                        <Checkbox
                                            onChange={this.onPeriodCheckAllChange}
                                            checked={true}>
                                            {i18n.t('filterModal.showMonthly')}
                                        </Checkbox>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                </Modal>
                <Button icon="switcher" onClick={this.showModal}>{i18n.t('budgetView.filter')}</Button>
            </span>
        );
    }
}
