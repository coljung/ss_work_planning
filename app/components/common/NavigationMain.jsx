import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu, Icon, Tooltip } from 'antd';
import { ROUTE_STORE_LIST, ROUTE_STYLISTS_LIST, ROUTE_FITTING_ROOM_LIST, ROUTE_APPOINTMENTS_LIST } from '../../Routes';

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
                    <Tooltip placement="right" title="Appointments">
                        <Link to={ROUTE_APPOINTMENTS_LIST}>
                            <Icon type="calendar" />
                            <span className="nav-text">Appointments</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key={ROUTE_STYLISTS_LIST}>
                    <Tooltip placement="right" title="Stylists">
                        <Link to={ROUTE_STYLISTS_LIST}>
                            <Icon type="team" />
                            <span className="nav-text">Stylists</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key={ROUTE_FITTING_ROOM_LIST}>
                    <Tooltip placement="right" title="Fitting Rooms">
                        <Link to={ROUTE_FITTING_ROOM_LIST}>
                            <Icon type="appstore-o" />
                            <span className="nav-text">Fitting Rooms</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key={ROUTE_STORE_LIST}>
                    <Tooltip placement="right" title="Stores">
                        <Link to={ROUTE_STORE_LIST}>
                            <Icon type="shopping-cart" />
                            <span className="nav-text">Stores</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
            </Menu>
        );
    }
}

NavigationMain.propTypes = {
    pathname: PropTypes.string.isRequired,
};
