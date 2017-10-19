import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from 'antd';

const Option = Select.Option;

export default class BudgetCreate extends Component {

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render() {
        return (
            <Modal
                title="Create Budget"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onOverlayClick}>

                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="ss17">SS17</Option>
                    <Option value="fw17">FW17</Option>
                    <Option value="ss18">SS18</Option>
                    <Option value="fw18">FW18</Option>
                    <Option value="ss19">SS19</Option>
                    <Option value="fw19">FW19</Option>
                </Select>
            </Modal>
        );
    }
}

BudgetCreate.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
};
