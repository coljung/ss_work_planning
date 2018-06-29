import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ text, classUsed = 'spinDiv' }) => {
    const loadingText = text || 'Loading...';

    return (
        <div className={classUsed}>
            <Spin size="large" style={{ fontSize: 20, color: '#777' }} tip={loadingText}/>
        </div>
    );
};

LoadingSpinner.propTypes = {
    text: PropTypes.string,
    classUsed: PropTypes.string,
};

export default LoadingSpinner;
