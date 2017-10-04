import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Tooltip } from 'antd';
import Board from '../components/Board';
import Todo from './Todo.jsx';
// import UpdateTodoDialog from './UpdateTodoDialog.jsx';
// import CreateTodoDialog from './CreateTodoDialog.jsx';
import { createTodo, updateTodo, deleteTodo } from './TodoActions.js';

class TodoContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            updateDialogActive: false,
            createDialogActive: false,
            activeTodo: {},
        };
    }

    updateDialogToggle(todo) {
        this.setState({
            updateDialogActive: !this.state.updateDialogActive,
            activeTodo: todo,
        });
    }

    createDialogToggle() {
        this.setState({
            createDialogActive: !this.state.createDialogActive,
        });
    }

    createTodo(todo) {
        this.props.dispatch(createTodo(todo));
        this.createDialogToggle();
    }

    updateTodo(todo) {
        this.props.dispatch(updateTodo(todo));
        this.updateDialogToggle();
    }

    deleteTodo(id) {
        console.log(id);
        this.props.dispatch(deleteTodo(id));
        this.updateDialogToggle();
    }

    render() {
        const createDialogActive = this.state.createDialogActive;
        const updateDialogActive = this.state.updateDialogActive;
        const activeTodo = this.state.activeTodo;
        const todos = this.props.todos;
        return (
      <div>
        <Row>
            <Col sm={12} md={6} lg={8} xsOffset={2}>
              <Board title={'Todo List'}>
                <ul>
                  {todos.map((todo, key) => <Todo onClick={() => this.updateDialogToggle(todo)} key={key} todo={todo} />)}
                </ul>

                <div style={{ padding: 10, textAlign: 'right' }}>
                </div>

              </Board>
            </Col>
        </Row>

      </div>
        );
    }

}

function mapStateToProps(state) {
    const { TodoReducer } = state;
    return {
        todos: TodoReducer.todos,
    };
}

export default connect(mapStateToProps)(TodoContainer);
