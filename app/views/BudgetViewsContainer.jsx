import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router';
import ExecViewContainer from './top-down/exec/ExecViewContainer';
import ViewCommonContainer from './top-down/common/ViewCommonContainer';
import BudgetViewsButtonActions from './BudgetViewsButtonActions';
import { budgetVersions, saveNewBudgetVersion } from './BudgetViewActions';
import { ROUTE_BUDGET } from '../Routes';

// Sub Component
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export const TAB_EXEC_RECAP = 'exec';
export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';
export const TAB_BRAND_GROUPS = 'brand-groups';

class BudgetViewsContainer extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }
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
    }

    componentWillMount() {
        const { budgetVersions, params: { budgetid } } = this.props; // eslint-disable-line no-shadow

        budgetVersions(budgetid);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.params.tab !== this.props.params.tab) {
        const currentKey = this.state.activeTab;

        this.setState({
            [currentKey]: false,
            activeTab: nextProps.params.tab,
            [nextProps.params.tab]: true,
        });
      }
    }

    save = (budget, version) => {
        this.props.saveNewBudgetVersion(budget, version);
    }

    saveNewVersion = (budget, version) => {
        this.props.saveNewBudgetVersion(budget, version);
    }

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
                console.log(this.dataToSave);
            }
        }
    }

    handleVersionClick(event) {
      const { params: { tab } } = this.props;
      const { seasonName} = this.state;

      const { item: { props: { version } } } = event;

      window.location.href = `${ROUTE_BUDGET}/${seasonName}/budget/${version.budget_id}/version/${version.name}/${version.id}/${tab}`;
    }

    onTabChange(newTabKey) {
        // set true to load tabbed component
        const { activeTab } = this.state;

        this.setState({
            [activeTab]: false,
            activeTab: newTabKey,
            [newTabKey]: true,
        });

        this.dataToSave = [];

        // Replace URL with react-router
        const { router: { push } } = this.props;

        push(`${ROUTE_BUDGET}/${this.state.seasonName}/budget/${this.state.budgetSeasonId}/version/${this.state.versionName}/${this.state.versionId}/${newTabKey}`);
    }

    render() {
        const { versions, params: { seasonname } } = this.props;
        const { activeTab, budgetSeasonId, seasonName, versionId, versionName } = this.state;
        const menuBudget = (
            <Menu onClick={this.handleVersionClick.bind(this)}>
                { versions && versions.map(
                  (version) =>
                    <Menu.Item key={version.id} version={ version }>{ seasonname } - { version.name }</Menu.Item>
                ) }
            </Menu>
        );
        const menuView = (
            <Menu>
                <Menu.Item>Top Down</Menu.Item>
                <SubMenu title="Bottom Up">
                    <Menu.Item>Receipt Planning</Menu.Item>
                    <Menu.Item>Delivery Planning</Menu.Item>
                </SubMenu>
            </Menu>
        );
        return (
            <div>
                <div className="budgetHeader">
                    <Row type="flex" justify="start" className="innerHeader">
                        <Col span={4} className="col">
                            <Dropdown overlay={menuBudget}>
                                <h3><a className="ant-dropdown-link" href="#">
                                    {seasonName} - {versionName}<Icon type="down" />
                                </a></h3>
                            </Dropdown>
                        </Col>
                        <Col span={4} className="col">
                            <Dropdown overlay={menuView} disabled={true}>
                                <h3><a className="ant-dropdown-link" href="#">
                                    Top Down <Icon type="down" />
                                </a></h3>
                            </Dropdown>
                        </Col>
                        <Col span={16} className="col">
                            <BudgetViewsButtonActions
                                saveNew={() => this.saveNewVersion(budgetSeasonId, versionId)}
                                save={() => this.save(budgetSeasonId, versionId)}
                                currentView={activeTab}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <Tabs activeKey={activeTab} onChange={this.onTabChange.bind(this)} animated={false}>
                        <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
                            {(activeTab === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
                                <ExecViewContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {(activeTab === TAB_TOTAL) &&
                                <ViewCommonContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    updateData={this.changeCell}
                                    key={TAB_TOTAL}
                                    view='total'
                                />
                            }
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>
                            {(activeTab === TAB_WOMEN) &&
                                <ViewCommonContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    updateData={this.changeCell}
                                    key={TAB_WOMEN}
                                    view='women'
                                />
                            }
                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>
                            {(activeTab === TAB_MEN) &&
                                <ViewCommonContainer
                                    budget={budgetSeasonId}
                                    version={versionId}
                                    updateData={this.changeCell}
                                    key={TAB_MEN}
                                    view='men'
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
    versions: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    return {
        newVersion: BudgetViewReducer.newVersion,
        versions: BudgetViewReducer.versions,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ budgetVersions, saveNewBudgetVersion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
