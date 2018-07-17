import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, Tree } from 'antd';
import { bindActionCreators } from 'redux/index';
import { filterSetup } from '../BudgetViewActions';
import ModalActivator from '../../components/common/ModalActivator';

const TreeNode = Tree.TreeNode;

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
            <div>
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
                            <TreeNode title={i18n.t(`metric.${metric}`)} key={metric} dataRef={metric}>
                            </TreeNode>,
                        )}
                    </Tree>
                </Modal>
                <ModalActivator label={i18n.t('budgetView.filter')} showModal={this.showModal}/>
            </div>
        );
    }
}

Filter.propTypes = {
    // filterSetup: PropTypes.func.isRequired,

    // visible: PropTypes.bool.isRequired,
    // label: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    // onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

// function mapStateToProps(state) {
//     const { BudgetViewReducer } = state;
//     return {
//         config: BudgetViewReducer.config,
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         filterSetup,
//         triggerChange,
//     }, dispatch);
// }

// export default connect(mapStateToProps, null)(Filter);
