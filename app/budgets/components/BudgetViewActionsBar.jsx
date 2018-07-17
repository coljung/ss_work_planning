import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { Button } from 'antd';
import { Link } from 'react-router';

const BudgetViewActionsBar = ({ viewHistory, isLoading, onBack, onUndo, onRedo, onExport, children }) => {
    const undoDisabled = viewHistory && !isLoading ? viewHistory.past.length <= 0 : true;
    const redoDisabled = viewHistory && !isLoading ? viewHistory.future.length <= 0 : true;

    return (
        <div className="budgetBtns">
            <Link to={onBack}>
                <Button icon="arrow-left">{i18n.t('budgetView.backButton')}</Button>
            </Link>

            {children}

            <Button onClick={onUndo} icon="left" disabled={undoDisabled}>{i18n.t('budgetView.undoButton')}</Button>
            <Button onClick={onRedo} icon="right" disabled={redoDisabled}>{i18n.t('budgetView.redoButton')}</Button>
            <Button onClick={onExport} icon="export" disabled={isLoading}>{i18n.t('budgetView.exportButton')}</Button>
        </div>
    );
};

BudgetViewActionsBar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
    onBack: PropTypes.string.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    viewHistory: PropTypes.object,
};

export default BudgetViewActionsBar;
