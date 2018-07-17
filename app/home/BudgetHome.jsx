import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { fetchBudgets } from './BudgetActions';
import Board from '../components/Board';
import BudgetList from './BudgetList';
import BudgetCreate from './BudgetCreate';

class BudgetHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createModalActive: false,
            viewArchivedModalActive: false,
            oldBudgetsAvailable: true,
        };
    }

    componentWillMount() {
        this.props.fetchBudgets();
    }

    toggleCreateModal = () => {
        this.setState({
            createModalActive: !this.state.createModalActive,
        });
    };

    toggleViewArchivedModal = () => {
        this.setState({
            viewArchivedModalActive: !this.state.viewArchivedModalActive,
        });
    };

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Board title={i18n.t('home.budgetsDashboard')} style={{ paddingTop: '25px' }}>
                        <BudgetList
                            visible={this.state.viewArchivedModalActive}
                            budgets={this.props.budgets}
                            onOverlayClick={this.toggleViewArchivedModal.bind(this)}
                            budgetsFetched={this.props.budgetsFetched} />
                        <BudgetCreate
                            visible={this.state.createModalActive}
                            onOverlayClick={this.toggleCreateModal.bind(this)} />
                        <Row type="flex" justify="start">
                            <Col>
                                 <Button
                                     icon="file"
                                     type="primary"
                                     onClick={this.toggleCreateModal}>
                                     {i18n.t('home.createBudget')}
                                 </Button>
                            </Col>
                        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetHome);
