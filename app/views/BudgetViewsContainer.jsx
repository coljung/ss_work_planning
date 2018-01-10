import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Menu, Dropdown, Icon } from 'antd';
import { browserHistory } from 'react-router';
import ExecViewContainer from 'top_down/exec/ExecViewContainer';
import ViewCommonContainer from 'top_down/common/ViewCommonContainer';
import BudgetViewsButtonActions from './BudgetViewsButtonActions';
import { saveNewBudgetVersion } from './BudgetViewActions';
import { ROUTE_BUDGET } from '../Routes';

const TabPane = Tabs.TabPane;

export const TAB_EXEC_RECAP = 'exec';
export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';
export const TAB_BRAND_GROUPS = 'brand-groups';


class BudgetViewsContainer extends Component {

    constructor(props) {
        super(props);

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

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.props.newVersion, nextProps.newVersion);
        if (nextProps.newVersion === null) {
            return true;
        }
        browserHistory.push(`${ROUTE_BUDGET}/${this.state.seasonName}/budget/${this.state.budgetSeasonId}/version/${nextProps.newVersion.name}/${nextProps.newVersion.id}/${this.state.activeTab}`);
        return false;

        // return nextProps.newVersion === null;
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

    onTabChange(newTabKey) {
        // set true to load tabbed component
        const currentKey = this.state.activeTab;

        this.setState({
            [currentKey]: false,
            activeTab: newTabKey,
            [newTabKey]: true,
        });

        this.dataToSave = [];
    }

    render() {
        const currentKey = this.state.activeTab;
        // const currentTab = this.props.params.tab === currentKey ? currentKey;
        // console.log('---------', this.state.activeTab, this.state);
        const SubMenu = Menu.SubMenu;
        const MenuItemGroup = Menu.ItemGroup;
        const menuBudget = (
            <Menu>
                <Menu.Item>SS2018 - V3</Menu.Item>
                <Menu.Item>SS2018 - V2</Menu.Item>
                <Menu.Item>SS2018 - V1</Menu.Item>
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
                                    {this.state.seasonName} - {this.state.versionName}<Icon type="down" />
                                </a></h3>
                            </Dropdown>
                        </Col>
                        <Col span={4} className="col">
                            <Dropdown overlay={menuView}>
                                <h3><a className="ant-dropdown-link" href="#">
                                    Top Down <Icon type="down" />
                                </a></h3>
                            </Dropdown>
                        </Col>
                        <Col span={16} className="col">
                            <BudgetViewsButtonActions
                                saveNew={() => this.saveNewVersion(this.state.budgetSeasonId, this.state.versionId)}
                                save={() => this.save(this.state.budgetSeasonId, this.state.versionId)}
                                currentView={this.state.activeTab}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <Tabs defaultActiveKey={this.state.activeTab} onChange={this.onTabChange.bind(this)} animated={false}>
                        <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
                            {(currentKey === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
                                <ExecViewContainer
                                    budget={this.state.budgetSeasonId}
                                    version={this.state.versionId}
                                />
                            }
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {(currentKey === TAB_TOTAL) &&
                                <ViewCommonContainer
                                    budget={this.state.budgetSeasonId}
                                    version={this.state.versionId}
                                    updateData={this.changeCell}
                                    key={TAB_TOTAL}
                                    view='total'
                                />
                            }
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>
                            {(currentKey === TAB_WOMEN) &&
                                <ViewCommonContainer
                                    budget={this.state.budgetSeasonId}
                                    version={this.state.versionId}
                                    updateData={this.changeCell}
                                    key={TAB_WOMEN}
                                    view='women'
                                />
                            }
                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>
                            {(currentKey === TAB_MEN) &&
                                <ViewCommonContainer
                                    budget={this.state.budgetSeasonId}
                                    version={this.state.versionId}
                                    updateData={this.changeCell}
                                    key={TAB_MEN}
                                    view='men'
                                />
                            }
                        </TabPane>
                        <TabPane tab="Brand Groups" key={TAB_BRAND_GROUPS}>
                            {(currentKey === TAB_BRAND_GROUPS || this.state[TAB_BRAND_GROUPS]) &&
                                <TotalViewContainer
                                    budget={this.state.budgetSeasonId}
                                    version={this.state.versionId}
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
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    return {
        newVersion: BudgetViewReducer.newVersion,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ saveNewBudgetVersion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
