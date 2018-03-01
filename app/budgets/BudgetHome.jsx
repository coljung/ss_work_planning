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
            viewArchivedModalActive: false,
        };
    }

    toggleCreateModal = () => {
        this.setState({
            createModalActive: !this.state.createModalActive,
        });
    }

    toggleViewArchivedModal = () => {
        this.setState({
            viewArchivedModalActive: !this.state.viewArchivedModalActive,
        });
    }

    render() {
        return (
            <Row>
                <Col xs={8}>
                    <Board title="Budgets Dashboard" style={{ paddingTop: '25px' }}>
                        <BudgetList
                            visible={this.state.viewArchivedModalActive}
                            onOverlayClick={this.toggleViewArchivedModal.bind(this)} />
                        <BudgetCreate
                            visible={this.state.createModalActive}
                            onOverlayClick={this.toggleCreateModal.bind(this)} />
                        <Row type="flex" justify="end">
                            <Col>
                                 <Button size="large"
                                         icon="file"
                                         type="primary"
                                         onClick={this.toggleCreateModal}>
                                         Create New Budget
                                 </Button>
                                 <Button size="large"
                                         style={{ marginLeft: '20px' }}
                                         icon="line-chart"
                                         onClick={this.toggleViewArchivedModal}>
                                         View Older Budgets
                                 </Button>
                            </Col>
                        </Row>
                    </Board>

                </Col>
            </Row>
        );
    }
}
