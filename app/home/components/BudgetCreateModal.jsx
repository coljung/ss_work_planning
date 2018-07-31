import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Select, Radio, Row } from 'antd';

export default class BudgetCreateModal extends Component {
    static propTypes = {
        seasons: PropTypes.array.isRequired,
        onSave: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        seasons: [],
        disabled: false,
    };

    state = {
        season: undefined,
        year: undefined,
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

    changeSeason = (value) => {
        const splitValue = value.split('-');
        this.setState({
            season: splitValue[0],
            year: splitValue[1],
        });
    };

    handleSave = () => {
        this.props.onSave(this.state.season, this.state.year);

        this.closeModal();
    };

    createModalContent = () => {
        const buildSelect = this.props.seasons.map(s =>
            <Select.Option key={s.name} value={`${s.season}-${s.year}`}>
                {s.name}
            </Select.Option>,
        );

        const useData = (
            <Radio.Group name="radiogroup">
                <Radio checked={true} value='lastyear'>{i18n.t('createBudgetModal.useLastYearData')}</Radio>
            </Radio.Group>
        );

        return (
            <div>
                <Row>
                    <Select placeholder={i18n.t('createBudgetModal.selectSeason')}
                            notFoundContent={i18n.t('createBudgetModal.noSeason')}
                            style={{ width: 180 }}
                            onChange={this.changeSeason}>
                        {buildSelect}
                    </Select>
                </Row>
                <br />
                <Row>
                    {useData}
                </Row>
            </div>
        );
    };

    render() {
        return (
            <span>
                <Modal
                    title={i18n.t('createBudgetModal.title')}
                    visible={this.state.isModalActive}
                    onOk={this.handleSave}
                    okText={i18n.t('createBudgetModal.saveButton')}
                    okButtonProps={{ disabled: !this.state.season }}
                    onCancel={this.closeModal}
                    cancelText={i18n.t('createBudgetModal.cancelButton')}>
                    {this.createModalContent()}
                </Modal>
                <Button icon="file" type="primary" disabled={this.props.disabled} onClick={this.showModal}>{i18n.t('home.createButton')}</Button>
            </span>
        );
    }
}
