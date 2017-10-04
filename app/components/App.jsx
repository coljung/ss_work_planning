import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Layout, Icon } from 'antd';
import HeaderContent from './common/HeaderContent';
import NavigationMain from './common/NavigationMain';
import NotificationManager from '../notifications/NotificationManager';

const { Content, Header, Sider } = Layout;

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
            }, 8000);
        }
    }

    render() {
        return (
            <div className="store_layout">
                <Header>
                    <HeaderContent />
                </Header>
                <Layout>
                    <Content>
                        <main style={{ flex: 1, overflowY: 'auto', padding: 25 }}>
                            <ReactCSSTransitionGroup
                                    component="div"
                                    transitionName="example"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500}>
                                        {React.cloneElement(this.props.children, {
                                            key: this.props.location.pathname,
                                        })}
                            </ReactCSSTransitionGroup>
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
