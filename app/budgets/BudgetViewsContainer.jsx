import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import BudgetViewsButtonActions from './components/BudgetViewsButtonActions';
import {
        getViewExportFile,
        fetchBudgetConfigData,
        fetchBudgetMetricData,
        sendDataForSpreading,
        resetState,
        triggerChange } from './BudgetViewActions';
import { setGlobalData, clearGlobalData } from '../components/customNavigation/CustomNavigationActions';
import { historyUndo, historyRedo } from './history/HistoryActions';

import TopDownSection from './sections/top-down/TopDownSection';
import { ROUTE_BUDGET } from '../Routes';

class BudgetViewsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        const { budgetId, seasonName, sectionName, tab } = this.props.params;

        this.state = {
            budgetId,
            seasonName,
            sectionName,
            tab,
        };

        // set global parameters for budgets
        // Budget ID, Version ID, Season Name (SSXX/FWXX), Version name (VX), tab/view
        this.props.setGlobalData(budgetId, seasonName, tab);
        this.handleTabChange = this.handleTabChange.bind(this);
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

        if ((nextProps.isRefreshRequired && nextProps.isRefreshRequired !== this.props.isRefreshRequired) ||
            nextProps.filters !== this.props.filters) {
            this.getMetricData(nextProps.filters);
        }
    }

    setFilters = () => {
        const { config } = this.props;
        // PLACEHOLDER FOR BETTER IMPLEMENTATION OF FILTERS
        this.getMetricData();
    };

    getMetricData = (filters = null) => {
        const { budgetId, tab } = this.state;
        const { config, router: { location } } = this.props;
        this.props.fetchBudgetMetricData(budgetId, tab, filters || config.available_metrics, location.query);
    };

    getExportedFile = (budget, view) => {
        this.props.getViewExportFile(budget, view, this.props.filters);
    };

    handlePushRoute = (newTab = null) => {
        const { router } = this.props;
        const { budgetId, seasonName, sectionName } = this.state;
        const tab = newTab || this.props.params.tab;

        router.push(`${ROUTE_BUDGET}/${seasonName}/${budgetId}/${sectionName}/${tab}`);
    };

    handleHistory = (historyMove) => {
        const { budgetId } = this.state;
        const { historyUndo, historyRedo, params: { tab } } = this.props; // eslint-disable-line no-shadow
        const data = historyMove === 'undo' ? historyUndo(tab) : historyRedo(tab);
        this.props.sendDataForSpreading(budgetId, tab, data);
    };

    handleTabChange(newActiveTab) {
        const { budgetId, seasonName } = this.state;
        this.setState(
            {
                tab: newActiveTab,
            }, () => this.props.triggerChange(),
        );

        this.props.setGlobalData(budgetId, seasonName, newActiveTab);
        this.handlePushRoute(newActiveTab);
    }

    getCurrentSection = (activeTab, globalBudgetId ) => {
        const { params: { tab }, viewData } = this.props;
        switch (this.state.sectionName) {
            case 'top-down':
                return (<TopDownSection
                    activeKey={activeTab}
                    changeTab={key => this.handleTabChange(key)}
                    budget={globalBudgetId}
                    data={viewData}
                    tab={tab} />);
            default:
                return null;
        }
    };

    render() {
        // make sure config is loaded before moving forward
        if (!Object.keys(this.props.config).length) {
            return null;
        }

        // const { activeTab } = this.state;
        const {
            globalBudgetId,
            globalSeasonName,
            history,
            isBudgetLoading,
        } = this.props;

        // undo disabled / enabled ?
        const viewHistory = history[this.props.params.tab];
        const undoDisabled = viewHistory && !isBudgetLoading ? viewHistory.past.length <= 0 : true;
        const redoDisabled = viewHistory && !isBudgetLoading ? viewHistory.future.length <= 0 : true;
        const currentSection = this.getCurrentSection(this.props.params.tab, globalBudgetId );

        return (
            <div>
                <div className="budgetHeader">
                    <Row type="flex" justify="start" className="innerHeader">
                        <Col span={8} className="col">
                            <div>
                                <h3> {globalSeasonName} </h3>
                            </div>
                        </Col>
                        <Col span={16} className="col">
                            <BudgetViewsButtonActions
                              undoDisabled={undoDisabled}
                              onUndo={() => this.handleHistory('undo')}
                              redoDisabled={redoDisabled}
                              onRedo={() => this.handleHistory('redo')}
                              onExport={() => this.getExportedFile(globalBudgetId, this.props.params.tab)}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    {currentSection}
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
    history: PropTypes.object,
    historyRedo: PropTypes.func.isRequired,
    historyUndo: PropTypes.func.isRequired,
    isBudgetLoading: PropTypes.bool.isRequired,
    isRefreshRequired: PropTypes.bool.isRequired,
    resetState: PropTypes.func.isRequired,
    router: PropTypes.object,
    sendDataForSpreading: PropTypes.func.isRequired,
    setGlobalData: PropTypes.func.isRequired,
    view: PropTypes.string,
    viewData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
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
        history: HistoryReducer,
        isBudgetLoading: BudgetViewReducer.isBudgetLoading,
        isRefreshRequired: BudgetViewReducer.isRefreshRequired,
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
        sendDataForSpreading,
        setGlobalData,
        triggerChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
