import React, { Component } from 'react';
import { Row, Col, Button, Tabs } from 'antd';
import HotTable from 'react-handsontable';
import { data } from './test';

const TabPane = Tabs.TabPane;


export default class BudgetTest extends Component {

    constructor(props) {
        super(props);
        this.handsontableData = data;
    }

    firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.fontWeight = 'bold';
        td.style.background = '#CEC';
    }

    render() {
        return (
            <div>
                <div className="budgetHeader">

                    <Row>
                        <Col xs={12}>
                            <h2>SS18 Budget - V1</h2>
                            <h3>Top Down</h3>
                        </Col>
                        <Col xs={12}>
                            button here
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Exec Recap" key="1">
                            <HotTable
                                root="hot"
                                data={this.handsontableData}
                                fixedColumnsLeft={2}
                                fixedRowsTop={2}
                                colHeaders={false}
                                rowHeaders={false}
                                width={1200}
                                height={600}
                                currentRowClassName= {'currentRow'}
                                currentColClassName= {'currentCol'}
                                function={true}
                                stretchH="all" />
                        </TabPane>
                        <TabPane tab="Total" key="2">

                        </TabPane>
                        <TabPane tab="Women" key="3">

                        </TabPane>
                        <TabPane tab="Brand Groups" key="4">

                        </TabPane>
                    </Tabs>
                </div>

            </div>

        );
    }
}
