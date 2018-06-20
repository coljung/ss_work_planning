import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Modal, List, Checkbox, Row, Col, Tree } from 'antd';
import { resetState } from '../../home/BudgetActions';

const TreeNode = Tree.TreeNode;

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            available_metrics: [],
        };
    }

    componentDidMount = () => {
        if (Object.keys(this.props.config).length) {
            this.buildTreeData(this.props.config.available_metrics);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.config !== this.props.config) {
            this.buildTreeData(nextProps.config.available_metrics);
        }
    };

    buildTreeData = (availMetrics) => {
        const tempTree = [];
        const tempCheckedKeys = [];
        availMetrics.forEach((e) => {
            const createEntry = {};
            createEntry.title = e;
            createEntry.key = e.toLowerCase();
            tempTree.push(createEntry);
            tempCheckedKeys.push(createEntry.key);
        });
        this.setState({
            available_metrics: tempTree,
            checkedKeys: tempCheckedKeys,
        });
    }

    onExpand = (expandedKeys) => {
        // console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            autoExpandParent: false,
        });
    };
    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    };
    onSelect = (selectedKeys, info) => {
        // console.log('onSelect', info);
        this.setState({ selectedKeys });
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
    }

    submitFilters = () => {
        // debugger;
    }

    render() {
        console.log(this.props.config);
        const footerButtons = (
            <div>
                <Button onClick={this.submitFilters} type='primary' size='large' id='filterButton'>
                    Set Filters
                </Button>
                <Button onClick={this.closeModal} size='large' id='filterButton'>
                    Cancel
                </Button>
            </div>
        );
        const modalContent = (
            <Tree
                checkable
                onExpand={this.onExpand}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}>
                {this.renderTreeNodes(this.state.available_metrics)}
            </Tree>
        );
        return (
            this.state.available_metrics && <Modal
                title='Filters'
                visible={this.props.visible}
                className='filterModal'
                width={800}
                onCancel={this.closeModal}
                footer={footerButtons}>
            {modalContent}
        </Modal>
        );
    }
}

Filter.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    config: PropTypes.object,
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    return {
        config: BudgetViewReducer.config,
    };
}

export default connect(mapStateToProps)(Filter);
