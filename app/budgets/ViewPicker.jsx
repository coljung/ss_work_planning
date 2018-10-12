import i18n from 'i18next';
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Menu } from 'antd';
import { TAB_MEN, TAB_TOTAL, TAB_WOMEN } from '../constants/views';

const ViewPicker = props => (
    <Menu
        onClick={props.onTabChange}
        selectedKeys={[props.tab]}
        mode="horizontal"
    >
        <Menu.Item key="avatar" disabled style={{ cursor: 'initial' }}>
            <Avatar className="seasonAvatar" size={45}>{ props.seasonLabel }</Avatar>
        </Menu.Item>
        <Menu.Item key={TAB_TOTAL}>{i18n.t('budgetView.totalTab')}</Menu.Item>
        <Menu.Item key={TAB_WOMEN}>{i18n.t('budgetView.womenTab')}</Menu.Item>
        <Menu.Item key={TAB_MEN}>{i18n.t('budgetView.menTab')}</Menu.Item>
    </Menu>
);

ViewPicker.propTypes = {
    tab: PropTypes.string.isRequired,
    seasonLabel: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
};

export default ViewPicker;
