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
import { switchUrls, clearUrls } from '../components/customNavigation/CustomNavigationActions';
import { cellValueRenderer as commonCellValueRenderer } from './sections/top-down/CommonCellRenderer';
import { cellValueRenderer as execCellValueRenderer } from './sections/top-down/ExecCellRenderer';
import { goBackAction, goForwardAction } from '../history/HistoryActions';
import { ROUTE_BUDGET } from '../Routes';

// Sub Component
const TabPane = Tabs.TabPane;

export const TAB_EXEC_RECAP = 'exec';
export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';
export const TAB_BRAND_GROUPS = 'brand-groups';

class BudgetViewsContainer extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);

        const { budgetid, id, seasonname, vname, tab } = this.props.params;

        this.state = {
            budgetSeasonId: budgetid,
            versionId: id,
            seasonName: seasonname,
            versionName: vname,
            activeTab: tab || TAB_EXEC_RECAP,
            [TAB_EXEC_RECAP]: false,
            [TAB_TOTAL]: false,
            [TAB_WOMEN]: false,
            [TAB_MEN]: false,
            [TAB_BRAND_GROUPS]: false,
        };

        this.dataToSave = [];

        this.props.switchUrls(budgetid, id, seasonname, vname, tab);

        this.onTabChange = this.onTabChange.bind(this);
        this.handleVersionClick = this.handleVersionClick.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleRedo = this.handleRedo.bind(this);
    }

    componentWillMount() {
        const { budgetVersions, params: { budgetid } } = this.props; // eslint-disable-line no-shadow

        budgetVersions(budgetid);
    }

    componentWillUnmount() {
        this.props.clearUrls();
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
            const { router, params: { tab } } = this.props;
            const { budgetSeasonId, seasonName } = this.state;

            router.push(`${ROUTE_BUDGET}/${seasonName}/budget/${budgetSeasonId}/version/${nextProps.newVersion.name}/${nextProps.newVersion.id}/${tab}`);
        }
    }

    saveNewVersion = (budget, version) => {
        this.props.saveNewBudgetVersion(budget, version);
    };

    changeCell = (cellEdits) => {
        console.log('changeCell', cellEdits);
        // on load this is called, hence the check
        if (cellEdits) {
            const row = cellEdits[0][0];
            const col = cellEdits[0][1];
            const prevValue = cellEdits[0][2];
            const newValue = cellEdits[0][3];
            if (prevValue !== newValue) {
                const newData = {
                    row,
                    col,
                    value: newValue,
                };
                // check if cell has been modified already
                const checkDuplicate = this.dataToSave.filter(e => e.row !== row || e.col !== col);
                checkDuplicate.push(newData);
                this.dataToSave = checkDuplicate;

            }
        }
    };

    handleUndo() {
      const { activeTab, budgetSeasonId, versionId } = this.state;
      const { goBackAction, history } = this.props;
      const data = goBackAction(activeTab);

      this.props.refreshGridData(budgetSeasonId, versionId, activeTab, data);
    }

    handleRedo() {
      const { activeTab, budgetSeasonId, versionId } = this.state;
      const { goForwardAction, history } = this.props;
      const data = goForwardAction(activeTab);

      this.props.refreshGridData(budgetSeasonId, versionId, activeTab, data);
    }

    handleVersionClick(event) {
        const { item: { props: { version } } } = event;

        if (version.id !== this.state.versionId) {
            this.setState({
                versionId: version.id,
                versionName: version.name,
            });

            const { params: { tab } } = this.props;
            const { seasonName } = this.state;

            const { router } = this.props;

            router.push(`${ROUTE_BUDGET}/${seasonName}/budget/${version.budget_id}/version/${version.name}/${version.id}/${tab}`);
        }
    }

    onTabChange(newTabKey) {
        // set true to load tabbed component
        const { activeTab, budgetSeasonId, seasonName, versionId, versionName } = this.state;

        this.setState({
            [activeTab]: false,
            activeTab: newTabKey,
            [newTabKey]: true,
        });

        this.dataToSave = [];

        const { router } = this.props;

        router.push(`${ROUTE_BUDGET}/${seasonName}/budget/${budgetSeasonId}/version/${versionName}/${versionId}/${newTabKey}`);
    }

    render() {
        const { activeTab, budgetSeasonId, versionId, seasonName, versionName } = this.state;
        // undo disabled / enabled ?
        const { history } = this.props;
        const viewHistory = history[activeTab];
        let undoDisabled = viewHistory ? viewHistory.undoDisabled : true;
        let redoDisabled = viewHistory ? viewHistory.redoDisabled : true;
        // activeTab
        console.log(history, viewHistory);
        return (
            <div>
                <div className="budgetHeader">
                    <Row type="flex" justify="start" className="innerHeader">
                        <Col span={8} className="col">
                            <BudgetVersionMenu
                                versions={this.props.versions}
                                currentSeason={this.state.seasonName}
                                currentVersion={this.state.versionName}
                                handleClick={this.handleVersionClick} />
                        </Col>
                        <Col span={16} className="col">
                            <BudgetViewsButtonActions
                              undoDisabled={undoDisabled}
                              onUndo={this.handleUndo}
                              redoDisabled={redoDisabled}
                              onRedo={this.handleRedo}
                              saveNew={() => this.saveNewVersion(budgetSeasonId, versionId)}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <Tabs activeKey={activeTab} onChange={this.onTabChange} animated={false}>
                        <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
                            {(activeTab === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
                                <SectionContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRenderer={execCellValueRenderer}
                                    key={TAB_EXEC_RECAP}
                                    view={TAB_EXEC_RECAP}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {(activeTab === TAB_TOTAL) &&
                                <SectionContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRenderer={commonCellValueRenderer}
                                    updateData={this.changeCell}
                                    key={TAB_TOTAL}
                                    view={TAB_TOTAL}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>
                            {(activeTab === TAB_WOMEN) &&
                                <SectionContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRenderer={commonCellValueRenderer}
                                    updateData={this.changeCell}
                                    key={TAB_WOMEN}
                                    view={TAB_WOMEN}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>
                            {(activeTab === TAB_MEN) &&
                                <SectionContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRenderer={commonCellValueRenderer}
                                    updateData={this.changeCell}
                                    key={TAB_MEN}
                                    view={TAB_MEN}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Brand Groups" disabled key={TAB_BRAND_GROUPS}>
                            {(activeTab === TAB_BRAND_GROUPS || this.state[TAB_BRAND_GROUPS]) &&
                                <TotalViewContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
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
    switchUrls: PropTypes.func.isRequired,
    clearUrls: PropTypes.func.isRequired,
    versions: PropTypes.array.isRequired,
    router: PropTypes.object,
    history: PropTypes.object,
    goBackAction: PropTypes.func.isRequired,
    goForwardAction: PropTypes.func.isRequired,
    refreshGridData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { BudgetViewReducer, HistoryReducer } = state;
    return {
        newVersion: BudgetViewReducer.newVersion,
        versions: BudgetViewReducer.versions,
        history: HistoryReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      budgetVersions,
      saveNewBudgetVersion,
      switchUrls,
      clearUrls,
      goBackAction,
      goForwardAction,
      refreshGridData,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
