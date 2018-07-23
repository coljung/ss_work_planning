import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { createBudget, fetchAvailableSeasons, fetchBudgets } from './BudgetActions';
import Board from '../components/Board';
import BudgetList from './BudgetList';
import BudgetCreateModal from './components/BudgetCreateModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

export class BudgetHome extends Component {
    constructor(props) {
        super(props);

        this.saveNewBudget = this.saveNewBudget.bind(this);
    }

    componentDidMount() {
        // Not sure we should load available seasons on load for probably nothing
        this.props.fetchAvailableSeasons();
        this.props.fetchBudgets();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.budgets.length !== nextProps.budgets.length) {
            this.props.fetchAvailableSeasons();
            this.props.fetchBudgets();
        }
    };

    saveNewBudget = (season, year) => {
        const budget = {
            year,
            season,
        };

        this.props.createBudget(budget);
    };

    renderBudgetList = () => (
        !this.props.budgetsFetched || !this.props.budgetCreateFetched
            ? <LoadingSpinner />
            : <BudgetList budgets={this.props.budgets} />
    );

    renderCreateButton = () => (
        <BudgetCreateModal onSave={this.saveNewBudget} disabled={!this.props.seasonsFetched} seasons={this.props.seasons} />
    );

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Board title={i18n.t('home.budgetsDashboard')} style={{ paddingTop: '25px' }}>
                        { this.renderBudgetList() }
                        { this.renderCreateButton() }
                    </Board>
                </Col>
            </Row>
        );
    }
}

BudgetHome.propTypes = {
    budgets: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    budgetsFetched: PropTypes.bool.isRequired,
    seasons: PropTypes.array.isRequired,
    seasonsFetched: PropTypes.bool.isRequired,
    createBudget: PropTypes.func.isRequired,
    fetchBudgets: PropTypes.func.isRequired,
    fetchAvailableSeasons: PropTypes.func.isRequired,
    budgetCreateFetched: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const { BudgetReducer } = state;
    return {
        seasons: BudgetReducer.seasons,
        seasonsFetched: BudgetReducer.seasonsFetched,
        budgets: BudgetReducer.budgets,
        budgetsFetched: BudgetReducer.budgetsFetched,
        budgetCreateFetched: BudgetReducer.budgetCreateFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAvailableSeasons, fetchBudgets, createBudget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetHome);
