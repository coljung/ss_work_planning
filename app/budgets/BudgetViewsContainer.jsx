import React, { Component } from 'react';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Avatar, Row, Col, Menu } from 'antd';
import { budgetViewActions, budgetViewOperations } from './duck';
import { historyUndo, historyRedo, historyPush } from './history/HistoryActions';
import BudgetViewActionsBar from './BudgetViewActionsBar';
import FilterModal from './FilterModal';
import ViewPicker from './ViewPicker';
import TableContainer from './TableContainer';
import { ROUTE_BUDGET, ROUTE_DASHBOARD } from '../constants/routes';
import { TAB_MEN, TAB_TOTAL, TAB_WOMEN } from '../constants/views';

class BudgetViewsContainer extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        fetchBudgetConfigData: PropTypes.func.isRequired,
        fetchBudgetMetricData: PropTypes.func.isRequired,
        getViewExportFile: PropTypes.func.isRequired,
        history: PropTypes.object,
        historyRedo: PropTypes.func.isRequired,
        historyUndo: PropTypes.func.isRequired,
        historyPush: PropTypes.func.isRequired,
        isBudgetLoading: PropTypes.bool.isRequired,
        isDataSpreading: PropTypes.bool.isRequired,
        isRefreshRequired: PropTypes.bool.isRequired,
        resetState: PropTypes.func.isRequired,
        router: PropTypes.object,
        sendDataForSpreading: PropTypes.func.isRequired,
        viewData: PropTypes.object.isRequired,
        filterSetup: PropTypes.func.isRequired,
        location: PropTypes.object,
    };

    useDecimals = false;

    state = { tabIndex: 0 };

    componentWillMount() {
        this.useDecimals = this.props.location.query && this.props.location.query.decimals === 'yes';
    }

    componentDidMount() {
        // get config data, then fetch metrics based on config
        this.props.fetchBudgetConfigData().then(({ type, result }) => {
            const filter = {
                selectedMetrics: result.defaultFilters.metrics,
                selectedPlanTypes: result.defaultFilters.plans,
            };
            this.applyFilters(filter);
            this.getMetricData(
                this.props.params.budgetId,
                this.props.params.tab,
            );
        });
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.isRefreshRequired && nextProps.isRefreshRequired !== this.props.isRefreshRequired)
            || nextProps.params.tab !== this.props.params.tab
            || nextProps.params.budgetId !== this.props.params.budgetId) {
            const filters = {
                metrics: nextProps.filters.selectedMetrics,
                plans: nextProps.filters.selectedPlanTypes,
            };
            this.getMetricData(nextProps.params.budgetId, nextProps.params.tab, filters);
        }
    }

    getMetricData(budgetId, tab, filters = { metrics: null, plans: null }) {
        this.props.fetchBudgetMetricData(budgetId, tab, filters);
    }

    pushRoute(newTab = null) {
        const sectionName = this.props.params.sectionName;
        const seasonName = this.props.params.seasonName;
        const budgetId = this.props.params.budgetId;
        const tab = newTab || this.props.params.tab;
        const location = this.props.router.location;

        this.props.router.push({
            pathname: `${ROUTE_BUDGET}/${seasonName}/${budgetId}/${sectionName}/${tab}`,
            query: location.query,
        });
    }

    getExportedFile = () => {
        const filterView = {
            metrics: this.props.filters.selectedMetrics,
            plans: this.props.filters.selectedPlanTypes,
        };
        this.props.getViewExportFile(this.props.params.budgetId, this.props.params.tab, filterView);
    };

    pushToHistory = (dataObject, focusPosition) => {
        this.props.historyPush(this.props.params.tab, { dataObject, focusPosition });
    };

    undo = () => {
        const tab = this.props.params.tab;
        const data = this.props.historyUndo(tab);

        return this.changeCellValue(data.dataObject);
    };

    redo = () => {
        const tab = this.props.params.tab;
        const data = this.props.historyRedo(tab);

        return this.changeCellValue(data.dataObject);
    };

    changeCellValue = dataObject =>
        this.props.sendDataForSpreading(this.props.params.budgetId, this.props.params.tab, dataObject);

    changeTab = newActiveTab => this.pushRoute(newActiveTab.key);

    applyFilters = filters => this.props.filterSetup(filters);

    render() {
        // make sure config is loaded before moving forward
        if (!Object.keys(this.props.config).length) {
            return null;
        }

        // undo disabled / enabled ?
        const seasonLabel = `${this.props.viewData.season}${this.props.viewData.budgetYear.slice(2)}`;
        const viewHistory = this.props.history[this.props.params.tab];
        return (
            <div>
                <Row type="flex" className="mt-10">
                    <Col span={24}>
                        <ViewPicker
                        tab={this.props.params.tab}
                        onTabChange={this.changeTab}
                        seasonLabel={seasonLabel}
                        />
                        <BudgetViewActionsBar
                            viewHistory={viewHistory}
                            isLoading={this.props.isBudgetLoading || this.props.isDataSpreading}
                            onBack={ROUTE_DASHBOARD}
                            onUndo={this.undo}
                            onRedo={this.redo}
                            onExport={this.getExportedFile}>
                            <FilterModal onSave={this.applyFilters} availableOptions={this.props.config} filters={this.props.filters} />
                        </BudgetViewActionsBar>
                    </Col>
                </Row>
                <Row type="flex" className="mt-10">
                    <Col span={24}>
                        <TableContainer
                        view={this.props.params.tab}
                        data={this.props.viewData}
                        filters={this.props.filters}
                        useDecimals={this.useDecimals}
                        onPushHistory={this.pushToHistory}
                        onCellChange={this.changeCellValue} />
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        budgetViewReducer,
        HistoryReducer,
    } = state;

    return {
        config: budgetViewReducer.config,
        filters: budgetViewReducer.filters,
        history: HistoryReducer,
        isBudgetLoading: budgetViewReducer.isBudgetLoading,
        isDataSpreading: budgetViewReducer.isDataSpreading,
        isRefreshRequired: budgetViewReducer.isRefreshRequired,
        viewData: budgetViewReducer.viewData,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBudgetConfigData: budgetViewActions.fetchBudgetConfigData,
        fetchBudgetMetricData: budgetViewActions.fetchBudgetMetricData,
        getViewExportFile: budgetViewOperations.getViewExportFile,
        historyRedo,
        historyUndo,
        historyPush,
        resetState: budgetViewActions.resetState,
        sendDataForSpreading: budgetViewActions.sendDataForSpreading,
        filterSetup: budgetViewActions.filterSetup,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BudgetViewsContainer));
