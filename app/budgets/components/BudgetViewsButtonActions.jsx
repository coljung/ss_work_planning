import i18n from 'i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router';
import { ROUTE_DASHBOARD } from '../../Routes';
import Filter from '../filters/Filter';
import { filterSetup, triggerChange } from '../BudgetViewActions';

class BudgetViewsButtonActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterModalActive: false,
        };

        this.toggleFilterModal = this.toggleFilterModal.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    toggleFilterModal = () => {
        this.setState({
            filterModalActive: !this.state.filterModalActive,
        });
    };

    applyFilters = (filters) => {
        this.props.filterSetup(filters);
        this.toggleFilterModal();
    };

    render() {
        return (
            <div className="budgetBtns">
                <Link to={ROUTE_DASHBOARD} >
                    <Button icon="arrow-left">{i18n.t('budgetView.backButton')}</Button>
                </Link>

                <Filter
                    visible={this.state.filterModalActive}
                    onCancel={this.toggleFilterModal}
                    onSave={this.applyFilters}
                    filters={this.props.config}
                />

                <Button icon="switcher" onClick={this.toggleFilterModal}>{i18n.t('budgetView.filter')}</Button>
                <Button disabled={this.props.undoDisabled} onClick={this.props.onUndo} icon="left">{i18n.t('budgetView.undoButton')}</Button>
                <Button disabled={this.props.redoDisabled} onClick={this.props.onRedo} icon="right">{i18n.t('budgetView.redoButton')}</Button>
                <Button onClick={this.props.onExport} icon="export">{i18n.t('budgetView.exportButton')}</Button>
            </div>
        );
    }
}

BudgetViewsButtonActions.propTypes = {
    filterSetup: PropTypes.func.isRequired,
    config: PropTypes.object,

    undoDisabled: PropTypes.bool,
    onUndo: PropTypes.func,
    redoDisabled: PropTypes.bool,
    onRedo: PropTypes.func,
    onExport: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsButtonActions);
