import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs } from 'antd';
import { browserHistory } from 'react-router';
import ExecViewContainer from 'top_down/exec/ExecViewContainer';
import TotalViewContainer from 'top_down/total/TotalViewContainer';
import WomenViewContainer from 'top_down/women/WomenViewContainer';
import MenViewContainer from 'top_down/men/MenViewContainer';
import BudgetViewsButtonActions from './BudgetViewsButtonActions';
import { saveNewBudgetVersion } from './BudgetViewActions';
import { ROUTE_BUDGET } from '../Routes';

const TabPane = Tabs.TabPane;

export const TAB_EXEC_RECAP = 'exec';
export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';
export const TAB_BRAND_GROUPS = 'brand-groups';


class BudgetViewsContainer extends Component {

    constructor(props) {
        super(props);

        const { budgetid, id, seasonname, vname, tab } = this.props.params;

        this.state = {
            budgetSeasonId: budgetid,
            versionId: id,
            seasonName: seasonname,
            versionName: vname,
            activeTab: tab || TAB_EXEC_RECAP,
            [TAB_EXEC_RECAP]: false,
            [TAB_TOTAL]: false,
            [TAB_WOMEN]: false,
            [TAB_MEN]: false,
            [TAB_BRAND_GROUPS]: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.props.newVersion, nextProps.newVersion);
        if (nextProps.newVersion === null) {
            return true;
        }
        browserHistory.push(`${ROUTE_BUDGET}/${this.state.seasonName}/budget/${this.state.budgetSeasonId}/version/${nextProps.newVersion.name}/${nextProps.newVersion.id}/${this.state.activeTab}`);
        return false;

        // return nextProps.newVersion === null;
    }

    saveNewVersion = (budget, version) => {
        this.props.saveNewBudgetVersion(budget, version);
    }

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
        // const currentTab = this.props.params.tab === currentKey ? currentKey;
        // console.log('---------', currentTab, currentKey);
        return (
            <div>
                <div className="budgetHeader">

                    <Row>
                        <Col xs={12}>
                            <h2>{this.state.seasonName} Budget - {this.state.versionName}</h2>
                            <h3>Top Down</h3>
                        </Col>
                        <Col xs={12}>
                            <BudgetViewsButtonActions
                                save={() => this.saveNewVersion(this.state.budgetSeasonId, this.state.versionId)} />
                        </Col>
                    </Row>
                </div>
                <div className="budgetBody">
                    <Tabs defaultActiveKey={this.state.activeTab} onChange={this.onTabChange.bind(this)}>
                        <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
                            {(currentKey === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
                                <ExecViewContainer /> }
                        </TabPane>
                        <TabPane tab="Total" key={TAB_TOTAL}>
                            {(currentKey === TAB_TOTAL || this.state[TAB_TOTAL]) &&
                                <TotalViewContainer /> }
                        </TabPane>
                        <TabPane tab="Women" key={TAB_WOMEN}>
                            {(currentKey === TAB_WOMEN || this.state[TAB_WOMEN]) &&
                                <WomenViewContainer /> }
                        </TabPane>
                        <TabPane tab="Men" key={TAB_MEN}>
                            {(currentKey === TAB_MEN || this.state[TAB_MEN]) &&
                                <MenViewContainer /> }
                        </TabPane>
                        <TabPane tab="Brand Groups" key={TAB_BRAND_GROUPS}>
                            {(currentKey === TAB_BRAND_GROUPS || this.state[TAB_BRAND_GROUPS]) &&
                                <TotalViewContainer /> }
                        </TabPane>
                    </Tabs>
                </div>

            </div>

        );
    }
}

BudgetViewsContainer.propTypes = {
    params: PropTypes.object.isRequired,
    newVersion: PropTypes.object,
    saveNewBudgetVersion: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    return {
        newVersion: BudgetViewReducer.newVersion,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ saveNewBudgetVersion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewsContainer);
