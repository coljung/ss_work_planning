import i18n from 'i18next';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Select, Radio } from 'antd';
import { createBudget, fetchAvailableSeasons, resetState } from './BudgetActions';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Option = Select.Option;
const RadioGroup = Radio.Group;

export class BudgetCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            season: '',
            createNewValue: 'lastyear',
        };
    }

    componentWillReceiveProps(props) {
        if (props.visible && !props.seasonsFetched) {
            this.props.fetchAvailableSeasons();
        }
    }

    handleSeasonChange = (value) => {
        const splitValue = value.split('-');
        this.setState({
            year: splitValue[1],
            season: splitValue[0],
        });
    };

    onChange = (e) => {
        this.setState({
            createNewValue: e.target.value,
        });
    };

    saveNewBudget = () => {
        const budget = {
            year: this.state.year,
            season: this.state.season,
            // data: this.state.createNewValue,
        };
        this.props.createBudget(budget);
        this.closeModal();
    };

    closeModal = () => {
        this.props.resetState();
        this.props.onOverlayClick();
    };

    createModalContent = () => {
        const { seasons } = this.props;

        const buildSelect = (seasons || []).map(s =>
            <Option key={s.name} value={`${s.season}-${s.year}`}>{s.name}</Option>,
        );

        const useData = (
            <RadioGroup name="radiogroup"
                        className="radioNew"
                        onChange={this.onChange}
                        value={this.state.createNewValue}>
                <Radio selected value='lastyear'>{i18n.t('createBudgetModal.useLastYearData')}</Radio>
            </RadioGroup>
        );

        return (
            <div>
                <Select placeholder={i18n.t('createBudgetModal.selectSeason')}
                        notFoundContent={i18n.t('createBudgetModal.noSeason')}
                        style={{ width: 180 }}
                        className="dropdownNew"
                        onChange={this.handleSeasonChange}>
                    {buildSelect}
                </Select>
                <br />
                {useData}
            </div>
        );
    };

    render() {
        const footerButtons = (
            <div>
                <Button
                    onClick={this.saveNewBudget.bind(this)}
                    type='primary'
                    id='createButtonSave' >{i18n.t('createBudgetModal.saveButton')}
                </Button>
                <Button
                    onClick={this.closeModal}>{i18n.t('createBudgetModal.cancelButton')}
                </Button>
            </div>);

        const modal = (
            <Modal
                title={i18n.t('createBudgetModal.title')}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                footer={footerButtons}>
                {this.createModalContent()}
            </Modal>
        );
        const createBudgetContent = this.props.budgetCreateFetched ? modal : <LoadingSpinner classUsed='loadingOverlay' text={i18n.t('createBudgetModal.spinner')}/>;
        return (createBudgetContent);
    }
}

BudgetCreate.propTypes = {
    seasons: PropTypes.array.isRequired,
    seasonsFetched: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    fetchAvailableSeasons: PropTypes.func.isRequired,
    createBudget: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    budgetCreateFetched: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const { BudgetReducer } = state;
    return {
        seasons: BudgetReducer.seasons,
        seasonsFetched: BudgetReducer.seasonsFetched,
        budgetCreateFetched: BudgetReducer.budgetCreateFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAvailableSeasons, createBudget, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCreate);
