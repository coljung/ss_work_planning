import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Popover } from 'antd';

import { ROUTE_BUDGET } from '../Routes';

const viewsTop = [
    { name: 'Executive Recap', url: 'exec' },
    { name: 'OTB Total', url: 'total' },
    { name: 'OTB Women', url: 'women' },
    { name: 'OTB Men', url: 'men' },
];
const viewsMiddle = [
    { name: 'Brand Group Targets Women', url: 'bg-women' },
    { name: 'Brand Group Targets Men', url: 'bg-men' },
    { name: 'Department Targets Women', url: 'department' },
    { name: 'Department Targets Men', url: 'department2' },
    { name: 'Width and Depth Targets', url: 'width-depth' },
];
const viewsBottom = [
    { name: 'Delivery', url: 'delivery' },
    { name: 'Unit', url: 'unit' },
    { name: 'Department', url: 'department3' },
    { name: 'Department', url: 'department4' },
    { name: 'Sales Margin', url: 'sales-margin' },
    { name: 'Shrink Planning', url: 'shrink-planning' },
];

const PopoverbudgetLink = ({ budgetId, seasonName, versionId, versionName }) => {
    const text = <span>{seasonName} views</span>;

    const displayLinkFunction = link =>
        <li key={`${seasonName}-${link.index}-${link.url}`}>
            <Link id={`${seasonName}-${link.index}-${link.url}`}
                  to={`${ROUTE_BUDGET}/${seasonName}/budget/${budgetId}/version/${versionName}/${versionId}/${link.url}`}>
                {link.name}
            </Link>
        </li>;

    const top = viewsTop.map(displayLinkFunction);
    const middle = viewsMiddle.map(displayLinkFunction);
    const bottom = viewsBottom.map(displayLinkFunction);

    const content = (
      <ul className='popover-main-ul'>
          <li>
              <h4>Top Down</h4>
              <ul>{top}</ul>
          </li>
          <li>
              <h4>Middle Out Summary</h4>
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
