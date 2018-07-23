import React from 'react';
import PropTypes from 'prop-types';

const Board = props => (
      <div className='board'>
          <h2>{props.title}</h2>
          {props.children}
      </div>
);

Board.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
};

export default Board;
