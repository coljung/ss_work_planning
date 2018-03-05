import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu, Icon, Tooltip } from 'antd';
import { ROUTE_STORE_LIST, ROUTE_STYLISTS_LIST, ROUTE_FITTING_ROOM_LIST, ROUTE_APPOINTMENTS_LIST } from '../../Routes';

// Sub Component
const SubMenu = Menu.SubMenu;

export default class NavigationMain extends Component {
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
        return (
            <Menu
                onClick={this.handleClick}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[this.state.current]}
                >
                <Menu.Item key={ROUTE_APPOINTMENTS_LIST}>
                    <Tooltip placement="right">
                        <Link to={ROUTE_APPOINTMENTS_LIST}>
                            <Icon type="calendar" />
                            <span className="nav-text">Home</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="user" /><span>Top Down</span></span>}
                  >
                    <Menu.Item key="3">Exec Recap</Menu.Item>
                    <Menu.Item key="4">Total</Menu.Item>
                    <Menu.Item key="5">Women</Menu.Item>
                    <Menu.Item key="6">Men</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={<span><Icon type="team" /><span>Middle Out</span></span>}
                  >
                    <Menu.Item key="3">Middle Out 1</Menu.Item>
                    <Menu.Item key="4">Middle Out 2</Menu.Item>
                    <Menu.Item key="5">Middle Out 3</Menu.Item>
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
                    title={<span><Icon type="area-chart" /><span>Reporting</span></span>}
                  >
                    <Menu.Item key="3">Reporting-1</Menu.Item>
                    <Menu.Item key="4">Reporting-2</Menu.Item>
                    <Menu.Item key="5">Reporting-3</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

NavigationMain.propTypes = {
    pathname: PropTypes.string.isRequired,
};
