import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Tabs } from 'antd';
import { Link } from 'react-router';
import ExecViewContainer from './ExecViewContainer';
import { ROUTE_DASHBOARD } from '../Routes';

const TabPane = Tabs.TabPane;

export const TAB_EXEC_RECAP = 'exec';
export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';
export const TAB_BRAND_GROUPS = 'brand-groups';


export default class BudgetViewsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.params.tab || TAB_EXEC_RECAP,
        };
    }

    onTabChange(newTabKey) {
        this.setState({ activeTab: newTabKey });
    }

    render() {
        console.log(this.props.params);
        return (
            <div>
                <div className="budgetHeader">

                    <Row>
                        <Col xs={12}>
                            <h2>SS18 Budget - V1</h2>
                            <h3>Top Down</h3>
                        </Col>
                        <Col xs={12}>
                            <Button type="primary" size="large">
                                <Link to={ROUTE_DASHBOARD} >
                                    Back to Dashboard
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <Tabs defaultActiveKey={this.state.activeTab} onChange={this.onTabChange.bind(this)}>
                        <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>

                                <ExecViewContainer />
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {console.log('ddddd')}
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>

                                {console.log('ddddd')}
                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>

                                {console.log('ddddd')}
                        </TabPane>
                        <TabPane tab="Brand Groups" key={TAB_BRAND_GROUPS}>

                                {console.log('ddddd')}
                        </TabPane>
                    </Tabs>
                </div>

            </div>

        );
    }
}


BudgetViewsContainer.propTypes = {
    params: PropTypes.object.isRequired,
};
