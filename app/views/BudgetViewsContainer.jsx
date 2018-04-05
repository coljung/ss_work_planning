import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Dropdown, Icon } from 'antd';
import ViewCommonContainer from './top-down/common/ViewCommonContainer';
import BudgetViewsButtonActions from './BudgetViewsButtonActions';
import { budgetVersions, saveNewBudgetVersion } from './BudgetViewActions';
import { switchUrls, clearUrls } from '../components/customNavigation/CustomNavigationActions';
import { ROUTE_BUDGET } from '../Routes';
import { cellRendererFactory as commonCellRendererFactory } from './top-down/common/CommonCellRenderer';
import { cellRendererFactory as execCellRendererFactory } from './top-down/exec/ExecCellRenderer';
import BudgetVersionMenu from './BudgetVersionMenu';

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
        const menuBudget =
            <BudgetVersionMenu
                versions={this.props.versions}
                currentSeason={this.state.seasonName}
                currentVersion={this.state.versionName}
                handleClick={this.handleVersionClick} />;

        return (
            <div>
                <div className="budgetHeader">
                    <Row type="flex" justify="start" className="innerHeader">
                        {/* <Col span={8} className="col">
                            <HeaderContent />
                        </Col> */}
                        <Col span={12} className="col">
                            <Dropdown overlay={menuBudget}>
                                <h3>
                                    <a className="ant-dropdown-link" href="#">
                                        {seasonName} - {versionName}<Icon type="down" />
                                    </a>
                                </h3>
                            </Dropdown>
                        </Col>
{/*                        <Col span={3} className="col">
                            <Dropdown overlay={menuView} disabled={true}>
                                <h3><a className="ant-dropdown-link" href="#">
                                    Top Down <Icon type="down" />
                                </a></h3>
                            </Dropdown>
                        </Col> */}
                        <Col span={12} className="col">
                            <BudgetViewsButtonActions saveNew={() => this.saveNewVersion(budgetSeasonId, versionId)} />
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <Tabs activeKey={activeTab} onChange={this.onTabChange} animated={true}>
                        <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
                            {(activeTab === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
                                <ViewCommonContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRendererFactory={execCellRendererFactory}
                                    key={TAB_EXEC_RECAP}
                                    view={TAB_EXEC_RECAP}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {(activeTab === TAB_TOTAL) &&
                                <ViewCommonContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRendererFactory={commonCellRendererFactory}
                                    updateData={this.changeCell}
                                    key={TAB_TOTAL}
                                    view={TAB_TOTAL}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>
                            {(activeTab === TAB_WOMEN) &&
                                <ViewCommonContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRendererFactory={commonCellRendererFactory}
                                    updateData={this.changeCell}
                                    key={TAB_WOMEN}
                                    view={TAB_WOMEN}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>
                            {(activeTab === TAB_MEN) &&
                                <ViewCommonContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    cellRendererFactory={commonCellRendererFactory}
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
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    return {
        newVersion: BudgetViewReducer.newVersion,
        versions: BudgetViewReducer.versions,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ budgetVersions, saveNewBudgetVersion, switchUrls, clearUrls }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
