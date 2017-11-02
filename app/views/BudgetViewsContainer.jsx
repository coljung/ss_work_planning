import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Tabs } from 'antd';
import { Link } from 'react-router';
import ExecViewContainer from 'top_down/exec/ExecViewContainer';
import TotalViewContainer from 'top_down/total/TotalViewContainer';
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
            [TAB_EXEC_RECAP]: true,
            [TAB_TOTAL]: false,
            [TAB_WOMEN]: false,
            [TAB_MEN]: false,
            [TAB_BRAND_GROUPS]: false,
        };
        // this.updateActiveComponent();
    }

    // componentDidUpdate(_, previousState) {
    //     console.log(previousState); // => {}
    //     console.log(this.state);    // => { name: "Michael" }
    // }

    componentDidMount() {
        console.log(this.props);
    }

    // updateActiveComponent = () => {
    //     // set active tab content on load
    //     const currentKey = this.state.activeTab;
    //     console.log('-----------', currentKey);
    //     this.setState({
    //         [currentKey]: true,
    //     });
    // }


    onTabChange(newTabKey) {
        // set true to load tabbed component
        const currentKey = this.state.activeTab;
        this.setState({
            [currentKey]: false,
            activeTab: newTabKey,
            [newTabKey]: true,
        });
    }

    render() {
        const currentKey = this.state.activeTab;
        // console.log(this.state);
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
                            {this.state[TAB_EXEC_RECAP] && <ExecViewContainer /> }
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {this.state[TAB_TOTAL] && <TotalViewContainer /> }
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>

                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>

                        </TabPane>
                        <TabPane tab="Brand Groups" key={TAB_BRAND_GROUPS}>

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
