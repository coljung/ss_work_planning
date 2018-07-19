import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import SectionContainer from '../SectionContainer';
import commonCellValueRenderer from './CommonCellRenderer';

// Sub Component
const TabPane = Tabs.TabPane;

export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';

export default class TopDownSection extends Component {
    constructor(props) {
        super(props);

        const { activeKey } = this.props;

        this.state = {
            activeTab: activeKey,
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
        const { budget, data } = this.props;
        const { activeTab } = this.state;
        return (
            <Tabs activeKey={activeTab} onChange={this.handleTabChange} animated={false}>
                <TabPane tab={i18n.t('budgetView.totalTab')} key={TAB_TOTAL}>
                    {(activeTab === TAB_TOTAL) &&
                        <SectionContainer
                            budget={budget}
                            data={data}
                            cellRenderer={commonCellValueRenderer}
                            key={TAB_TOTAL}
                            view={TAB_TOTAL}
                        />
                    }
                </TabPane>
                <TabPane tab={i18n.t('budgetView.womenTab')} key={TAB_WOMEN}>
                    {(activeTab === TAB_WOMEN) &&
                        <SectionContainer
                            budget={budget}
                            data={data}
                            cellRenderer={commonCellValueRenderer}
                            key={TAB_WOMEN}
                            view={TAB_WOMEN}
                        />
                    }
                </TabPane>
                <TabPane tab={i18n.t('budgetView.menTab')} key={TAB_MEN}>
                    {(activeTab === TAB_MEN) &&
                        <SectionContainer
                            budget={budget}
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
    changeTab: PropTypes.func.isRequired,
};
