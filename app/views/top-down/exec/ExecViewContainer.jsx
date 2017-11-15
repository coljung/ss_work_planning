import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { fetchBudgetExecData, resetState } from './ExecViewActions';
// import { data } from './test_exec';
import dataTet from './test_exec_tetyana';
import { merge, cellClasses } from './grid-build/index';



// const nested = [
//     [
//         { label: '&nbsp;', colspan: 2, className: 'ffffff' },
//         { label: 'Women + Men', colspan: 3 },
//         { label: 'Women', colspan: 3 },
//         { label: 'Men', colspan: 3 },
//     ],
//     [
//         'Metrics',
//         'Season/Year',
//         { label: 'Before Markdowns', colspan: 1 },
//         { label: 'Inc %', colspan: 1 },
//         { label: 'Full Season', colspan: 1 },
//         { label: 'Before Markdowns', colspan: 1 },
//         { label: 'Inc %', colspan: 1 },
//         { label: 'Full Season', colspan: 1 },
//         { label: 'Before Markdowns', colspan: 1 },
//         { label: 'Inc %', colspan: 1 },
//         { label: 'Full Season', colspan: 1 },
//     ],
// ];


const myColumns = [
    {
        data: 'col0',
    },
    {
        data: 'col1',
    },
    {
        data: 'col2',
    },
    {
        data: 'col03',
    },
    {
        data: 'col4',
    },
    {
        data: 'col5',
    },
];

const cellStyle = [
    { row: 3, col: 2, className: 'bold' },
    { row: 3, col: 6, className: 'bold' },
    { row: 3, col: 10, className: 'bold' },
];

const menu = ["undo", "redo"]


class ExecViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.fetchBudgetExecData();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewExecData.length !== nextProps.viewExecData.length) {
            this.setState({
                data: nextProps.viewExecData,
            });
        }
    }


    buildTable = () => (
            <div className="parentDiv">
                <HotTable
                    root="hot"
                    data={dataTet.data}
                    cells={cellClasses}
                    cell={cellStyle}
                    fixedRowsTop={0}
                    fixedColumnsLeft={0}
                    formulas={true}

                    contextMenu={menu}
                    mergeCells={merge}
                    currentRowClassName= {'currentRow'}
                    currentColClassName= {'currentCol'}
                    function={true}
                    observeChanges={true}
                    afterChange={this.test.bind(this)} />
            </div>
        )

    test(val) {
        // console.log(val);
    }

    render() {
        console.log(merge);
        const budgetListData = this.props.viewExecDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                {budgetListData}
            </div>
        );
    }
}


ExecViewContainer.propTypes = {
    viewExecData: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array,
    ]).isRequired,
    viewExecDataFetched: PropTypes.bool.isRequired,
    fetchBudgetExecData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { ExecViewReducer } = state;
    return {
        viewExecData: ExecViewReducer.viewExecData,
        viewExecDataFetched: ExecViewReducer.viewExecDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetExecData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecViewContainer);
