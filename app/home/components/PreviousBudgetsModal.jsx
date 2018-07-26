import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Link } from 'react-router';
import { ROUTE_BUDGET } from '../../Routes';

export default class PreviousBudgetsModal extends Component {
    static propTypes = {
        budgets: PropTypes.array.isRequired,
    };

    state = {
        isModalActive: false,
    };

    closeModal = () => {
        this.setState({
            isModalActive: false,
        });
    };

    showModal = () => {
        this.setState({
            isModalActive: true,
        });
    };

    createModalContent = () => {
        const budgetList = this.props.budgets.map(budget =>
            <li key={budget.id}>
                <h4>
                    <Link id={`${budget.season}-${budget.year}`} to={`${ROUTE_BUDGET}/${budget.season}${budget.year}/${budget.id}/top-down/total`}>
                        {budget.season}{budget.year}
                    </Link>
                </h4>
            </li>,
        );

        return (
            <ul className="budgetList">
                { budgetList }
            </ul>
        );
    };

    render() {
        return (
            <span>
                <Modal
                    title={i18n.t('previousBudgetsModal.title')}
                    visible={this.state.isModalActive}
                    footer={null}
                    onCancel={this.closeModal}>
                    {this.createModalContent()}
                </Modal>
                <h4 className="budgetListLink">
                    <Link onClick={this.showModal}>{i18n.t('previousBudgetsModal.title')}</Link>
                </h4>
            </span>
        );
    }
}

