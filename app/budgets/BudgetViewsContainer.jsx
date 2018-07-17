import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import {
        getViewExportFile,
        fetchBudgetConfigData,
        fetchBudgetMetricData,
        saveNewBudgetVersion,
        sendDataForSpreading,
        resetState,
        filterSetup,
        triggerChange } from './BudgetViewActions';
import { setGlobalData, clearGlobalData } from '../components/customNavigation/CustomNavigationActions';
import { historyUndo, historyRedo } from './history/HistoryActions';

import TopDownSection from './sections/top-down/TopDownSection';
import { ROUTE_BUDGET, ROUTE_DASHBOARD } from '../Routes';
import BudgetViewActionsBar from './components/BudgetViewActionsBar';
import Filter from './filters/Filter';

class BudgetViewsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        const { budgetId, versionId, seasonName, versionName, sectionName, tab } = this.props.params;

        this.state = {
            budgetId,
            versionId,
            seasonName,
            versionName,
            sectionName,
            tab,
        };

        // set global parameters for budgets
        // Budget ID, Version ID, Season Name (SSXX/FWXX), Version name (VX), tab/view
        this.props.setGlobalData(budgetId, versionId, seasonName, versionName, tab);

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleVersionChange = this.handleVersionChange.bind(this);
        this.saveNewVersion = this.saveNewVersion.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleRedo = this.handleRedo.bind(this);
        this.getExportedFile = this.getExportedFile.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    componentDidMount() {
        const { fetchBudgetConfigData, params: { budgetId } } = this.props; // eslint-disable-line no-shadow

        // get config data, then fetch metrics based on config
        fetchBudgetConfigData().then(this.setFilters);
    }

    componentWillUnmount() {
        this.props.clearGlobalData();
        this.props.resetState();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.sectionName !== this.props.params.sectionName) {
            // this.newSpecs(nextProps.params);
        }

        if (nextProps.newVersion !== this.props.newVersion) {
            this.handleVersionChange(null, nextProps.newVersion);
        }
        if ((nextProps.isRefreshRequired && nextProps.isRefreshRequired !== this.props.isRefreshRequired) ||
            nextProps.filters !== this.props.filters) {
            this.getMetricData(nextProps.filters);
        }
    }

    setFilters = () => {
        // PLACEHOLDER FOR BETTER IMPLEMENTATION OF FILTERS
        this.getMetricData();
    };

    getMetricData = (filters = null) => {
        const { budgetId, versionId, tab } = this.state;
        const { config, router: { location } } = this.props;
        this.props.fetchBudgetMetricData(budgetId, versionId, tab, filters || config.available_metrics, location.query);
    };

    saveNewVersion = () => {
        this.props.saveNewBudgetVersion(this.props.globalBudgetId, this.props.globalVersionId);
    };

    getExportedFile = () => {
        this.props.getViewExportFile(this.props.globalBudgetId, this.props.globalVersionId, this.props.params.tab, this.props.filters);
    };

    handlePushRoute = (newVersion = null, newTab = null) => {
        const { router } = this.props;
        const { budgetId, seasonName, sectionName } = this.state;

        const versionName = newVersion ? newVersion.name : this.state.versionName;
        const versionId = newVersion ? newVersion.id : this.state.versionId;
        const tab = newTab || this.props.params.tab;

        router.push(`${ROUTE_BUDGET}/${seasonName}/${budgetId}/version/${versionName}/${versionId}/${sectionName}/${tab}`);
    };

    handleUndo = () => {
        const { params: { tab } } = this.props;
        const data = this.props.historyUndo(tab);

        this.props.sendDataForSpreading(this.state.budgetId, this.state.versionId, tab, data);
    };

    handleRedo = () => {
        const { params: { tab } } = this.props;
        const data = this.props.historyRedo(tab);

        this.props.sendDataForSpreading(this.state.budgetId, this.state.versionId, tab, data);
    };

    handleVersionChange(event, newVersion = null) {
        const { budgetId, seasonName, tab } = this.state;
        const version = newVersion || event.item.props.version;

        if (version.id !== this.state.versionId) {
            this.setState(
                {
                    versionId: version.id,
                    versionName: version.name,
                }, () => this.props.triggerChange(),
            );

            this.props.setGlobalData(budgetId, version.id, seasonName, version.name, tab);
            this.handlePushRoute(version, null);
        }
    }

    handleTabChange(newActiveTab) {
        const { budgetId, versionId, seasonName, versionName } = this.state;
        this.setState(
            {
                tab: newActiveTab,
            }, () => this.props.triggerChange(),
        );

        this.props.setGlobalData(budgetId, versionId, seasonName, versionName, newActiveTab);
        this.handlePushRoute(null, newActiveTab);
    }

    applyFilters = (filters) => {
        this.props.filterSetup(filters);
    };

    render() {
        // make sure config is loaded before moving forward
        if (!Object.keys(this.props.config).length) {
            return null;
        }

        const {
            globalBudgetId,
            globalVersionId,
            globalSeasonName,
            history,
            isBudgetLoading,
        } = this.props;

        // undo disabled / enabled ?
        const viewHistory = history[this.props.params.tab];

        return (
            <div>
                <div className="budgetHeader">
                    <Row type="flex" justify="start" className="innerHeader">
                        <Col span={8} className="col">
                            <h3>
                                {globalSeasonName}
                            </h3>
                        </Col>
                        <Col span={16} className="col">
                            <BudgetViewActionsBar
                                viewHistory={viewHistory}
                                isLoading={isBudgetLoading}
                                onBack={ROUTE_DASHBOARD}
                                onUndo={this.handleUndo}
                                onRedo={this.handleRedo}
                                onExport={this.getExportedFile}>
                                <Filter onSave={this.applyFilters} filters={this.props.config} />
                            </BudgetViewActionsBar>
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <TopDownSection
                        activeKey={this.props.params.tab}
                        changeTab={key => this.handleTabChange(key)}
                        budget={globalBudgetId}
                        data={this.props.viewData}
                        tab={this.props.params.tab}
                        version={globalVersionId} />
                </div>
            </div>
        );
    }
}

