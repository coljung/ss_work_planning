import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Dropdown, Icon } from 'antd';
import BudgetVersionMenu from './components/BudgetVersionMenu';
import BudgetViewsButtonActions from './components/BudgetViewsButtonActions';
import SectionContainer from './sections/SectionContainer';
import { refreshGridData } from './sections/SectionActions';
import { budgetVersions, saveNewBudgetVersion } from './BudgetViewActions';
import { switchGlobalData, clearGlobalData } from '../components/customNavigation/CustomNavigationActions';
import { cellValueRenderer as commonCellValueRenderer } from './sections/top-down/CommonCellRenderer';
import { cellValueRenderer as execCellValueRenderer } from './sections/top-down/ExecCellRenderer';
import { goBackAction, goForwardAction } from './history/HistoryActions';

import TopDownSection from './sections/top-down/TopDownSection';
import MiddleOutSection from './sections/middle-out/MiddleOutSection';
import { ROUTE_BUDGET } from '../Routes';

// Sub Component
const TabPane = Tabs.TabPane;

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

        this.props.switchGlobalData(budgetId, versionId, seasonName, versionName, tab);

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleVersionClick = this.handleVersionClick.bind(this);
    }

    componentWillMount() {
        const { budgetVersions, params: { budgetId } } = this.props; // eslint-disable-line no-shadow
        budgetVersions(budgetId);
    }

    componentWillUnmount() {
        this.props.clearGlobalData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.sectionName !== this.props.params.sectionName) {
            const { budgetId, versionId, seasonName, versionName, sectionName, tab } = nextProps.params;
            this.props.switchGlobalData(budgetId, versionId, seasonName, versionName, tab);
            this.setState({
                budgetId,
                versionId,
                seasonName,
                versionName,
                sectionName,
                activeTab: tab,
            });
        }
        if (nextProps.newVersion !== this.props.newVersion) {
            this.handlePushRoute(true, false, nextProps.newVersion, null);
        }
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
        const { activeTab, budgetId, versionId } = this.state;
        const { goBackAction, goForwardAction, history } = this.props; // eslint-disable-line no-shadow
        const data = historyMove === 'undo' ? goBackAction(activeTab) : goForwardAction(activeTab);

        this.props.refreshGridData(budgetId, versionId, activeTab, data);
    }

    handleVersionClick(event) {
        const { item: { props: { version } } } = event;

        if (version.id !== this.state.versionId) {
            this.setState({
                versionId: version.id,
                versionName: version.name,
            });

            this.handlePushRoute(false, true, version, null);
        }
    }

    handleTabChange(newTabKey) {
        // set true to load tabbed component
        const { budgetId, versionId, seasonName, versionName } = this.state;

        this.handlePushRoute(false, false, null, newTabKey);
        this.props.switchGlobalData(budgetId, versionId, seasonName, versionName, newTabKey);
    }

    getCurrentSection = (activeTab, globalBudgetId, globalVersionId) => {
        switch (this.state.sectionName) {
            case 'top-down':
                return (<TopDownSection
                    activeKey={activeTab}
                    changeTab={key => this.handleTabChange(key)}
                    budget={globalBudgetId}
                    tab={this.props.params.tab}
                    version={globalVersionId} />);
            case 'middle-out' :
                return (<MiddleOutSection
                    activeKey={activeTab}
                    changeTab={key => this.handleTabChange(key)}
                    budget={globalBudgetId}
                    tab={this.props.params.tab}
                    version={globalVersionId} />);
            default:
                return null;
        }
    }

    render() {
        if (!this.props.budgetView) {
            return null;
        }

        const { activeTab } = this.state;
        const { globalBudgetId, globalVersionId, globalSeasonName, globalVersionName, versions, history } = this.props;

        // undo disabled / enabled ?
        const viewHistory = history[activeTab];
        const undoDisabled = viewHistory ? viewHistory.undoDisabled : true;
        const redoDisabled = viewHistory ? viewHistory.redoDisabled : true;

        const currentSection = this.getCurrentSection(activeTab, globalBudgetId, globalVersionId);

        return (
            <div>
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
    budgetVersions: PropTypes.func.isRequired,
    switchGlobalData: PropTypes.func.isRequired,
    clearGlobalData: PropTypes.func.isRequired,
    versions: PropTypes.array.isRequired,
    router: PropTypes.object,
    history: PropTypes.object,
    goBackAction: PropTypes.func,
    goForwardAction: PropTypes.func,
    refreshGridData: PropTypes.func.isRequired,
    budgetView: PropTypes.bool.isRequired,
    globalBudgetId: PropTypes.string,
    globalVersionId: PropTypes.string,
    globalSeasonName: PropTypes.string,
    globalVersionName: PropTypes.string,
};

function mapStateToProps(state) {
    const { BudgetViewReducer, HistoryReducer, CustomNavigationReducer } = state;
    return {
        newVersion: BudgetViewReducer.newVersion,
        versions: BudgetViewReducer.versions,
        history: HistoryReducer,
        globalBudgetId: CustomNavigationReducer.budgetId,
        globalVersionId: CustomNavigationReducer.versionId,
        globalSeasonName: CustomNavigationReducer.seasonName,
        globalVersionName: CustomNavigationReducer.versionName,
        globalTab: CustomNavigationReducer.view,
        budgetView: CustomNavigationReducer.budgetView,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        budgetVersions,
        saveNewBudgetVersion,
        switchGlobalData,
        clearGlobalData,
        goBackAction,
        goForwardAction,
        refreshGridData,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
