import React from 'react';
import PropTypes from 'prop-types';

const BudgetVersionMenu = ({ currentSeason, currentVersion }) => (
     <div>
            <h3> {currentSeason} - {currentVersion} </h3>
     </div>
);

BudgetVersionMenu.propTypes = {
    currentSeason: PropTypes.string,
    currentVersion: PropTypes.string,
};

export default BudgetVersionMenu;
