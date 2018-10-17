import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderContent from './common/HeaderContent';
import CustomNavigation from './customNavigation/CustomNavigation';
import NotificationManager from '../notifications/NotificationManager';
import { me } from '../user/duck/actions';
import { messages } from '../notifications/NotificationActions';
import LoadingSpinner from './common/LoadingSpinner';

class App extends Component {
    static propTypes = {
        location: PropTypes.object,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
        ]),
        me: PropTypes.func.isRequired,
        messages: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            appReady: false,
            showStoreModal: true,
        };

        // We have to remove the timeout and interval if the class is unmounted
        this.loadTimeout = null;
        this.interval = null;
    }

    componentWillUnmount() {
        clearTimeout(this.loadTimeout);
        clearInterval(this.interval);
        this.setState({ appReady: false });
    }

    componentDidMount(): void {
        // Wait for ssense client api to be loaded
        this.loadTimeout = setTimeout(() => {
            this.props.messages({ content: 'API NOT LOADED', isError: true });
        }, 5000);
        this.interval = setInterval(() => {
            if (window.ssense) {
                clearTimeout(this.loadTimeout);
                clearInterval(this.interval);

                ssense.onLoad((err) => { // eslint-disable-line no-undef
                    if (err) {
                        this.props.me();
                    } else {
                        this.setState({ appReady: true });
                        this.props.me();
                    }
                });
            }
        }, 250);
    }

    render() {
        const { user } = this.props;

        if (!this.state.appReady) { // And have a user in store
            return (<LoadingSpinner classUsed="loading" />);
        }

        if (!user) { // And have a user in store
            return (<div></div>); // Fast & Compromised: white page that will show the login popup
        }

        const getClassname = this.props.location.pathname === '/' ? 'app_layout_home' : 'app_layout';
        return (
            <div className={getClassname}>
                <Layout>
                    <Layout.Header>
                        <Icon className="trigger" />
                        <HeaderContent />
                    </Layout.Header>
                    <Layout.Sider
                        trigger={null}
                        collapsible
                        collapsed={true}>
                        <CustomNavigation
                            pathname={this.props.location.pathname}
                            />
                    </Layout.Sider>
                    <Layout.Content>
                        <main>
                            {this.props.children}
                            <NotificationManager />
                        </main>
                    </Layout.Content>
                </Layout>
            </div>
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
        me,
        messages,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
