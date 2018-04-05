import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Popover } from 'antd';

import { ROUTE_BUDGET } from '../Routes';

const viewsTop = ['exec', 'total', 'women', 'men'];
const viewsMiddle = ['bg-women', 'bg-men', 'department', 'width-depth'];
const viewsBottom = ['delivery', 'unit', 'department', 'sales-margin', 'shrink-planning'];

const PopoverbudgetLink = ({ budgetId, seasonName, versionId, versionName }) => {
    const text = <span>{seasonName} views</span>;

    const top = viewsTop.map((url, index) =>
        <li key={`${seasonName}-${index}-${url}`}>
            <Link id={`${seasonName}-${index}-${url}`}
                to={`${ROUTE_BUDGET}/${seasonName}/budget/${budgetId}/version/${versionName}/${versionId}/${url}`}>
                {url}
            </Link>
        </li>,
    );

    const middle = viewsMiddle.map((url, index) =>
        <li key={`${seasonName}-${index}-${url}`}>
            <Link id={`${seasonName}-${index}-${url}`}
                to={`${ROUTE_BUDGET}/${seasonName}/budget/${budgetId}/version/${versionName}/${versionId}/${url}`}>
                {url}
            </Link>
        </li>,
    );

    const bottom = viewsBottom.map((url, index) =>
        <li key={`${seasonName}-${index}-${url}`}>
            <Link id={`${seasonName}-${index}-${url}`}
                to={`${ROUTE_BUDGET}/${seasonName}/budget/${budgetId}/version/${versionName}/${versionId}/${url}`}>
                {url}
            </Link>
        </li>,
    );

    const content = (
      <ul className='popover-main-ul'>
          <li>
              <h4>Top</h4>
              <ul>{top}</ul>
          </li>
          <li>
              <h4>Middle Out</h4>
              <ul>{middle}</ul>
          </li>
          <li>
              <h4>Bottom Up</h4>
              <ul>{bottom}</ul>
          </li>
      </ul>
    );

    return (
        <Popover placement="right" title={text} content={content} trigger="click">
            {seasonName}
        </Popover>
    );
};

PopoverbudgetLink.propTypes = {
    budgetId: PropTypes.string,
    seasonName: PropTypes.string,
    versionId: PropTypes.string,
    versionName: PropTypes.string,
};

export default PopoverbudgetLink;
