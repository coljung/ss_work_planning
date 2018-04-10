import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, List, Checkbox, Row, Col } from 'antd';
import { resetState } from '../../budgets/BudgetActions';

const CheckboxGroup = Checkbox.Group;

const initialData = [
    {
        metrics: {
            sales: true,
            cogs: false,
            gm_percentage: true,
            gm_dollar: false,
        },
        seasons: {
            sales: {
                ss19: true,
                ss18: true,
                ss16: true,
                ss15: true,
                ss14: true,
            },
            cogs: {
                ss19: true,
                ss18: true,
                ss16: true,
                ss15: true,
                ss14: true,
            },
            gm_percentage: {
                ss19: true,
                ss18: true,
                ss16: true,
                ss15: true,
                ss14: true,
            },
            gm_dollar: {
                ss19: true,
                ss18: true,
                ss16: true,
                ss15: true,
                ss14: true,
            },
        },
        options: {
            sales: {
                ss19: {
                    WP: true,
                    OP: true,
                    ACT: true,
                    PRJ: true,
                },
                ss18: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss16: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss15: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss14: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
            },
            cogs: {
                ss19: {
                    WP: true,
                    OP: true,
                    ACT: true,
                    PRJ: true,
                },
                ss18: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss16: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss15: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss14: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
            },
            gm_percentage: {
                ss19: {
                    WP: true,
                    OP: true,
                    ACT: true,
                    PRJ: true,
                },
                ss18: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss16: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss15: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss14: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
            },
            gm_dollar: {
                ss19: {
                    WP: true,
                    OP: true,
                    ACT: true,
                    PRJ: true,
                },
                ss18: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss16: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss15: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
                ss14: {
                    WP: true,
                    OP: false,
                    ACT: false,
                    PRJ: false,
                },
            },
        },
    },
];

export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            season: '',
            metric: '',
            dataMetrics: initialData[0].metrics,
            dataSeason: initialData[0].seasons,
            dataOptions: initialData[0].options,
        };
    }

    componentWillReceiveProps(props) {
        if (props.visible && !props.seasonsFetched) {}
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

    onChange = (checkedValues) => {
        // console.log('checked = ', checkedValues);
    }

    viewNext = () => {

    }

    render() {
        // console.log(this.state.dataMetrics);
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
            { label: 'sales', value: 'sales' },
            { label: 'cogs', value: 'cogs' },
            { label: 'gm$', value: 'gm_dollar' },
            { label: 'gm%', value: 'gm_percentage' },
        ];

        const filterSeasons = [
            { label: 'ss19', value: 'ss19' },
            { label: 'ss18', value: 'ss18' },
            { label: 'ss17', value: 'ss17' },
            { label: 'ss16', value: 'ss16' },
        ];
        const filterOptions = [
            { label: 'WP', value: 'WP' },
            { label: 'OP', value: 'OP' },
            { label: 'ACT', value: 'ACT' },
            { label: 'PRJ', value: 'PRJ' },
        ];

        const displayLinkFunctionMetrics = (test) => {
            // console.log(this.state.dataMetrics);
            // console.log(test.value);
            // console.log(typeof this.state.dataMetrics['sales']);
            // console.log(typeof this.state.dataMetrics[test.value]);
            return (<div>
                <Checkbox value={test.value} defaultChecked={true}>{test.label}</Checkbox>
                <Button onClick={this.viewNext}>view</Button>
            </div>);
        };

        const displayLinkFunction = test =>
            <div>
                <Checkbox value={test.value}>{test.label}</Checkbox>
                <Button onClick={this.viewNext}>view</Button>
            </div>;

        const metrics = filterMetrics.map(displayLinkFunctionMetrics);
        const seasons = filterSeasons.map(displayLinkFunction);
        const options = filterOptions.map(displayLinkFunction);
        //debugger;


        const modalContent = (
            <div>
                <Row>
                    <Col span={8}>
                        <CheckboxGroup defaultValue={['sales']} style={{ width: '100%' }} onChange={this.onChange}>
                            <List
                                size="small"
                                header={null}
                                footer={null}
                                bordered
                                dataSource={metrics}
                                renderItem={item => (<List.Item>{item}</List.Item>)}
                                />
                        </CheckboxGroup>
                    </Col>
                    <Col span={8}>
                        <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange}>
                            <List
                                size="small"
                                header={null}
                                footer={null}
                                bordered
                                dataSource={seasons}
                                renderItem={item => (<List.Item>{item}</List.Item>)}
                                />
                        </CheckboxGroup>
                    </Col>
                    <Col span={8}>
                        <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange}>
                            <List
                                size="small"
                                header={null}
                                footer={null}
                                bordered
                                dataSource={options}
                                renderItem={item => (<List.Item>{item}</List.Item>)}
                                />
                        </CheckboxGroup>
                    </Col>
                </Row>
            </div>

        );

        return (
            <Modal
                title='Filter'
                visible={true}
                onOk={this.handleOk}
                width={600}
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
