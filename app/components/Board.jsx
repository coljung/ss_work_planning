import React from 'react';
import PropTypes from 'prop-types';

const Board = ({ btnInTitle, title, id, children }) => {
  let boardTitle = null;
  if (btnInTitle) {
      boardTitle =
          <div className='clearfix titleWithButton'>
              <h2>{title}</h2>
              {btnInTitle}
          </div>;
  } else {
      boardTitle = <h2>{title}</h2>;
  }

  return (
      <div className='board' id={id || 'board'}>
          {boardTitle}
          {children}
      </div>
  );
}

Board.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
    id: PropTypes.string,
    btnInTitle: PropTypes.element,
};

Board.defaultProps = {
    btnInTitle: null,
    id: '',
};

export default Board;
