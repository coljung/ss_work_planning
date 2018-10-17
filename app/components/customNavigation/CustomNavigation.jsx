import React, { Component } from 'react';
import { Menu, Icon, Tooltip } from 'antd';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ROUTE_DASHBOARD } from '../../constants/routes';
import { logout, me } from '../../user/duck/actions';
import { LOGOUT_REQUEST } from '../../user/duck/types';

class CustomNavigation extends Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
        user: PropTypes.object,
        me: PropTypes.func.isRequired,
    };

    state = {
        current: this.props.pathname,
    };

    handleClick = (e) => {
        switch (e.key) {
            case LOGOUT_REQUEST:
                this.props.logout().then(() => this.props.me());
                break;
            default:
                this.setState({ current: e.key });
                break;
        }
    };

    render() {
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
                            <Icon type="home"/>
                            <span className="nav-text">{i18n.t('sideMenu.home')}</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key={LOGOUT_REQUEST}>
                    <Tooltip placement="right">
                        <Icon type="logout"/>
                        <span className="nav-text">{i18n.t('sideMenu.logout')}</span>
                    </Tooltip>
                </Menu.Item>
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    const { userReducer: { user } } = state;

    return {
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout,
        me,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(CustomNavigation);
