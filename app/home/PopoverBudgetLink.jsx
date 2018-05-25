import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Popover } from 'antd';

import { ROUTE_BUDGET } from '../Routes';

const viewsTop = [
    { name: 'Executive Recap', url: 'exec', section: 'top-down' },
    { name: 'OTB Total', url: 'total', section: 'top-down' },
    { name: 'OTB Women', url: 'women', section: 'top-down' },
    { name: 'OTB Men', url: 'men', section: 'top-down' },
];
const viewsMiddle = [
    { name: 'Brand Group Targets Women', url: 'bg-women', section: 'middle-out' },
    { name: 'Brand Group Targets Men', url: 'bg-men', section: 'middle-out' },
    { name: 'Department Targets Women', url: 'department', section: 'middle-out' },
    { name: 'Department Targets Men', url: 'department2', section: 'middle-out' },
    { name: 'Width and Depth Targets', url: 'width-depth', section: 'middle-out' },
];
const viewsBottom = [
    { name: 'Delivery', url: 'delivery', section: 'bottom-up' },
    { name: 'Unit', url: 'unit', section: 'bottom-up' },
    { name: 'Department', url: 'department3', section: 'bottom-up' },
    { name: 'Department', url: 'department4', section: 'bottom-up' },
    { name: 'Sales Margin', url: 'sales-margin', section: 'bottom-up' },
    { name: 'Shrink Planning', url: 'shrink-planning', section: 'bottom-up' },
];

const PopoverbudgetLink = ({ budgetId, seasonName, versionId, versionName }) => {
    const text = <span>{seasonName} views</span>;

    const displayLinkFunction = (link, index) =>
        <li key={`${seasonName}-${index}-${link.url}`}>
            <Link id={`${seasonName}-${index}-${link.url}`}
                  to={`${ROUTE_BUDGET}/${seasonName}/${budgetId}/version/${versionName}/${versionId}/${link.section}/${link.url}`}>
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
