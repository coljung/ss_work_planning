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
        console.log(budgetView);
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

                <SubMenu
                    key='sub2'
                    disabled={!budgetView}
                    title={<span><Icon type="mail" /><span>Top Down</span></span>}>
                        <Menu.Item key="3">
                            <Link to={`${ROUTE_BUDGET}/SS/budget/${budgetId}/version/${versionName}/${versionId}/exec`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Exec Recap</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={`${ROUTE_BUDGET}/SS/budget/${budgetId}/version/${versionName}/${versionId}/total`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Total</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to={`${ROUTE_BUDGET}/SS/budget/${budgetId}/version/${versionName}/${versionId}/women`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Women</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to={`${ROUTE_BUDGET}/SS/budget/${budgetId}/version/${versionName}/${versionId}/men`}>
                                <Icon type="calendar" />
                                <span className="nav-text">Men</span>
                            </Link>
                        </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub7"
                    title={<span><Icon type="team" /><span>Middle Out</span></span>}>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={<span><Icon type="file" /><span>Bottom Up</span></span>}
                  >
                    <Menu.Item key="3">Buttom Up 1</Menu.Item>
                    <Menu.Item key="4">Buttom Up 2</Menu.Item>
                    <Menu.Item key="5">Buttom Up 3</Menu.Item>
                </SubMenu>

                <SubMenu
                    key="sub4"
                    title={<span><Icon type="area-chart" /><span>Reporting</span></span>}>
                    <Menu.Item key="3">Reporting-1</Menu.Item>
                    <Menu.Item key="4">Reporting-2</Menu.Item>
                    <Menu.Item key="5">Reporting-3</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

CustomNavigation.propTypes = {
    pathname: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavigation);
