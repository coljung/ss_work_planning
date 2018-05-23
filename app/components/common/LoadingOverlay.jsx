import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const LoadingOverlay = ({ text }) => {
    const loadingText = text || 'Loading...';

    return (
        <div className="loadingOverlay">
            <Spin size="large" style={{ fontSize: 20, color: '#777' }} tip={loadingText}/>
        </div>
    );
};

LoadingOverlay.propTypes = {
    text: PropTypes.string,
};

export default LoadingOverlay;
