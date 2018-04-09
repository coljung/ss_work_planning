import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import { Content, Header, Sider } from 'antd/lib/layout';
import HeaderContent from './common/HeaderContent';
import CustomNavigation from './customNavigation/CustomNavigation';
import { NotificationManager } from '../notifications/NotificationManager';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: true, showStoreModal: true };
    }

    toggle() {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
        clearTimeout(this.timer);

        // collapse after 8 seconds
        if (!collapsed) {
            this.timer = setTimeout(() => {
                this.setState({ collapsed: !collapsed });
            }, 80000);
        }
    }

    render() {
        return (
            <div className="store_layout">
                <Header>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={ this.toggle.bind(this) } />
                        <HeaderContent />
                </Header>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}>
                        <CustomNavigation pathname={this.props.location.pathname} />
                    </Sider>
                    <Content>
                        <main style={{ flex: 1, overflowY: 'auto', padding: '0 25px 25px' }}>
                            {this.props.children}
                            <NotificationManager />
                        </main>
                    </Content>
                </Layout>
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};
