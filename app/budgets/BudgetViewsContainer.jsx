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
import { ROUTE_BUDGET } from '../Routes';

// Sub Component
const TabPane = Tabs.TabPane;

export const TAB_EXEC_RECAP = 'exec';
export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';
export const TAB_BRAND_GROUPS = 'brand-groups';

class BudgetViewsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        const { budgetId, versionId, seasonName, versionName, sectionName, tab } = this.props.params;

        // TODO fix naming to match ALL around
        this.state = {
            budgetId,
            versionId,
            seasonName,
            versionName,
            sectionName,
            activeTab: tab || TAB_EXEC_RECAP,
            [TAB_EXEC_RECAP]: false,
            [TAB_TOTAL]: false,
            [TAB_WOMEN]: false,
            [TAB_MEN]: false,
            [TAB_BRAND_GROUPS]: false,
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
        if (nextProps.params.tab !== this.props.params.tab) {
            const currentKey = this.state.activeTab;

            this.setState({
                [currentKey]: false,
                activeTab: nextProps.params.tab,
                [nextProps.params.tab]: true,
            });
        } else if (nextProps.newVersion !== this.props.newVersion) {
            this.handlePushRoute(true, false, nextProps.newVersion, null);
        }
    }

    saveNewVersion = (budget, version) => {
        this.props.saveNewBudgetVersion(budget, version);
    };

    handlePushRoute = (useNextProps, switchVersion, newVersion = null, newTab = null) => {
        const { router } = this.props;
        const { budgetId, seasonName, section } = this.state;

        const versionName = useNextProps || switchVersion ? newVersion.name : this.state.versionName;
        const versionId = useNextProps || switchVersion ? newVersion.id : this.state.versionId;
        const tab = newTab || this.props.params.tab;

        router.push(`${ROUTE_BUDGET}/${seasonName}/${budgetId}/version/${versionName}/${versionId}/${section}/${tab}`);
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
        const { activeTab } = this.state;

        this.setState({
            [activeTab]: false,
            activeTab: newTabKey,
            [newTabKey]: true,
        });

        this.handlePushRoute(false, false, null, newTabKey);
    }

    render() {
        if (!this.props.budgetView) {
            return null;
        }
        // TODO FIGURE TAB because it doesnt chage on tab switch
        const { activeTab } = this.state;
        const { globalBudgetId, globalVersionId, globalSeasonName, globalVersionName, versions, history } = this.props;

        // undo disabled / enabled ?
        const viewHistory = history[activeTab];
        const undoDisabled = viewHistory ? viewHistory.undoDisabled : true;
        const redoDisabled = viewHistory ? viewHistory.redoDisabled : true;
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
                    <Tabs activeKey={activeTab} onChange={this.handleTabChange} animated={false}>
                        <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
                            {(activeTab === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
                                <SectionContainer
                                    budget={globalBudgetId}
                                    version={globalVersionId}
                                    cellRenderer={execCellValueRenderer}
                                    key={TAB_EXEC_RECAP}
                                    view={TAB_EXEC_RECAP}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {(activeTab === TAB_TOTAL) &&
                                <SectionContainer
                                    budget={globalBudgetId}
                                    version={globalVersionId}
                                    cellRenderer={commonCellValueRenderer}
                                    key={TAB_TOTAL}
                                    view={TAB_TOTAL}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>
                            {(activeTab === TAB_WOMEN) &&
                                <SectionContainer
                                    budget={globalBudgetId}
                                    version={globalVersionId}
                                    cellRenderer={commonCellValueRenderer}
                                    key={TAB_WOMEN}
                                    view={TAB_WOMEN}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>
                            {(activeTab === TAB_MEN) &&
                                <SectionContainer
                                    budget={globalBudgetId}
                                    version={globalVersionId}
                                    cellRenderer={commonCellValueRenderer}
                                    key={TAB_MEN}
                                    view={TAB_MEN}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Brand Groups" disabled key={TAB_BRAND_GROUPS}>
                            {(activeTab === TAB_BRAND_GROUPS || this.state[TAB_BRAND_GROUPS]) &&
                                <TotalViewContainer
                                    budget={globalBudgetId}
                                    version={globalVersionId}
                                />
                            }
                        </TabPane>
                    </Tabs>
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
    goBackAction: PropTypes.func.isRequired,
    goForwardAction: PropTypes.func.isRequired,
    refreshGridData: PropTypes.func.isRequired,
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
