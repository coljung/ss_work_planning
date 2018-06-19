import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Modal, List, Checkbox, Row, Col, Tree } from 'antd';
import { resetState } from '../../home/BudgetActions';

const TreeNode = Tree.TreeNode;

const treeData = [
    {
        title: 'Sales',
        key: 'sales',
        children: [
            {
                title: 'ss19',
                key: 'sales_ss19',
                children: [
                { title: 'TD WP', key: 'sales_ss19_TD_WP' },
                { title: 'BU WP', key: 'sales_ss19_BU_WP' },
                { title: 'TD OP', key: 'sales_ss19_TD_OP' },
                { title: 'BU OP', key: 'sales_ss19_BU_OP' },
                { title: 'Actuals', key: 'sales_ss19_actuals' },
                { title: 'Exec. Proj.', key: 'sales_ss19_proj' },
                { title: 'Sugg.', key: 'sales_ss19_sugg' },
                ],
            },
            {
                title: 'ss18',
                key: 'sales_ss18',
                children: [
                { title: 'TD WP', key: 'sales_ss18_TD_WP' },
                { title: 'BU WP', key: 'sales_ss18_BU_WP' },
                { title: 'TD OP', key: 'sales_ss18_TD_OP' },
                { title: 'BU OP', key: 'sales_ss18_BU_OP' },
                { title: 'Actuals', key: 'sales_ss18_actuals' },
                { title: 'Exec. Proj.', key: 'sales_ss18_proj' },
                { title: 'Sugg.', key: 'sales_ss18_sugg' },
                ],
            },
            {
                title: 'ss17',
                key: 'sales_ss17',
                children: [
                { title: 'TD WP', key: 'sales_ss17_TD_WP' },
                { title: 'BU WP', key: 'sales_ss17_BU_WP' },
                { title: 'TD OP', key: 'sales_ss17_TD_OP' },
                { title: 'BU OP', key: 'sales_ss17_BU_OP' },
                { title: 'Actuals', key: 'sales_ss17_actuals' },
                { title: 'Exec. Proj.', key: 'sales_ss17_proj' },
                { title: 'Sugg.', key: 'sales_ss17_sugg' },
                ],
            },
            {
                title: 'ss16',
                key: 'sales_ss16',
                children: [
                { title: 'TD WP', key: 'sales_ss16_TD_WP' },
                { title: 'BU WP', key: 'sales_ss16_BU_WP' },
                { title: 'TD OP', key: 'sales_ss16_TD_OP' },
                { title: 'BU OP', key: 'sales_ss16_BU_OP' },
                { title: 'Actuals', key: 'sales_ss16_actuals' },
                { title: 'Exec. Proj.', key: 'sales_ss16_proj' },
                { title: 'Sugg.', key: 'sales_ss16_sugg' },
                ],
            },
            {
                title: 'ss15',
                key: 'sales_ss15',
                children: [
                { title: 'TD WP', key: 'sales_ss15_TD_WP' },
                { title: 'BU WP', key: 'sales_ss15_BU_WP' },
                { title: 'TD OP', key: 'sales_ss15_TD_OP' },
                { title: 'BU OP', key: 'sales_ss15_BU_OP' },
                { title: 'Actuals', key: 'sales_ss15_actuals' },
                { title: 'Exec. Proj.', key: 'sales_ss15_proj' },
                { title: 'Sugg.', key: 'sales_ss15_sugg' },
                ],
            },
        ],
    },
    {
        title: 'COGS',
        key: 'cogs',
        children: [
            {
                title: 'ss19',
                key: 'cogs_ss19',
                children: [
                { title: 'TD WP', key: 'cogs_ss19_TD_WP' },
                { title: 'BU WP', key: 'cogs_ss19_BU_WP' },
                { title: 'TD OP', key: 'cogs_ss19_TD_OP' },
                { title: 'BU OP', key: 'cogs_ss19_BU_OP' },
                { title: 'Actuals', key: 'cogs_ss19_actuals' },
                { title: 'Exec. Proj.', key: 'cogs_ss19_proj' },
                { title: 'Sugg.', key: 'cogs_ss19_sugg' },
                ],
            },
            {
                title: 'ss18',
                key: 'cogs_ss18',
                children: [
                { title: 'TD WP', key: 'cogs_ss18_TD_WP' },
                { title: 'BU WP', key: 'cogs_ss18_BU_WP' },
                { title: 'TD OP', key: 'cogs_ss18_TD_OP' },
                { title: 'BU OP', key: 'cogs_ss18_BU_OP' },
                { title: 'Actuals', key: 'cogs_ss18_actuals' },
                { title: 'Exec. Proj.', key: 'cogs_ss18_proj' },
                { title: 'Sugg.', key: 'cogs_ss18_sugg' },
                ],
            },
            {
                title: 'ss17',
                key: 'cogs_ss17',
                children: [
                { title: 'TD WP', key: 'cogs_ss17_TD_WP' },
                { title: 'BU WP', key: 'cogs_ss17_BU_WP' },
                { title: 'TD OP', key: 'cogs_ss17_TD_OP' },
                { title: 'BU OP', key: 'cogs_ss17_BU_OP' },
                { title: 'Actuals', key: 'cogs_ss17_actuals' },
                { title: 'Exec. Proj.', key: 'cogs_ss17_proj' },
                { title: 'Sugg.', key: 'cogs_ss17_sugg' },
                ],
            },
            {
                title: 'ss16',
                key: 'cogs_ss16',
                children: [
                { title: 'TD WP', key: 'cogs_ss16_TD_WP' },
                { title: 'BU WP', key: 'cogs_ss16_BU_WP' },
                { title: 'TD OP', key: 'cogs_ss16_TD_OP' },
                { title: 'BU OP', key: 'cogs_ss16_BU_OP' },
                { title: 'Actuals', key: 'cogs_ss16_actuals' },
                { title: 'Exec. Proj.', key: 'cogs_ss16_proj' },
                { title: 'Sugg.', key: 'cogs_ss16_sugg' },
                ],
            },
            {
                title: 'ss15',
                key: 'cogs_ss15',
                children: [
                { title: 'TD WP', key: 'cogs_ss15_TD_WP' },
                { title: 'BU WP', key: 'cogs_ss15_BU_WP' },
                { title: 'TD OP', key: 'cogs_ss15_TD_OP' },
                { title: 'BU OP', key: 'cogs_ss15_BU_OP' },
                { title: 'Actuals', key: 'cogs_ss15_actuals' },
                { title: 'Exec. Proj.', key: 'cogs_ss15_proj' },
                { title: 'Sugg.', key: 'cogs_ss15_sugg' },
                ],
            },
        ],
    },
    {
        title: 'GM%',
        key: 'gm_percentage',
        children: [
            {
                title: 'ss19',
                key: 'gm_percentage_ss19',
                children: [
                { title: 'TD WP', key: 'gm_percentage_ss19_TD_WP' },
                { title: 'BU WP', key: 'gm_percentage_ss19_BU_WP' },
                { title: 'TD OP', key: 'gm_percentage_ss19_TD_OP' },
                { title: 'BU OP', key: 'gm_percentage_ss19_BU_OP' },
                { title: 'Actuals', key: 'gm_percentage_ss19_actuals' },
                { title: 'Exec. Proj.', key: 'gm_percentage_ss19_proj' },
                { title: 'Sugg.', key: 'gm_percentage_ss19_sugg' },
                ],
            },
            {
                title: 'ss18',
                key: 'gm_percentage_ss18',
                children: [
                { title: 'TD WP', key: 'gm_percentage_ss18_TD_WP' },
                { title: 'BU WP', key: 'gm_percentage_ss18_BU_WP' },
                { title: 'TD OP', key: 'gm_percentage_ss18_TD_OP' },
                { title: 'BU OP', key: 'gm_percentage_ss18_BU_OP' },
                { title: 'Actuals', key: 'gm_percentage_ss18_actuals' },
                { title: 'Exec. Proj.', key: 'gm_percentage_ss18_proj' },
                { title: 'Sugg.', key: 'gm_percentage_ss18_sugg' },
                ],
            },
            {
                title: 'ss17',
                key: 'gm_percentage_ss17',
                children: [
                { title: 'TD WP', key: 'gm_percentage_ss17_TD_WP' },
                { title: 'BU WP', key: 'gm_percentage_ss17_BU_WP' },
                { title: 'TD OP', key: 'gm_percentage_ss17_TD_OP' },
                { title: 'BU OP', key: 'gm_percentage_ss17_BU_OP' },
                { title: 'Actuals', key: 'gm_percentage_ss17_actuals' },
                { title: 'Exec. Proj.', key: 'gm_percentage_ss17_proj' },
                { title: 'Sugg.', key: 'gm_percentage_ss17_sugg' },
                ],
            },
            {
                title: 'ss16',
                key: 'gm_percentage_ss16',
                children: [
                { title: 'TD WP', key: 'gm_percentage_ss16_TD_WP' },
                { title: 'BU WP', key: 'gm_percentage_ss16_BU_WP' },
                { title: 'TD OP', key: 'gm_percentage_ss16_TD_OP' },
                { title: 'BU OP', key: 'gm_percentage_ss16_BU_OP' },
                { title: 'Actuals', key: 'gm_percentage_ss16_actuals' },
                { title: 'Exec. Proj.', key: 'gm_percentage_ss16_proj' },
                { title: 'Sugg.', key: 'gm_percentage_ss16_sugg' },
                ],
            },
            {
                title: 'ss15',
                key: 'gm_percentage_ss15',
                children: [
                { title: 'TD WP', key: 'gm_percentage_ss15_TD_WP' },
                { title: 'BU WP', key: 'gm_percentage_ss15_BU_WP' },
                { title: 'TD OP', key: 'gm_percentage_ss15_TD_OP' },
                { title: 'BU OP', key: 'gm_percentage_ss15_BU_OP' },
                { title: 'Actuals', key: 'gm_percentage_ss15_actuals' },
                { title: 'Exec. Proj.', key: 'gm_percentage_ss15_proj' },
                { title: 'Sugg.', key: 'gm_percentage_ss15_sugg' },
                ],
            },
        ],
    },
    {
        title: 'GM$',
        key: 'gm_dollar',
        children: [
            {
                title: 'ss19',
                key: 'gm_dollar_ss19',
                children: [
                { title: 'TD WP', key: 'gm_dollar_ss19_TD_WP' },
                { title: 'BU WP', key: 'gm_dollar_ss19_BU_WP' },
                { title: 'TD OP', key: 'gm_dollar_ss19_TD_OP' },
                { title: 'BU OP', key: 'gm_dollar_ss19_BU_OP' },
                { title: 'Actuals', key: 'gm_dollar_ss19_actuals' },
                { title: 'Exec. Proj.', key: 'gm_dollar_ss19_proj' },
                { title: 'Sugg.', key: 'gm_dollar_ss19_sugg' },
                ],
            },
            {
                title: 'ss18',
                key: 'gm_dollar_ss18',
                children: [
                { title: 'TD WP', key: 'gm_dollar_ss18_TD_WP' },
                { title: 'BU WP', key: 'gm_dollar_ss18_BU_WP' },
                { title: 'TD OP', key: 'gm_dollar_ss18_TD_OP' },
                { title: 'BU OP', key: 'gm_dollar_ss18_BU_OP' },
                { title: 'Actuals', key: 'gm_dollar_ss18_actuals' },
                { title: 'Exec. Proj.', key: 'gm_dollar_ss18_proj' },
                { title: 'Sugg.', key: 'gm_dollar_ss18_sugg' },
                ],
            },
            {
                title: 'ss17',
                key: 'gm_dollar_ss17',
                children: [
                { title: 'TD WP', key: 'gm_dollar_ss17_TD_WP' },
                { title: 'BU WP', key: 'gm_dollar_ss17_BU_WP' },
                { title: 'TD OP', key: 'gm_dollar_ss17_TD_OP' },
                { title: 'BU OP', key: 'gm_dollar_ss17_BU_OP' },
                { title: 'Actuals', key: 'gm_dollar_ss17_actuals' },
                { title: 'Exec. Proj.', key: 'gm_dollar_ss17_proj' },
                { title: 'Sugg.', key: 'gm_dollar_ss17_sugg' },
                ],
            },
            {
                title: 'ss16',
                key: 'gm_dollar_ss16',
                children: [
                { title: 'TD WP', key: 'gm_dollar_ss16_TD_WP' },
                { title: 'BU WP', key: 'gm_dollar_ss16_BU_WP' },
                { title: 'TD OP', key: 'gm_dollar_ss16_TD_OP' },
                { title: 'BU OP', key: 'gm_dollar_ss16_BU_OP' },
                { title: 'Actuals', key: 'gm_dollar_ss16_actuals' },
                { title: 'Exec. Proj.', key: 'gm_dollar_ss16_proj' },
                { title: 'Sugg.', key: 'gm_dollar_ss16_sugg' },
                ],
            },
            {
                title: 'ss15',
                key: 'gm_dollar_ss15',
                children: [
                { title: 'TD WP', key: 'gm_dollar_ss15_TD_WP' },
                { title: 'BU WP', key: 'gm_dollar_ss15_BU_WP' },
                { title: 'TD OP', key: 'gm_dollar_ss15_TD_OP' },
                { title: 'BU OP', key: 'gm_dollar_ss15_BU_OP' },
                { title: 'Actuals', key: 'gm_dollar_ss15_actuals' },
                { title: 'Exec. Proj.', key: 'gm_dollar_ss15_proj' },
                { title: 'Sugg.', key: 'gm_dollar_ss15_sugg' },
                ],
            },
        ],
    },
];

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

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.config !== this.props.config && !this.props.config) {
            const temp = [];
            nextProps.config.forEach((e) => {
                const createEntry = {};
                createEntry.title = e;
                createEntry.key = e.toLowerCase();
                temp.push(createEntry);
            });
            this.setState({
                available_metrics: temp,
            });
            // debugger;
        }
    };

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

    render() {
        const footerButtons = (
            <div>
                <Button type='primary' size='large' id='filterButton'>
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
                onOk={this.handleOk}
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
    config: PropTypes.array,
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    console.log(state);
    return {
        config: BudgetViewReducer.config.available_metrics,
    };
}

export default connect(mapStateToProps)(Filter);
