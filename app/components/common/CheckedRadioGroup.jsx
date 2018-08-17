import React, { Component } from 'react';
import { Checkbox, Radio } from 'antd';
import PropTypes from 'prop-types';

export default class CheckedRadioGroup extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
    };

    state = {
        selectedOption: 5,
        checked: true,
    };

    handleRadioSelect = (e) => {
        this.setState({ selectedOption: e.target.value, checked: e.target.checked });
        this.props.onChange(this.props.name, e.target.checked, e.target.value);
    };

    handleCheckBoxSelect = (e) => {
        this.setState({ selectedOption: this.state.selectedOption, checked: e.target.checked });
        this.props.onChange(this.props.name, e.target.checked, this.state.selectedOption );
    };

    render() {
        return (
            <Checkbox
                onChange={this.handleCheckBoxSelect}
                checked={this.state.checked}
            >
                {this.props.text}
                <Radio.Group options={this.props.options} value={this.state.selectedOption}
                             onChange={this.handleRadioSelect} > </Radio.Group>
            </Checkbox>
        );
    }
}
