import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Modal, List, Checkbox, Row, Col } from 'antd';
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
                ss19: false,
                ss18: true,
                ss16: false,
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

const filterLabels = {
    filterMetrics: [
        { label: 'SALES', value: 'sales' },
        { label: 'COGS', value: 'cogs' },
        { label: 'GM$', value: 'gm_dollar' },
        { label: 'GM%', value: 'gm_percentage' },
    ],

    filterSeasons: [
        { label: 'ss19', value: 'ss19' },
        { label: 'ss18', value: 'ss18' },
        { label: 'ss17', value: 'ss17' },
        { label: 'ss16', value: 'ss16' },
    ],
    filterOptions: [
        { label: 'WP', value: 'WP' },
        { label: 'OP', value: 'OP' },
        { label: 'ACT', value: 'ACT' },
        { label: 'PRJ', value: 'PRJ' },
        { label: 'BUDGET', value: 'BUD' },
    ],
};

export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            season: '',
            metric: '',
            dataMetrics: initialData[0].metrics,
            dataSeasons: initialData[0].seasons,
            dataOptions: initialData[0].options,
            defaultValues: this.returnValues(initialData[0].metrics, 0),
        };
    }

    closeModal = () => {
        this.props.resetState();
        this.props.onOverlayClick();
    }

    returnValues = (obj, index, parentArr = ['', '', '']) => {
        const arr = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (value) {
                arr.push(key);
            }
        });
        parentArr[index] = arr;
        return parentArr;
    };

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }

    viewNext = (val, i) => {
        const defaultValues = [...this.state.defaultValues];
        // 2. Make a shallow copy of the item you want to mutate
        let item = { ...defaultValues[i + 1] };
        // 3. Replace the property you're intested in
        const test = this.state.defaultValues;
        debugger;
        item = this.returnValues(i === 0 ? this.state.dataSeasons[val] : this.state.dataOptions[val], i + 1, test);

        // debugger;
        // item = ['ss19', 'ss18'];
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        defaultValues[i + 1] = item[i + 1];
        // debugger;
        // 5. Set the state to our new copy
        this.setState({ defaultValues });
        //
        // this.setState({
        //     arrayvar: [...this.state.arrayvar, newelement]
        // })
    }

    render() {
        const footerButtons = (<div>
            <Button
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

        const displayLinkFunction = (item, index, def) => {
            return (
            <div className={index} >
                <Checkbox value={item.value}>{item.label}</Checkbox>
                <Button
                    className='filterButton'
                    icon='right'
                    shape='circle'
                    onClick={() => this.viewNext(item.value, def)}>
                </Button>
            </div>);
        };

        const buildCheckboxGroup = (column, stateData, defaultIndex) => {
            const data = column.map((item, index, arr) => displayLinkFunction(item, index, defaultIndex));
            // debugger;
            // const data = column.map( elem => {
            //     displayLinkFunction(elem, true)
            // });
            const defaultVal = [];
            // defaultVal[defaultIndex] = returnDefaultValues(stateData);
            // console.log('---------------------- ', data);
            return (
                <CheckboxGroup
                    style={{ width: '100%' }}
                    defaultValue={this.state.defaultValues[defaultIndex] || null}
                    value={this.state.defaultValues[defaultIndex] || null}
                    onChange={this.onChange}>
                    <List
                        size='small'
                        header={<div>Title</div>}
                        footer={null}
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                        />
                </CheckboxGroup>);
        };

        const modalContent = (
            <div>
                <Row type='flex' justify='start' className='filterRow'>
                    <Col span={8} className='filterCol'>
                        {buildCheckboxGroup(filterLabels.filterMetrics, this.state.dataMetrics, 0)}
                    </Col>
                    <Col span={8} className='filterCol'>
                        {buildCheckboxGroup(filterLabels.filterSeasons, this.state.dataSeasons, 1)}
                    </Col>
                    <Col span={8} className='filterCol'>
                        {buildCheckboxGroup(filterLabels.filterOptions, this.state.dataOptions, 2)}
                    </Col>
                </Row>
            </div>

        );

        return (
            <Modal
                title='Filters'
                visible={true}
                className='filterModal'
                onOk={this.handleOk}
                width={800}
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
