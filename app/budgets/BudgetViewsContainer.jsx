import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Dropdown, Icon } from 'antd';
import BudgetVersionMenu from './components/BudgetVersionMenu';
import BudgetViewsButtonActions from './components/BudgetViewsButtonActions';
import { sendDataForSpreading } from './sections/SectionActions';
import {
        getBudgetVersions,
        fetchBudgetConfigData,
        fetchBudgetMetricData,
        saveNewBudgetVersion } from './BudgetViewActions';
import { setGlobalData, clearGlobalData } from '../components/customNavigation/CustomNavigationActions';
import { historyUndo, historyRedo } from './history/HistoryActions';

import TopDownSection from './sections/top-down/TopDownSection';
import MiddleOutSection from './sections/middle-out/MiddleOutSection';
import { ROUTE_BUDGET } from '../Routes';

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
            activeTab: tab,
        };

        // set global parameters for budgets
        // Budget ID, Version ID, Season Name (SSXX/FWXX), Version name (VX), tab/view
        this.props.setGlobalData(budgetId, versionId, seasonName, versionName, tab);

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleVersionClick = this.handleVersionClick.bind(this);
    }

    componentDidMount() {
        const { getBudgetVersions, fetchBudgetConfigData, params: { budgetId } } = this.props; // eslint-disable-line no-shadow

        // gets list of associated versions
        getBudgetVersions(budgetId);

        // get config data, then fetch metrics based on config
        const promise = fetchBudgetConfigData();
        promise.then(this.getMetricData);
    }

    componentWillUnmount() {
        this.props.clearGlobalData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.sectionName !== this.props.params.sectionName) {
            this.newSpecs(nextProps.params);
        } else if (nextProps.newVersion !== this.props.newVersion) {
            this.handlePushRoute(true, false, nextProps.newVersion, null);
            this.newSpecs(nextProps.params, nextProps.newVersion);
        }
    }

    newSpecs = (params, newVersion = null) => {
        const { budgetId, seasonName, tab, sectionName } = params;
        const versionId = newVersion ? newVersion.id : params.versionId;
        const versionName = newVersion ? newVersion.name : params.versionName;

        this.setState({
            budgetId,
            versionId,
            seasonName,
            versionName,
            sectionName,
            activeTab: tab,
        });

        this.props.setGlobalData(budgetId, versionId, seasonName, versionName, tab);
    }

    getMetricData = () => {
        const { budgetId, versionId, activeTab } = this.state;
        const { config, router: { location } } = this.props;
        this.props.fetchBudgetMetricData(budgetId, versionId, activeTab, config.available_metrics, location.query);
    }

    saveNewVersion = (budget, version) => {
        this.props.saveNewBudgetVersion(budget, version);
    };

    handlePushRoute = (useNextProps, switchVersion, newVersion = null, newTab = null) => {
        const { router } = this.props;
        const { budgetId, seasonName, sectionName } = this.state;

        const versionName = useNextProps || switchVersion ? newVersion.name : this.state.versionName;
        const versionId = useNextProps || switchVersion ? newVersion.id : this.state.versionId;
        const tab = newTab || this.props.params.tab;

        router.push(`${ROUTE_BUDGET}/${seasonName}/${budgetId}/version/${versionName}/${versionId}/${sectionName}/${tab}`);
    }

    handleHistory = (historyMove) => {
        const { budgetId, versionId } = this.state;
        const { historyUndo, historyRedo, params: { tab } } = this.props; // eslint-disable-line no-shadow
        const data = historyMove === 'undo' ? historyUndo(tab) : historyRedo(tab);
        this.props.sendDataForSpreading(budgetId, versionId, tab, data);
    }

    handleVersionClick(event) {
        const { item: { props: { version } } } = event;
        const { budgetId, seasonName, tab } = this.state;

        if (version.id !== this.state.versionId) {
            this.setState({
                versionId: version.id,
                versionName: version.name,
            });

            this.handlePushRoute(false, true, version, null);
            this.props.setGlobalData(budgetId, version.id, seasonName, version.name, tab);
        }
    }

    handleTabChange(newTabKey) {
        // set true to load tabbed component
        const { budgetId, versionId, seasonName, versionName } = this.state;

        this.handlePushRoute(false, false, null, newTabKey);
        this.props.setGlobalData(budgetId, versionId, seasonName, versionName, newTabKey);
    }

    getCurrentSection = (activeTab, globalBudgetId, globalVersionId) => {
        switch (this.state.sectionName) {
            case 'top-down':
                return (<TopDownSection
                    activeKey={activeTab}
                    changeTab={key => this.handleTabChange(key)}
                    budget={globalBudgetId}
                    data={this.props.viewData}
                    tab={this.props.params.tab}
                    version={globalVersionId} />);
            case 'middle-out' :
                return (<MiddleOutSection
                    activeKey={activeTab}
                    changeTab={key => this.handleTabChange(key)}
                    budget={globalBudgetId}
                    data={this.props.viewData}
                    tab={this.props.params.tab}
                    version={globalVersionId} />);
            default:
                return null;
        }
    }

    render() {
        // make sure config is loaded before moving forward
        if (!Object.keys(this.props.config).length) {
            return null;
        }

        // const { activeTab } = this.state;
        const {
            globalBudgetId,
            globalVersionId,
            globalSeasonName,
            globalVersionName,
            versions,
            history,
            loadingBudget,
        } = this.props;

        // undo disabled / enabled ?
        // const viewHistory = history[this.props.params.tab];
        // const undoDisabled = viewHistory && !loadingBudget ? viewHistory.past.length <= 0 : true;
        // const redoDisabled = viewHistory && !loadingBudget ? viewHistory.future.length <= 0 : true;
        const currentSection = this.getCurrentSection(this.props.params.tab, globalBudgetId, globalVersionId);

        return (
            <div>
                {/*
                <div className="budgetHeader">
                    <Row type="flex" justify="start" className="innerHeader">
                        <Col span={8} className="col">
                            <BudgetVersionMenu
                                versions={versions}
                                currentSeason={globalSeasonName}
                                currentVersion={globalVersionName}
                                handleClick={this.handleVersionClick} />
                        </Col>
                        <Col span={16} className="col">
                            <BudgetViewsButtonActions
                              undoDisabled={undoDisabled}
                              onUndo={() => this.handleHistory('undo')}
                              redoDisabled={redoDisabled}
                              onRedo={() => this.handleHistory('redo')}
                              saveNew={() => this.saveNewVersion(globalBudgetId, globalVersionId)}
                            />
                        </Col>
                    </Row>
                </div>
                */}
                <div className="budgetBody">
                    {currentSection}
                </div>
            </div>
        );
    }
}

