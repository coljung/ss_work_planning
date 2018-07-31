import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { Button } from 'antd';
import { Link } from 'react-router';

const BudgetViewActionsBar = (props) => {
    const undoDisabled = props.viewHistory && !props.isLoading ? props.viewHistory.past.length <= 0 : true;
    const redoDisabled = props.viewHistory && !props.isLoading ? props.viewHistory.future.length <= 0 : true;

    return (
        <div className="budgetBtns">
            <Link to={props.onBack}>
                <Button icon="arrow-left">{i18n.t('budgetView.backButton')}</Button>
            </Link>

            {props.children}

            <Button onClick={props.onUndo} icon="left" disabled={undoDisabled}>{i18n.t('budgetView.undoButton')}</Button>
            <Button onClick={props.onRedo} icon="right" disabled={redoDisabled}>{i18n.t('budgetView.redoButton')}</Button>
            <Button onClick={props.onExport} icon="export" disabled={props.isLoading}>{i18n.t('budgetView.exportButton')}</Button>
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
