import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Board from '../components/Board';
import BudgetList from './BudgetList';


export default class BudgetHome extends Component {


    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Board title="Budgets Dashboard">
                        <BudgetList />
                    </Board>

                </Col>
            </Row>

        );
    }
}
