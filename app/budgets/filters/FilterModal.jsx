import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Checkbox } from 'antd';

export default class FilterModal extends Component {
    static propTypes = {
        filters: PropTypes.array.isRequired,
        availableFilters: PropTypes.array.isRequired,
        onSave: PropTypes.func.isRequired,
    };

    state = {
        isModalActive: false,
        checkedList: [],
        indeterminate: true,
        checkAll: false,
    };

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.props.availableFilters.length),
            checkAll: checkedList.length === this.props.availableFilters.length,
        });
    };

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? this.props.availableFilters : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    handleSave = () => {
        const orderedSelectedFilters = this.props.availableFilters.filter(val => this.state.checkedList.indexOf(val) !== -1);

        this.props.onSave(orderedSelectedFilters);

        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            checkedList: [],
            indeterminate: false,
            checkAll: false,
            isModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            checkedList: this.props.filters,
            indeterminate: !!this.props.filters.length && (this.props.filters.length < this.props.availableFilters.length),
            checkAll: this.props.filters.length === this.props.availableFilters.length,
            isModalActive: true,
        });
    };

    render() {
        const options = this.props.availableFilters.map((x) => {
            return {
                label: i18n.t(`metric.${x}`),
                value: x,
            };
        });

        return (
            <span>
                <Modal
                    title={i18n.t('filterModal.title')}
                    visible={this.state.isModalActive}
                    className='filterModal'
                    onOk={this.handleSave}
                    okText={i18n.t('filterModal.saveButton')}
                    okButtonProps={{ disabled: !this.state.checkedList.length }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('filterModal.cancelButton')}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}>
                        Check all
                    </Checkbox>
                    <hr />
                    <Checkbox.Group options={options} value={this.state.checkedList} onChange={this.onChange} />
                </Modal>
                <Button icon="switcher" onClick={this.showModal}>{i18n.t('budgetView.filter')}</Button>
            </span>
        );
    }
}
