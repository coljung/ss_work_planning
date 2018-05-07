import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import PropTypes from 'prop-types';

const BudgetVersionMenu = ({ handleClick, versions, currentSeason, currentVersion }) => {
    const menuBudget = (<Menu onClick={handleClick}>
        { versions && versions.map(
            version =>
                <Menu.Item key={version.id} version={ version }>{ currentSeason } - { version.name }</Menu.Item>,
        ) }
    </Menu>);
    return (
        <div>
            <Dropdown overlay={menuBudget}>
                <h3>
                    <a className="ant-dropdown-link" href="#">
                        {currentSeason} - {currentVersion}<Icon type="down" />
                    </a>
                </h3>
            </Dropdown>
        </div>
    );
};

BudgetVersionMenu.propTypes = {
    versions: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentSeason: PropTypes.string,
    currentVersion: PropTypes.string,
    handleClick: PropTypes.func,
};

export default BudgetVersionMenu;
