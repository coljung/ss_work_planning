import i18n from 'i18next';
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { TAB_MEN, TAB_TOTAL, TAB_WOMEN } from '../../../constants/views';

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
