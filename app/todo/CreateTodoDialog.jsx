import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Button } from 'react-toolbox/lib/button';

export default class CreateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.setInitialState();
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
    submitForm() {
        this.props.createTodo(this.state);
        this.setInitialState();
    }
    setInitialState() {
        this.state = {
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

        <Button style={{ float: 'right' }} label='Create' onClick={ this.submitForm.bind(this) } target='_blank' raised primary />

      </Dialog>
        );
    }

}
