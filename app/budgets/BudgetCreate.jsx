import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Select, Spin } from 'antd';
import { createBudget, fetchSeasons } from './BudgetActions';

const Option = Select.Option;

class BudgetCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            season: '',
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            seasons: props.seasons,
        });

        if (props.visible && !props.seasonsFetched) {
            this.props.fetchSeasons();
        }
    }

    handleChange = (value) => {
        const splitValue = value.split('-');
        this.setState({
            year: splitValue[1],
            season: splitValue[0],
        });
    }

    saveNewBudget = () => {
        const budget = {
            year: this.state.year,
            season: this.state.season,
        };
        this.props.createBudget(budget);
        this.props.onOverlayClick();
    }

    createDropdown = () => {
        const buildSelect = this.state.seasons.map(s =>
            <Option key={s.name} value={`${s.season}-${s.year}`}>{s.name}</Option>,
        );
        return (
            <Select placeholder="Select a Season" style={{ width: 120 }} onChange={this.handleChange}>
                {buildSelect}
            </Select>
        );
    }

    render() {
        // this.props.budgetCreated;
        const footerButtons = (<div>
            <Button
                onClick={this.saveNewBudget.bind(this)}
                type='primary'
                size='large'
                id='createButtonSave' >Create Budget
            </Button>
            <Button
                onClick={this.props.onOverlayClick}
                size='large'
                id='createButtonSave' >Cancel
            </Button>
        </div>);

        const mySelect = this.props.seasonsFetched ? this.createDropdown() : <Spin size="large" />;

        return (
            <Modal
                title="Create Budget"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onOverlayClick}
                footer={footerButtons}>

                {mySelect}
            </Modal>
        );
    }
}

BudgetCreate.propTypes = {
    seasons: PropTypes.array.isRequired,
    seasonsFetched: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    fetchSeasons: PropTypes.func.isRequired,
    createBudget: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { BudgetReducer } = state;
    return {
        seasons: BudgetReducer.seasons,
        seasonsFetched: BudgetReducer.seasonsFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchSeasons, createBudget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCreate);
