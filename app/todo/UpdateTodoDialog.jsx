import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Button } from 'react-toolbox/lib/button';

export default class UpdateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.setInitialState();
    }
    componentWillReceiveProps(props) {
        if (props.todo) {
            this.setState({
                id: props.todo.id,
                title: props.todo.title,
                text: props.todo.text,
                completed: props.todo.completed,
            });
        }
    }
    handleTitleChange(title) {
        this.setState({ title });
    }
    handleTextChange(text) {
        this.setState({ text });
    }
    handleCompletedChange(completed) {
        this.setState({ completed });
    }
    submitUpdate() {
        this.props.updateTodo(this.state);
    // this.setInitialState();
    }
    submitDelete() {
        this.props.deleteTodo(this.state.id);
    }
    setInitialState() {
        this.state = {
            id: 0,
            title: '',
            text: '',
            completed: false,
        };
    }

    render() {
        return (
      <Dialog
          active={this.props.active}
          onEscKeyDown={this.props.onEscKeyDown}
          onOverlayClick={this.props.onOverlayClick}
          title={this.props.title}>

        <Input type='text' label='Title' name='title' value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
        <Input type='text' label='Text' name='text' value={this.state.text} onChange={this.handleTextChange.bind(this)} />

        <Checkbox checked={this.state.completed} label="Completed" onChange={this.handleCompletedChange.bind(this)} />

        <Button style={{ marginLeft: 10, float: 'right' }} label='Delete' onClick={ this.submitDelete.bind(this) } target='_blank' raised primary />
        <Button style={{ float: 'right' }} label='Update' onClick={ this.submitUpdate.bind(this) } target='_blank' raised />
      </Dialog>
        );
    }

}
