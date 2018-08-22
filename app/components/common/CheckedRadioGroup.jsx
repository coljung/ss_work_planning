import React, { Component } from 'react';
import { Checkbox, Radio } from 'antd';
import PropTypes from 'prop-types';

export default class CheckedRadioGroup extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        selectedOption: PropTypes.number,
        name: PropTypes.string.isRequired,
    };

    state = {
        selectedOption: this.props.selectedOption,
        checked: this.props.checked,
    };

    static defaultProps = {
        checked: false,
        selectedOption: null,
    };

    componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps) {
            this.setState({
                checked: nextProps.checked,
            });
        }

        if ('selectedOption' in nextProps) {
            this.setState({
                selectedOption: nextProps.selectedOption,
            });
        }
    }

    handleRadioSelect = (e) => {
        this.setState({
            selectedOption: e.target.value,
        });

        this.props.onChange(this.props.name, this.state.checked, e.target.value);
    };

    handleCheckBoxSelect = (e) => {
        this.setState({
            checked: e.target.checked,
        });

        this.props.onChange(this.props.name, e.target.checked, this.state.selectedOption);
    };

    render() {
        return (
            <Checkbox onChange={this.handleCheckBoxSelect}
                      checked={this.state.checked}>
                {this.props.text}
                <Radio.Group options={this.props.options}
                             value={this.state.selectedOption}
                             onChange={this.handleRadioSelect}
                             disabled={!this.state.checked} />
            </Checkbox>
        );
    }
}
