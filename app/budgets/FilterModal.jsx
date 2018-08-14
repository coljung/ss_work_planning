import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Checkbox, Row, Col } from 'antd';

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
        indeterminate: true,
        checkAllMetric: false,
        checkAllPlan: false,
    };

    onMetricCheckedListChange = (metricCheckedList) => {
        this.setState({
            metricCheckedList,
            indeterminate: !!metricCheckedList.length && (metricCheckedList.length < this.props.availableOptions.available_metrics.length),
            checkAllMetric: metricCheckedList.length === this.props.availableOptions.available_metrics.length,
        });
    };

    onPlanCheckedListChange = (planCheckedList) => {
        this.setState({
            planCheckedList,
        });
    };

    onMetricCheckAllChange = (e) => {
        this.setState({
            metricCheckedList: e.target.checked ? this.props.availableOptions.available_metrics : [],
            indeterminate: false,
            checkAllMetric: e.target.checked,
        });
    };

    handleSave = () => {
        const selectedMetricFilters = this.props.availableOptions.available_metrics.filter(val => this.state.metricCheckedList.indexOf(val) !== -1);
        const selectedPlanFilters = this.props.availableOptions.available_plans.filter(val => this.state.planCheckedList.indexOf(val) !== -1);

        this.props.onSave({ selectedMetrics: selectedMetricFilters, selectedPlanTypes: selectedPlanFilters });

        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            metricCheckedList: [],
            indeterminate: false,
            checkAllMetric: false,
            isModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            metricCheckedList: this.props.filters.selectedMetrics,
            planCheckedList: this.props.filters.selectedPlanTypes,
            indeterminate: !!this.props.filters.selectedMetrics.length && (this.props.filters.selectedMetrics.length < this.props.availableOptions.available_metrics.length),
            checkAllMetric: this.props.filters.selectedMetrics.length === this.props.availableOptions.available_metrics.length,
            isModalActive: true,
        });
    };

    render() {
        const metricOptions = this.props.availableOptions.available_metrics.map(x => ({
            label: i18n.t(`metric.${x}`),
            value: x,
        }));
        const planOptions = this.props.availableOptions.available_plans.map(x => ({
            label: i18n.t(`plan.${x}`),
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
                          <Col span={12}>{i18n.t('filterModal.metric')}</Col>
                          <Col span={12}>{i18n.t('filterModal.planType')}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                               <hr />
                               <Checkbox
                                   style={{ width: '100%', margin: '0px 0px 20px 0px' }}
                                   indeterminate={this.state.indeterminate}
                                   onChange={this.onMetricCheckAllChange}
                                   checked={this.state.checkAllMetric}>
                                   {i18n.t('filterModal.selectAll')}
                               </Checkbox>
                               <Checkbox.Group options={metricOptions} value={this.state.metricCheckedList} onChange={this.onMetricCheckedListChange} />
                            </Col>
                            <Col span={12}>
                               <hr />
                               <Checkbox.Group options={planOptions} value={this.state.planCheckedList} onChange={this.onPlanCheckedListChange} />
                            </Col>
                        </Row>
                </Modal>
                <Button icon="switcher" onClick={this.showModal}>{i18n.t('budgetView.filter')}</Button>
            </span>
        );
    }
}
