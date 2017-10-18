import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import Board from '../components/Board';
import BudgetList from './BudgetList';
import BudgetCreate from './BudgetCreate';


export default class BudgetHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createModalActive: false,
        };
    }

    toggleCreateModal = () => {
        this.setState({
            createModalActive: !this.state.createModalActive,
        });
    }


    render() {
        const btn = <Button type="primary" onClick={this.toggleCreateModal}>Create New Budget</Button>;
        return (
            <Row>
                <Col xs={12}>
                    <Board title="Budgets Dashboard" btnInTitle={btn}>
                        <BudgetList />
                        <BudgetCreate
                            visible={this.state.createModalActive}
                            onOverlayClick={this.toggleCreateModal.bind(this)} />
                    </Board>

                </Col>
            </Row>

        );
    }
}
