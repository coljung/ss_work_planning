import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu, Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { ROUTE_DASHBOARD } from '../../Routes';

class CustomNavigation extends Component {
    constructor(props) {
        super(props);
        // @TODO: fix routes keys for active state
        this.state = { current: props.pathname };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({ current: e.key });
        this.props.triggerMenuCollapse();
    }

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
                            <Icon type="home" />
                            <span className="nav-text">{i18n.t('sideMenu.home')}</span>
                        </Link>
                    </Tooltip>
                </Menu.Item>
                <Menu.Divider />
            </Menu>
        );
    }
}

CustomNavigation.propTypes = {
    budgetId: PropTypes.string,
    config: PropTypes.object,
    pathname: PropTypes.string.isRequired,
    seasonName: PropTypes.string,
    triggerMenuCollapse: PropTypes.func,
};

function mapStateToProps(state) {
    const { BudgetViewReducer, CustomNavigationReducer } = state;
    return {
        budgetId: CustomNavigationReducer.budgetId,
        config: BudgetViewReducer.config,
        seasonName: CustomNavigationReducer.seasonName,
    };
}

export default connect(mapStateToProps, null, null, { pure: false })(CustomNavigation);
