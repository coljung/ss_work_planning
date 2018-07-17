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
    applyFilters = (filters) => {
        this.props.filterSetup(filters);
    };

    render() {
        return (
            <div className="budgetBtns">
                <Link to={ROUTE_DASHBOARD} >
                    <Button icon="arrow-left">{i18n.t('budgetView.backButton')}</Button>
                </Link>

                <Filter
                    onSave={this.applyFilters}
                    filters={this.props.config}
                />
                <Button disabled={this.props.undoDisabled} onClick={this.props.onUndo} icon="left">{i18n.t('budgetView.undoButton')}</Button>
                <Button disabled={this.props.redoDisabled} onClick={this.props.onRedo} icon="right">{i18n.t('budgetView.redoButton')}</Button>
                <Button onClick={this.props.onExport} icon="export">{i18n.t('budgetView.exportButton')}</Button>
            </div>
        );
    }
}

BudgetViewsButtonActions.propTypes = {
    filterSetup: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,

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
        // triggerChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsButtonActions);
