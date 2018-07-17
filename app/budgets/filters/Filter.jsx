import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tree } from 'antd';
import ModalActivator from '../../components/common/ModalActivator';

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedKeys: [],
            available_metrics: [],
            filterModalActive: false,
        };

        this.toggleFilterModal = this.toggleFilterModal.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount = () => {
        if (Object.keys(this.props.filters).length) {
            this.buildTreeData(this.props.filters);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.filters !== this.props.filters) {
            this.buildTreeData(nextProps.filters);
        }
    };

    toggleFilterModal = () => {
        this.setState({
            filterModalActive: !this.state.filterModalActive,
        });
    };

    buildTreeData = (config) => {
        this.setState({
            available_metrics: config.available_metrics,
            checkedKeys: config.available_metrics,
        });
    };

    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys,
        });
    };

    handleSave = () => {
        const orderedSelectedFilters = this.state.available_metrics.filter(val => this.state.checkedKeys.indexOf(val) !== -1);

        this.props.onSave(orderedSelectedFilters);

        this.closeModal();
    };

    closeModal = () => {
        this.setState({
            filterModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            filterModalActive: true,
        });
    };

    render() {
        return (
            <span>
                <Modal
                    title={i18n.t('filterModal.title')}
                    visible={this.state.filterModalActive}
                    className='filterModal'
                    onOk={this.handleSave}
                    okText={i18n.t('filterModal.saveButton')}
                    okButtonProps={{ disabled: !this.state.checkedKeys.length }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('filterModal.cancelButton')}>
                    <Tree
                        checkable
                        selectable={false}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}>
                        {this.state.available_metrics.map(metric =>
                            <Tree.TreeNode title={i18n.t(`metric.${metric}`)} key={metric} dataRef={metric}>
                            </Tree.TreeNode>,
                        )}
                    </Tree>
                </Modal>
                <ModalActivator label={i18n.t('budgetView.filter')} showModal={this.showModal} />
            </span>
        );
    }
}

Filter.propTypes = {
    filters: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};
