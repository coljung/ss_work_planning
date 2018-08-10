import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { homeOperations } from './duck';
import Board from '../components/Board';
import BudgetList from './BudgetList';
import CreateBudgetModal from './CreateBudgetModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

export class BudgetHome extends Component {
    static propTypes = {
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
        <CreateBudgetModal onSave={this.saveNewBudget} disabled={!this.props.seasonsFetched || !this.props.budgetCreateFetched} seasons={this.props.seasons} />
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

function mapStateToProps(state) {
    const { homeReducer } = state;
    return {
        seasons: homeReducer.seasons,
        seasonsFetched: homeReducer.seasonsFetched,
        budgets: homeReducer.budgets,
        budgetsFetched: homeReducer.budgetsFetched,
        budgetCreateFetched: homeReducer.budgetCreateFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAvailableSeasons: homeOperations.fetchAvailableSeasons,
        fetchBudgets: homeOperations.fetchBudgets,
        createBudget: homeOperations.createBudget,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetHome);
