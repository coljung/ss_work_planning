import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;

export default class NavigationUser extends Component {
    constructor(props) {
        super(props);
        this.state = { current: '' };
    }

    handleClick = (e) => {
      this.setState({
        current: e.key,
      });
    }

    render() {
        return (
            <Menu
                selectedKeys={[this.state.current]}
                mode="horizontal">
                <SubMenu title={<span>User Name <Icon type="setting" /></span>}>
                    <Menu.Item key="logout">
                        <Icon type="logout" />Log out
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
