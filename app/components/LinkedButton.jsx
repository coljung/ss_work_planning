import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { browserHistory } from 'react-router';

const LinkedButton = (props) => {
  const navigate = (to) => {
      browserHistory.push(to);
  }

  return (
      <Button onClick={navigate.bind(null, props.to)} {...props}>{props.children}</Button>
  );
}

LinkedButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default LinkedButton;
