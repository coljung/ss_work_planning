import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tree } from 'antd';

const TreeNode = Tree.TreeNode;

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedKeys: [],
            available_metrics: [],
        };

        this.onCheck = this.onCheck.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
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

    buildTreeData = (availMetrics) => {
        this.setState({
            available_metrics: availMetrics.available_metrics,
            checkedKeys: availMetrics.available_metrics,
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
    };

    handleCancel = () => {
        this.props.onCancel();
    };

    render() {
        return (
            this.state.available_metrics &&
            <Modal
                title={i18n.t('filterModal.title')}
                visible={this.props.visible}
                className='filterModal'
                onOk={this.handleSave}
                okText={i18n.t('filterModal.saveButton')}
                okButtonProps={{ disabled: !this.state.checkedKeys.length }}
                onCancel={this.handleCancel}
                cancelText={i18n.t('filterModal.cancelButton')}>
                <Tree
                    checkable
                    selectable={false}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}>
                    {this.state.available_metrics.map(metric =>
                        <TreeNode title={i18n.t(`metric.${metric}`)} key={metric} dataRef={metric}>
                        </TreeNode>,
                    )}
                </Tree>
            </Modal>
        );
    }
}

Filter.propTypes = {
    visible: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
