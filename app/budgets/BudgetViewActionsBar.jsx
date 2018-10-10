import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { Button } from 'antd';
import { Link } from 'react-router';

const BudgetViewActionsBar = (props) => {
    const undoDisabled = props.viewHistory && !props.isLoading ? props.viewHistory.past.length <= 0 : true;
    const redoDisabled = props.viewHistory && !props.isLoading ? props.viewHistory.future.length <= 0 : true;
    const style = props.style || {};
    return (
        <div className="budgetBtns" style={style}>
            <Link to={props.onBack}>
                <Button title={i18n.t('budgetView.backButton')} icon="arrow-left" />
            </Link>

            {props.children}

            <Button title={i18n.t('budgetView.undoButton')} onClick={props.onUndo} icon="left" disabled={undoDisabled} />
            <Button title={i18n.t('budgetView.redoButton')} onClick={props.onRedo} icon="right" disabled={redoDisabled} />
            <Button title={i18n.t('budgetView.exportButton')} onClick={props.onExport} icon="export" disabled={props.isLoading} />
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
    style: PropTypes.object,
};

export default BudgetViewActionsBar;
