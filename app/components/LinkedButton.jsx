import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { browserHistory } from 'react-router';

export default class LinkedButton extends Component {
    navigate(to) {
        browserHistory.push(to);
    }

    render() {
        return (
            <Button onClick={this.navigate.bind(this, this.props.to)} {...this.props}>{this.props.children}</Button>
        );
    }
}

LinkedButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