BudgetViewsContainer.propTypes = {
    params: PropTypes.object.isRequired,
    clearGlobalData: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    fetchBudgetConfigData: PropTypes.func.isRequired,
    fetchBudgetMetricData: PropTypes.func.isRequired,
    getViewExportFile: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    globalBudgetId: PropTypes.string,
    globalSeasonName: PropTypes.string,
    globalVersionId: PropTypes.string,
    globalVersionName: PropTypes.string,
    history: PropTypes.object,
    historyRedo: PropTypes.func.isRequired,
    historyUndo: PropTypes.func.isRequired,
    isBudgetLoading: PropTypes.bool.isRequired,
    isRefreshRequired: PropTypes.bool.isRequired,
    newVersion: PropTypes.object,
    resetState: PropTypes.func.isRequired,
    router: PropTypes.object,
    saveNewBudgetVersion: PropTypes.func.isRequired,
    sendDataForSpreading: PropTypes.func.isRequired,
    setGlobalData: PropTypes.func.isRequired,
    view: PropTypes.string,
    viewData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    filterSetup: PropTypes.func.isRequired,
    triggerChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {
        BudgetViewReducer,
        HistoryReducer,
        CustomNavigationReducer,
    } = state;

    return {
        config: BudgetViewReducer.config,
        filters: BudgetViewReducer.filters,
        globalBudgetId: CustomNavigationReducer.budgetId,
        globalSeasonName: CustomNavigationReducer.seasonName,
        globalTab: CustomNavigationReducer.view,
        globalVersionId: CustomNavigationReducer.versionId,
        globalVersionName: CustomNavigationReducer.versionName,
        history: HistoryReducer,
        isBudgetLoading: BudgetViewReducer.isBudgetLoading,
        isRefreshRequired: BudgetViewReducer.isRefreshRequired,
        newVersion: BudgetViewReducer.newVersion,
        view: BudgetViewReducer.view,
        viewData: BudgetViewReducer.viewData,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearGlobalData,
        fetchBudgetConfigData,
        fetchBudgetMetricData,
        getViewExportFile,
        historyRedo,
        historyUndo,
        resetState,
        saveNewBudgetVersion,
        sendDataForSpreading,
        setGlobalData,
        filterSetup,
        triggerChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
