import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;

export default class NavigationUser extends Component {
    constructor(props) {
        super(props);
        this.state = { current: 'setting:1' };
    }
    handleClick(e) {}

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal">

                <SubMenu title={<span>User Name <Icon type="setting" /></span>}>
                    <Menu.Item>
                        <Link to="/logout">
                            <Icon type="logout" />Log out
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
