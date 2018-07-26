import i18n from 'i18next';
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

export const TAB_TOTAL = 'total';
export const TAB_WOMEN = 'women';
export const TAB_MEN = 'men';

const ViewPicker = props => (
    <Tabs activeKey={props.tab} onChange={props.onTabChange} animated={false}>
        <Tabs.TabPane tab={i18n.t('budgetView.totalTab')} key={TAB_TOTAL} />
        <Tabs.TabPane tab={i18n.t('budgetView.womenTab')} key={TAB_WOMEN} />
        <Tabs.TabPane tab={i18n.t('budgetView.menTab')} key={TAB_MEN} />
    </Tabs>
);

ViewPicker.propTypes = {
    tab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
};

export default ViewPicker;
