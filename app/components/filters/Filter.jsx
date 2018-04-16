import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Spin, Checkbox, Row, Col  } from 'antd';
import { resetState } from "../../budgets/BudgetActions";

const CheckboxGroup = Checkbox.Group;

export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            season: '',
            metric: '',
        };
    }

    componentWillReceiveProps(props) {
        if (props.visible && !props.seasonsFetched) {
        }
    }

    onChange = (e) => {
        this.setState({
            createNewValue: e.target.value,
        });
    }
    
    filterView = () => {
        const filter = {
            year: this.state.year,
            season: this.state.season,
            data: this.state.metric,
        };
        this.props.setFilter(filter);
        this.closeModal();
    }

    closeModal = () => {
        this.props.resetState();
        this.props.onOverlayClick();
    }

    createModalContent = () => {
        const { seasons } = this.props;

        const hardCodedContent = (
            <div>
                <h1>hey</h1>
                <p>the seasons will be here</p>
            </div>
        );
    }

    render() {
        console.log(this);
        const footerButtons = (<div>
            <Button
                onClick={this.filterView.bind(this)}
                type='primary'
                size='large'
                id='filterButton' >Set Filters
            </Button>
            <Button
                onClick={this.closeModal}
                size='large'
                id='filterButton' >Cancel
            </Button>
        </div>);

        // const modalContent = this.createModalContent;
        
        const filterMetrics = [
            {label: 'sales', value: 'sales'},
            {label: 'cogs', value: 'cogs'},
            {label: 'gm$', value: 'gm$'},
            {label: 'gm%', value: 'gm%'},
        ];

        const filterSeasons = [
            {label: 'ss19', value: 'ss19'},
            {label: 'ss18', value: 'ss18'},
            {label: 'ss17', value: 'ss17'},
            {label: 'ss16', value: 'ss16'},
        ];
        const filterOptions = [
            {label: 'WP', value: 'WP'},
            {label: 'OP', value: 'OP'},
            {label: 'ACT', value: 'ACT'},
            {label: 'PRJ', value: 'PRJ'},
        ];

        const metrics = { 'sales': true, 'cogs': false };
        const seasons = { 'sales': { 'ss19': true, 'ss18': true, 'ss17': true, 'ss16': true, 'ss15': true }, 'cogs': { 'ss19': true, 'ss18': false, 'ss17': true, 'ss16': true, 'ss15': true } };
        const options = { 'ss19': { 'WP': true, 'OP': false } };

        console.log(seasons.cogs.ss18);


        const modalContent = <Row>
            <Col span={8}>
              <h2>Metrics</h2>
              {/* <CheckboxGroup options={filterMetrics} defaultValue={["metric1"]} /> */}
              <ul>
              </ul>
            </Col>
            <Col span={8}>
              <h2>Seasons</h2>
              <CheckboxGroup options={filterSeasons} defaultValue={["season2"]} />
            </Col>
            <Col span={8}>
              <h2>Row</h2>
              <CheckboxGroup options={filterOptions} defaultValue={["row3"]} />
            </Col>
          </Row>;

        <Spin size="large" />;

        return (
            <Modal
                title="Filter"
                visible={this.props.visible}
                onOk={this.handleOk}
                width={400}
                onCancel={this.closeModal}
                footer={footerButtons}>
                {modalContent}
            </Modal>
        );
    }
}

Filter.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired,
    seasonsFetched: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { BudgetReducer } = state;
    return {
        seasons: BudgetReducer.seasons,
        seasonsFetched: BudgetReducer.seasonsFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
