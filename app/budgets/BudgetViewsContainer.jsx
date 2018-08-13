import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col } from 'antd';
import {
        getViewExportFile,
        fetchBudgetConfigData,
        fetchBudgetMetricData,
        sendDataForSpreading,
        resetState,
        filterSetup,
        triggerChange } from './BudgetViewActions';
import { historyUndo, historyRedo, historyPush } from './history/HistoryActions';
import BudgetViewActionsBar from './components/BudgetViewActionsBar';
import FilterModal from './filters/FilterModal';
import ViewPicker from './sections/top-down/ViewPicker';
import SectionContainer from './sections/SectionContainer';
import { ROUTE_BUDGET, ROUTE_DASHBOARD } from '../constants/routes';

class BudgetViewsContainer extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
        filters: PropTypes.array.isRequired,
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
        triggerChange: PropTypes.func.isRequired,
        location: PropTypes.object,
    };

    useDecimals = false;

    componentWillMount() {
        this.useDecimals = this.props.location.query && this.props.location.query.decimals === 'yes';
    }

    componentDidMount() {
        // get config data, then fetch metrics based on config
        this.props.fetchBudgetConfigData().then((config) => {
            this.applyFilters(config.config.available_metrics);
        });
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.isRefreshRequired && nextProps.isRefreshRequired !== this.props.isRefreshRequired)
            || nextProps.filters !== this.props.filters
            || nextProps.params.tab !== this.props.params.tab
            || nextProps.params.budgetId !== this.props.params.budgetId) {
            this.getMetricData(nextProps.params.budgetId, nextProps.params.tab, nextProps.filters);
        }
    }

    getMetricData(budgetId, tab, filters = null) {
        const { config, router: { location } } = this.props;
        this.props.fetchBudgetMetricData(budgetId, tab, filters && filters.length ? filters : config.available_metrics, location.query);
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
        this.props.getViewExportFile(this.props.params.budgetId, this.props.params.tab, this.props.filters);
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

    changeTab = (newActiveTab) => {
        this.pushRoute(newActiveTab);
    };

    applyFilters = (filters) => {
        this.props.filterSetup(filters);
    };

    render() {
        // make sure config is loaded before moving forward
        if (!Object.keys(this.props.config).length) {
            return null;
        }

        // undo disabled / enabled ?
        const viewHistory = this.props.history[this.props.params.tab];

        return (
            <div>
                <div className="budgetHeader">
                    <Row type="flex" justify="start" className="innerHeader">
                        <Col span={8} className="col">
                            <h3> {this.props.params.seasonName} </h3>
                        </Col>
                        <Col span={16} className="col">
                            <BudgetViewActionsBar
                                viewHistory={viewHistory}
                                isLoading={this.props.isBudgetLoading || this.props.isDataSpreading}
                                onBack={ROUTE_DASHBOARD}
                                onUndo={this.undo}
                                onRedo={this.redo}
                                onExport={this.getExportedFile}>
                                <FilterModal onSave={this.applyFilters} availableFilters={this.props.config.available_metrics} filters={this.props.filters} />
                            </BudgetViewActionsBar>
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <ViewPicker tab={this.props.params.tab} onTabChange={this.changeTab} />
                    <SectionContainer
                        view={this.props.params.tab}
                        viewData={this.props.viewData}
                        useDecimals={this.useDecimals}
                        onPushHistory={this.pushToHistory}
                        onCellChange={this.changeCellValue} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        BudgetViewReducer,
        HistoryReducer,
    } = state;

    return {
        config: BudgetViewReducer.config,
        filters: BudgetViewReducer.filters,
        history: HistoryReducer,
        isBudgetLoading: BudgetViewReducer.isBudgetLoading,
        isDataSpreading: BudgetViewReducer.isDataSpreading,
        isRefreshRequired: BudgetViewReducer.isRefreshRequired,
        viewData: BudgetViewReducer.viewData,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBudgetConfigData,
        fetchBudgetMetricData,
        getViewExportFile,
        historyRedo,
        historyUndo,
        historyPush,
        resetState,
        sendDataForSpreading,
        filterSetup,
        triggerChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BudgetViewsContainer));
