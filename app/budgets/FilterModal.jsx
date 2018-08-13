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

    onChange = (metricCheckedList, planCheckedList) => {
        this.setState({
            metricCheckedList,
            planCheckedList,
            indeterminate: !!metricCheckedList.length && (metricCheckedList.length < this.props.availableOptions.available_metrics.length),
            checkAllMetric: metricCheckedList.length === this.props.availableOptions.available_metrics.length,
        });
    };

    onCheckAllChange = (e) => {
        this.setState({
            metricCheckedList: e.target.checked ? this.props.availableOptions.available_metrics : [],
            indeterminate: false,
            checkAllMetric: e.target.checked,
        });
    };

    handleSave = () => {
        const orderedSelectedFilters = this.props.availableOptions.filter(val => this.state.metricCheckedList.indexOf(val) !== -1);

        this.props.onSave({ available_metrics: orderedSelectedFilters });

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
            metricCheckedList: this.props.filters.available_metrics,
            planCheckedList: this.props.filters.available_rows,
            indeterminate: !!this.props.filters.available_metrics.length && (this.props.filters.available_metrics.length < this.props.availableOptions.available_metrics.length),
            checkAllMetric: this.props.filters.available_metrics.length === this.props.availableOptions.available_metrics.length,
            isModalActive: true,
        });
    };

    render() {
        const metricOptions = this.props.availableOptions.available_metrics.map(x => ({
            label: i18n.t(`metric.${x}`),
            value: x,
        }));
        const planOptions = this.props.availableOptions.available_rows.map(x => ({
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
                    okButtonProps={{ disabled: !this.state.metricCheckedList.length }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('filterModal.cancelButton')}>
                    <div>
                        <Row>
                          <Col span={12}>Metric</Col>
                          <Col span={12}>Plan Type</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col span={12}>
                                <div>
                                   <Checkbox
                                       style={{ width: '100%', margin: '0px 0px 20px 0px' }}
                                       indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAllMetric}>
                                        {i18n.t('filterModal.selectAll')}
                                   </Checkbox>

                                   <Checkbox.Group options={metricOptions} value={this.state.metricCheckedList} onChange={this.onChange} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Checkbox.Group options={planOptions} value={this.state.planCheckedList} onChange={this.onChange} />
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <Button icon="switcher" onClick={this.showModal}>{i18n.t('budgetView.filter')}</Button>
            </span>
        );
    }
}
