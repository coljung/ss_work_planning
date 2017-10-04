import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {
    render() {
        const bgColor = this.props.todo.completed ? '#d6ffd3' : '#ffffff';
        return (

        <li style={{ backgroundColor: bgColor }} onClick={this.props.onClick}>
            <p>{this.props.todo.title}gg</p>
            <p>{this.props.todo.completed}</p>
            <p>{this.props.todo.text}--</p>
        </li>
        );
    }

}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    todo: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};
