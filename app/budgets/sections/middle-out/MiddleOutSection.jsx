import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import SectionContainer from '../SectionContainer';

// Sub Component
const TabPane = Tabs.TabPane;

export const TAB_BG_WOMEN = 'bg-women';
export const TAB_BG_MEN = 'bg-men';

export default class MiddleOutSection extends Component {
    constructor(props) {
        super(props);

        const { activeKey } = this.props;

        this.state = {
            activeTab: activeKey || TAB_BG_WOMEN,
            [TAB_BG_WOMEN]: false,
            [TAB_BG_MEN]: false,
        };

        this.handleTabChange = this.handleTabChange.bind(this);
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
        const { budget, version } = this.props;
        const { activeTab } = this.state;
        return (
            <Tabs activeKey={activeTab} onChange={this.handleTabChange} animated={false}>
                <TabPane tab="Brand Groups Women" key={TAB_BG_WOMEN}>
                    {(activeTab === TAB_BG_WOMEN || this.state[TAB_BG_WOMEN]) &&
                        <SectionContainer
                            budget={budget}
                            version={version}
                            key={TAB_BG_WOMEN}
                            view={TAB_BG_WOMEN}
                        />
                    }
                </TabPane>
                <TabPane tab="Brand Groups Men" key={TAB_BG_MEN}>
                    {(activeTab === TAB_BG_MEN) &&
                        <SectionContainer
                            budget={budget}
                            version={version}
                            key={TAB_BG_MEN}
                            view={TAB_BG_MEN}
                        />
                    }
                </TabPane>
            </Tabs>
        );
    }
}

MiddleOutSection.propTypes = {
    activeKey: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    changeTab: PropTypes.func.isRequired,
};
