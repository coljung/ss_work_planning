import React from 'react';
import PropTypes from 'prop-types';

export default class Board extends React.Component {
    render() {
        let boardTitle = null;
        if (this.props.btnInTitle) {
            boardTitle = (
                <div className='clearfix titleWithButton'>
                    <h2>{this.props.title}</h2>
                    {this.props.btnInTitle}
                </div>
            );
        } else {
            boardTitle = (<h2>{this.props.title}</h2>);
        }
        return (
            <div className='board' id={this.props.id}>
                {boardTitle}
                {this.props.children}
            </div>
        );
    }
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