BudgetViewsContainer.propTypes = {
    params: PropTypes.object.isRequired,
    newVersion: PropTypes.object,
    saveNewBudgetVersion: PropTypes.func.isRequired,
    viewData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    view: PropTypes.string,
    getBudgetVersions: PropTypes.func.isRequired,
    fetchBudgetConfigData: PropTypes.func.isRequired,
    fetchBudgetMetricData: PropTypes.func.isRequired,
    setGlobalData: PropTypes.func.isRequired,
    clearGlobalData: PropTypes.func.isRequired,
    versions: PropTypes.array.isRequired,
    router: PropTypes.object,
    history: PropTypes.object,
    sendDataForSpreading: PropTypes.func.isRequired,
    historyUndo: PropTypes.func.isRequired,
    historyRedo: PropTypes.func.isRequired,
    globalBudgetId: PropTypes.string,
    globalVersionId: PropTypes.string,
    globalSeasonName: PropTypes.string,
    globalVersionName: PropTypes.string,
    loadingBudget: PropTypes.bool.isRequired,
    config: PropTypes.object,
};

function mapStateToProps(state) {
    const {
        BudgetViewReducer,
        HistoryReducer,
        CustomNavigationReducer,
    } = state;

    return {
        newVersion: BudgetViewReducer.newVersion,
        versions: BudgetViewReducer.versions,
        config: BudgetViewReducer.config,
        loadingBudget: BudgetViewReducer.loading,
        viewData: BudgetViewReducer.viewData,
        view: BudgetViewReducer.view,
        history: HistoryReducer,
        globalBudgetId: CustomNavigationReducer.budgetId,
        globalVersionId: CustomNavigationReducer.versionId,
        globalSeasonName: CustomNavigationReducer.seasonName,
        globalVersionName: CustomNavigationReducer.versionName,
        globalTab: CustomNavigationReducer.view,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBudgetMetricData,
        getBudgetVersions,
        fetchBudgetConfigData,
        saveNewBudgetVersion,
        setGlobalData,
        clearGlobalData,
        historyUndo,
        historyRedo,
        sendDataForSpreading,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
