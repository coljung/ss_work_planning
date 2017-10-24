import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Select } from 'antd';

const Option = Select.Option;

export default class BudgetCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            season: '',
        };
    }

    handleChange = (value) => {
        const splitValue = value.split('-');
        this.setState({
            year: splitValue[1],
            season: splitValue[0],
        });
    }

    createBudget = () => {

    }

    render() {
        const footerButtons = (<div>
            <Button
                onClick={this.createBudget.bind(this)}
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


        return (
            <Modal
                title="Create Budget"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onOverlayClick}
                footer={footerButtons}>

                <Select defaultValue="SS17" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="SS-2017">SS17</Option>
                    <Option value="FW-2017">FW17</Option>
                    <Option value="SS-2018">SS18</Option>
                    <Option value="FW-2018">FW18</Option>
                    <Option value="SS-2019">SS19</Option>
                    <Option value="FW-2019">FW19</Option>
                </Select>
            </Modal>
        );
    }
}

BudgetCreate.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
};
