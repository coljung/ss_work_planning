import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Tree } from 'antd';
import { filterSetup, triggerChange } from '../BudgetViewActions';
import filterData from '../components/ManageFilters';

const TreeNode = Tree.TreeNode;

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            available_metrics: [],
            original_list: [],
        };
    }

    componentDidMount = () => {
        if (Object.keys(this.props.config).length) {
            this.buildTreeData(this.props.config);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.config !== this.props.config) {
            this.buildTreeData(nextProps.config);
        }
    };

    buildTreeData = (availMetrics) => {
        const processedFilters = filterData(availMetrics);
        this.setState({
            available_metrics: processedFilters.available_metrics,
            original_list: processedFilters.checkedKeys,
            checkedKeys: processedFilters.checkedKeys,
        });
    };

    onExpand = () => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            autoExpandParent: false,
        });
    };

    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    };

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    });

    closeModal = () => {
        this.props.onOverlayClick();
    };

    submitFilters = () => {
        // send filtered metrics in the same order they were provided
        const orderedSelectedFilters = this.state.original_list.filter(val => this.state.checkedKeys.indexOf(val) !== -1);
        this.props.filterSetup(orderedSelectedFilters);
        this.props.onOverlayClick();
    };

    render() {
        const footerButtons = (
            <div>
                <Button onClick={this.submitFilters} disabled={!this.state.checkedKeys.length} type='primary' id='filterButton'>
                    {i18n.t('filterModal.saveButton')}
                </Button>
                <Button onClick={this.closeModal} id='filterButton'>
                    {i18n.t('filterModal.cancelButton')}
                </Button>
            </div>
        );

        return (
            this.state.available_metrics &&
            <Modal
                title={i18n.t('filterModal.title')}
                visible={this.props.visible}
                className='filterModal'
                width={800}
                onCancel={this.closeModal}
                footer={footerButtons}>
                <Tree
                    checkable
                    selectable={false}
                    onExpand={this.onExpand}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    selectedKeys={this.state.selectedKeys}>
                    {this.renderTreeNodes(this.state.available_metrics)}
                </Tree>
            </Modal>
        );
    }
}

Filter.propTypes = {
    config: PropTypes.object,
    filterSetup: PropTypes.func.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    triggerChange: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    return {
        config: BudgetViewReducer.config,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        filterSetup,
        triggerChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
