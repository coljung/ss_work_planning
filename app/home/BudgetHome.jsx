import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { compose } from 'recompose';
import { withToggle, togglePropType } from '@mathdoy/toggle-react';
import { homeActions } from './duck';
import Board from '../components/Board';
import BudgetList from './BudgetList';
import CreateBudgetModal from './CreateBudgetModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { messages } from '../notifications/NotificationActions';

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
        messages: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        toggle: togglePropType.isRequired,
    };

    state = {
        showCreate: false,
    };

    constructor(props) {
        super(props);

        this.saveNewBudget = this.saveNewBudget.bind(this);
    }

    componentDidMount() {
        // Not sure we should load available seasons on load for probably nothing
        this.props.fetchAvailableSeasons();
        this.props.fetchBudgets();

        this.setState({
            showCreate: this.props.location.query && this.props.location.query.create === 'yes',
        });
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

        this.props.createBudget(budget).then(() =>
            this.props.messages({ content: i18n.t('home.notification.budgetCreated'), response: '', isError: false }),
        );
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
        const { toggle } = this.props;
        return (
            <Row>
                <Col xs={12}>
                    <Board title={i18n.t('home.budgetsDashboard')} style={{ paddingTop: '25px' }}>
                        <div>
                            { this.renderBudgetList() }
                            { toggle.isEnabled('createBudget') && this.renderCreateButton() }
                        </div>
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
        fetchAvailableSeasons: homeActions.fetchAvailableSeasons,
        fetchBudgets: homeActions.fetchBudgets,
        createBudget: homeActions.createBudget,
        messages,
    }, dispatch);
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withToggle,
)(BudgetHome);
