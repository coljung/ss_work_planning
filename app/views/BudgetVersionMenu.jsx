import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const BudgetVersionMenu = ({ handleClick, versions, currentSeason }) =>
    <Menu onClick={handleClick}>
        { versions && versions.map(
            version =>
                <Menu.Item key={version.id} version={ version }>{ currentSeason } - { version.name }</Menu.Item>,
        ) }
    </Menu>
;

BudgetVersionMenu.propTypes = {
    versions: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentSeason: PropTypes.string,
    handleClick: PropTypes.func,
};

export default BudgetVersionMenu;
