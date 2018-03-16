import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import Plot from 'react-plotly.js';
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
                                 <Button size="large" icon="file" type="primary" onClick={this.toggleCreateModal}>Create New Budget</Button>
                                 <Button style={{ marginLeft: '20px' }} size="large" icon="line-chart" onClick={this.toggleViewArchivedModal}>View Older Budgets</Button>
                            </Col>
                        </Row>
                    </Board>
                    <Board>
                        <Plot
                            data={[
                                {
                                    x: [14295.72, 5912.88, 56506.55, 184026.08, 84662, 124436, 146672],
                                    y: [10000, 50000, 100000, 150000, 200000],
                                    type: 'bar',
                                    mode: 'lines',
                                    marker: { color: 'red' },
                                },
                            ]}
                            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
                        />
                        </Board>

                </Col>
            </Row>
        );
    }
}
