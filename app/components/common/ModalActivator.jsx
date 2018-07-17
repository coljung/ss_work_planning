import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const ModalActivator = (label, showModal) => (
    <Button icon="switcher" onClick={showModal}>{label}</Button>
);

ModalActivator.propTypes = {
    label: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
};

export default ModalActivator;
