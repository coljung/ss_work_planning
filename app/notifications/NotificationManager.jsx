import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearMessages } from './NotificationActions';

export class NotificationManager extends Component {
    componentWillReceiveProps(props) {
        if (props.message) {
            setTimeout(this.props.clearMessages, 7000);
            message[props.message.messageType](props.message.content, 5);
        }
    }

    render() {
        return (<div></div>);
    }
}

NotificationManager.propTypes = {
    message: PropTypes.object,
    clearMessages: PropTypes.func,
};


function mapStateToProps(state) {
    return {
        message: state.Message,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);
