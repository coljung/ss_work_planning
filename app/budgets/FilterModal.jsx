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
    years =[1, 2, 3, 5];
    state = {
        isModalActive: false,
        metricCheckedList: [],
        planCheckedList: [],
        metricInderterminateCheck: true,
        checkAllMetric: false,
    };

    onMetricCheckedListChange = (metricCheckedList) => {
        this.setState({
            metricCheckedList,
            metricInderterminateCheck: !!metricCheckedList.length && (metricCheckedList.length < this.props.availableOptions.availableMetrics.length),
            checkAllMetric: metricCheckedList.length === this.props.availableOptions.availableMetrics.length,
        });
    };

    onPlanCheckedListChange = (name, chackedPlan, selectedOption) => {
        const changedPlanType = {
            plan: name,
            numberOfHistoricalYears: selectedOption,
        };

        const planTypeOptions = [...this.state.planCheckedList];
        const indexFound = planTypeOptions.map(x => x.plan === name).indexOf(true);

        if (indexFound > -1) { planTypeOptions.splice(indexFound, 1); }
        // Add selected checked plan
        if (chackedPlan === true) {
            planTypeOptions.push(changedPlanType);
        }
        this.setState({
            planCheckedList: planTypeOptions,
        });
    };

    onMetricCheckAllChange = (e) => {
        this.setState({
            metricCheckedList: e.target.checked ? this.props.availableOptions.availableMetrics : [],
            metricInderterminateCheck: false,
            checkAllMetric: e.target.checked,
        });
    };

    handleSave = () => {
        const selectedMetricFilters = this.props.availableOptions.availableMetrics.filter(val => this.state.metricCheckedList.indexOf(val) !== -1);
        const selectedPlanFilters = this.state.planCheckedList;
        this.props.onSave({ selectedMetrics: selectedMetricFilters, selectedPlanTypes: selectedPlanFilters });

        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            metricCheckedList: [],
            planCheckedList: [],
            metricInderterminateCheck: false,
            checkAllMetric: false,
            isModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            metricCheckedList: this.props.filters.selectedMetrics,
            planCheckedList: this.props.filters.selectedPlanTypes,
            metricInderterminateCheck: !!this.props.filters.selectedMetrics.length && (this.props.filters.selectedMetrics.length < this.props.availableOptions.availableMetrics.length),
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

        const yearOptions = this.years.map(x => ({
            label: i18n.t(`year.${x}`),
            value: x,
        }));

        return (
            <span>
                <Modal
                    title={i18n.t('filterModal.title')}
                    visible={this.state.isModalActive}
                    className='filterModal'
                    onOk={this.handleSave}
                    okText={i18n.t('filterModal.saveButton')}
                    okButtonProps={{ disabled: !this.state.metricCheckedList.length || !this.state.planCheckedList.length }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('filterModal.cancelButton')}>
                        <Row>
                          <Col span={5}>{i18n.t('filterModal.metric')}</Col>
                             <Col className='filter-divider-line-pre' span={5}> <Checkbox
                                  metricInderterminateCheck={this.state.metricInderterminateCheck}
                                  onChange={this.onMetricCheckAllChange}
                                  checked={this.state.checkAllMetric}>
                                   {i18n.t('filterModal.selectAll')}
                               </Checkbox>
                          </Col>
                          <Col className='filter-divider-line-post' span={14}>{i18n.t('filterModal.planType')}</Col>
                        </Row>
                        <Row>
                            <Col className='filter-divider-line-pre' span={10}>
                               <hr />
                               <Checkbox.Group options={metricOptions} value={this.state.metricCheckedList} onChange={this.onMetricCheckedListChange} />
                            </Col>
                            <Col className='filter-divider-line-post' span={14}>
                               <hr className='filter-hr-post'/>
                                {planOptions.map(x => (
                                    <CheckedRadioGroup
                                        key={x.value}
                                        name={x.value}
                                        text={x.label}
                                        onChange={this.onPlanCheckedListChange}
                                        options={yearOptions}
                                        selectedOption={5}
                                        checked={this.state.planCheckedList.indexOf(x.value) > -1 }>
                                    </CheckedRadioGroup>
                                ))
                                }

                            </Col>
                        </Row>
                </Modal>
                <Button icon="switcher" onClick={this.showModal}>{i18n.t('budgetView.filter')}</Button>
            </span>
        );
    }
}
