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
            modalActive: false,
            budgets: this.props.budgets || [],
        };
        this.restOfBudgets = '';
    }

    componentWillMount() {
        this.props.fetchBudgets();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.budgets.length !== nextProps.budgets.length) {
            this.setState({
                budgets: nextProps.budgets,
            });
        }
    }

    enterLoading = (e) => {
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
        const stBudgets = this.state.budgets;
        const hasVersions = stBudgets.filter(e => e.versions.length);

        // sort by most recent
        hasVersions.sort(this.orderBudgets);

        // take latest 4 budgets
        const recentBudgets = hasVersions.slice(0, 4).map((e) => {
            const url = `${ROUTE_BUDGET}/${e.season}${e.year}/budget/${e.id}/version/${e.versions[0].name}/${e.versions[0].id}/exec`;
            return (
                <li key={e.id}>
                    <h4>
                        <Link to={url}>
                            {e.season}{e.year}
                        </Link>
                    </h4>
                </li>
            );
        });

        // take rest of  4 budgets
        this.restOfBudgets = hasVersions.slice(4).map(e =>
            <li key={e.id}>
                <h4>
                    <Link to={`${ROUTE_BUDGET}/${e.versions[0].id}`}>
                        {e.season}{e.year}
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
        const footerButtons = (<div>
            <Button
                onClick={this.enterLoading}
                size='large'>Ok
            </Button>
        </div>);

        return (
            <div>
                { budgetListData }
                <Modal
                    title="All Previous Budgets"
                    visible={this.props.visible}
                    onCancel={this.props.onOverlayClick}
                    footer={footerButtons}>

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
