import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu, Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearUrls } from './CustomNavigationActions';
import { ROUTE_DASHBOARD,
         ROUTE_BUDGET }
    from '../../Routes';

// Menu Components
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class CustomNavigation extends Component {
    constructor(props) {
        super(props);
        // @TODO: fix routes keys for active state
        this.state = { current: props.pathname };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({ current: e.key });
    }

    render() {
        const { budgetView, budgetId, versionId, seasonName, versionName, view } = this.props;
        const season = seasonName ? seasonName.split('2') : '';
        return (
            <Menu
                onClick={this.handleClick}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[this.state.current]}>
                <Menu.Item key={ROUTE_DASHBOARD}>
                    <Tooltip placement="right">
                        <Link to={ROUTE_DASHBOARD}>
                            <Icon type="calendar" />
                            <span className="nav-text">Home</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <Menu.Divider />
                <SubMenu
                    key='sub2'
                    disabled={!budgetView}
                    title={<span><Icon type="mail" /><span>Top Down</span></span>}>
                        <Menu.Item key="sub2-1">
                            <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/exec`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Exec Recap</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub2-2">
                            <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/total`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Total</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub2-3">
                            <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/women`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Women</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub2-4">
                            <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/men`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Men</span>
                            </Link>
                        </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub5"
                    disabled={!budgetView}
                    title={<span><Icon type="team" /><span>Middle Out</span></span>}>
                    <Menu.Item key="sub3-1">
                        <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/bgw`}>
                            <Icon type="calendar" />
                            <span className="nav-text">BG Women</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub3-2">
                        <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/bgm`}>
                            <Icon type="calendar" />
                            <span className="nav-text">BG Men</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub3-3">
                        <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/department`}>
                            <Icon type="calendar" />
                            <span className="nav-text">Department</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub3-4">
                        <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/width-depth`}>
                            <Icon type="calendar" />
                            <span className="nav-text">Width vs Depth</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
<<<<<<< HEAD
                    key="sub4"
=======
                    key="sub6"
>>>>>>> PLANSOFT-525: filters
                    disabled={!budgetView}
                    title={<span><Icon type="file" /><span>Bottom Up</span></span>}
                  >
                  <Menu.Item key="sub4-1">
                      <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/receipts`}>
                          <Icon type="calendar" />
                          <span className="nav-text">Receipts</span>
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="sub4-2">
                      <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/delivery`}>
                          <Icon type="calendar" />
                          <span className="nav-text">Delivery</span>
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="sub4-3">
                      <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/unit`}>
                          <Icon type="calendar" />
                          <span className="nav-text">Unit</span>
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="sub4-4">
                      <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/department2`}>
                          <Icon type="calendar" />
                          <span className="nav-text">Department</span>
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="sub4-5">
                      <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/sales-margin`}>
                          <Icon type="calendar" />
                          <span className="nav-text">Sales & Margin</span>
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="sub4-6">
                      <Link to={`${ROUTE_BUDGET}/${season[0]}/budget/${budgetId}/version/${versionName}/${versionId}/shrink`}>
                          <Icon type="calendar" />
                          <span className="nav-text">Shrink</span>
                      </Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Divider />
                <SubMenu
                    key="sub5"
                    title={<span><Icon type="area-chart" /><span>Reporting</span></span>}>
                    <Menu.Item key="sub5-1">Reporting-1</Menu.Item>
                    <Menu.Item key="sub5-2">Reporting-2</Menu.Item>
                    <Menu.Item key="sub5-2">Reporting-3</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

CustomNavigation.propTypes = {
    pathname: PropTypes.string.isRequired,
    budgetView: PropTypes.bool.isRequired,
    budgetId: PropTypes.string,
    versionId: PropTypes.string,
    seasonName: PropTypes.string,
    versionName: PropTypes.string,
    view: PropTypes.string,
};

function mapStateToProps(state) {
    const { CustomNavigationReducer } = state;
    return {
        budgetView: CustomNavigationReducer.budgetView,
        budgetId: CustomNavigationReducer.budgetId,
        versionId: CustomNavigationReducer.versionId,
        seasonName: CustomNavigationReducer.seasonName,
        versionName: CustomNavigationReducer.versionName,
        view: CustomNavigationReducer.view,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearUrls }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(CustomNavigation);
