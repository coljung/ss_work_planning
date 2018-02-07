import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal, Spin, Row, Col } from 'antd';
import { fetchBudgets } from './BudgetActions';

import { ROUTE_BUDGET } from '../Routes';

class BudgetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalActive: false
        };
        this.restOfBudgets = '';
    }

    componentWillMount() {
        this.props.fetchBudgets();
    }

    handleToggleModal = () => {
        this.setState({
            modalActive: !this.state.modalActive,
        });
    }

    orderBudgets = (a, b) => {
        if (a.year > b.year) {
            return -1;
        }

        if (a.year < b.year) {
            return 1;
        }

        return 0;
    }

    createList = () => {
        const { budgets } = this.props;
        const hasVersions = budgets
          .filter(budget => budget.versions.length)
          .sort(this.orderBudgets); // sort by most recent

        // take latest 4 budgets
        const recentBudgets = hasVersions.slice(0, 4).map((budget) => {
            const url = `${ROUTE_BUDGET}/${budget.season}${budget.year}/budget/${budget.id}/version/${budget.versions[0].name}/${budget.versions[0].id}/exec`;
            return (
                <li key={budget.id}>
                    <h4>
                        <Link to={url}>
                            {budget.season}{budget.year}
                        </Link>
                    </h4>
                </li>
            );
        });

        // take rest of  4 budgets
        this.restOfBudgets = hasVersions.slice(4).map(budget =>
            <li key={budget.id}>
                <h4>
                    <Link to={`${ROUTE_BUDGET}/${budget.season}${budget.year}/budget/${budget.id}/version/${budget.versions[0].name}/${budget.versions[0].id}/exec`}>
                        {budget.season}{budget.year}
                    </Link>
                </h4>
            </li>,
        );

        return (
            <ul className="budgetList">
                {recentBudgets}
            </ul>
        );
    }

    render() {
        const budgetListData = this.props.budgetsFetched ? this.createList() : <Spin size="large" />;
        const footerButtons = (
          <div>
            <Button
                onClick={this.handleToggleModal}
                size='large'>Ok
            </Button>
          </div>
        );

        return (
            <div>
                { budgetListData }
                <Modal
                    title="All Previous Budgets"
                    visible={this.props.visible}
                    onCancel={this.props.onOverlayClick}
                    footer={null}>

                    <ul className="budgetList">
                        { this.restOfBudgets }
                    </ul>
                </Modal>
            </div>
        );
    }
}

BudgetList.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    budgets: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    budgetsFetched: PropTypes.bool.isRequired,
    fetchBudgets: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { BudgetReducer } = state;
    return {
        budgets: BudgetReducer.budgets,
        budgetsFetched: BudgetReducer.budgetsFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetList);
