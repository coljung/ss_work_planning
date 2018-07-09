import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import SectionContainer from '../SectionContainer';
import commonCellValueRenderer from './CommonCellRenderer';
import execCellValueRenderer from './ExecCellRenderer';

// Sub Component
const TabPane = Tabs.TabPane;

export const TAB_EXEC_RECAP = 'exec';
export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';

export default class TopDownSection extends Component {
    constructor(props) {
        super(props);

        const { activeKey } = this.props;

        this.state = {
            activeTab: activeKey || TAB_EXEC_RECAP,
            [TAB_EXEC_RECAP]: false,
            [TAB_TOTAL]: false,
            [TAB_WOMEN]: false,
            [TAB_MEN]: false,
        };

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tab !== this.props.tab) {
            const currentKey = this.state.activeTab;

            this.setState({
                [currentKey]: false,
                activeTab: nextProps.tab,
                [nextProps.tab]: true,
            });

            // this.props.changeTab(nextProps.tab);
        }
    }

    handleTabChange(newTabKey) {
        // set true to load tabbed component
        const { activeKey } = this.props;

        this.setState({
            [activeKey]: false,
            activeTab: newTabKey,
            [newTabKey]: true,
        });
        this.props.changeTab(newTabKey);
    }

    render() {
        const { budget, version, data } = this.props;
        const { activeTab } = this.state;
        return (
            <Tabs activeKey={activeTab} onChange={this.handleTabChange} animated={false}>
                <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
                    {(activeTab === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
                        <SectionContainer
                            budget={budget}
                            version={version}
                            data={data}
                            cellRenderer={execCellValueRenderer}
                            key={TAB_EXEC_RECAP}
                            view={TAB_EXEC_RECAP}
                        />
                    }
                </TabPane>
                <TabPane tab="Total" key={TAB_TOTAL}>
                    {(activeTab === TAB_TOTAL) &&
                        <SectionContainer
                            budget={budget}
                            version={version}
                            data={data}
                            cellRenderer={commonCellValueRenderer}
                            key={TAB_TOTAL}
                            view={TAB_TOTAL}
                        />
                    }
                </TabPane>
                <TabPane tab="Women" key={TAB_WOMEN}>
                    {(activeTab === TAB_WOMEN) &&
                        <SectionContainer
                            budget={budget}
                            version={version}
                            data={data}
                            cellRenderer={commonCellValueRenderer}
                            key={TAB_WOMEN}
                            view={TAB_WOMEN}
                        />
                    }
                </TabPane>
                <TabPane tab="Men" key={TAB_MEN}>
                    {(activeTab === TAB_MEN) &&
                        <SectionContainer
                            budget={budget}
                            version={version}
                            data={data}
                            cellRenderer={commonCellValueRenderer}
                            key={TAB_MEN}
                            view={TAB_MEN}
                        />
                    }
                </TabPane>
            </Tabs>
        );
    }
}

TopDownSection.propTypes = {
    activeKey: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    tab: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    changeTab: PropTypes.func.isRequired,
};
