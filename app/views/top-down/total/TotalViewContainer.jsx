import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { fetchBudgetTotalData, resetState } from './TotalViewActions';
import datagrid from './test_exec';
// import dataTet from './test_exec_tetyana';
import { merge, cellClasses } from '../exec/grid-build/index';
import { mergeMetrics, mergeHeadersExecRecap } from '../../../Helpers';

const cellStyle = [
    { row: 3, col: 2, className: 'bold' },
    { row: 3, col: 6, className: 'bold' },
    { row: 3, col: 10, className: 'bold' },
];

const headers = [
    [
        { label: 'Metrics', colspan: 2 },
        { label: 'Total', colspan: 6 },
        { label: 'Women', colspan: 7 },
        { label: 'Men', colspan: 7 },
    ],
    [
        'Name',
        'Season/Year',
        'STD Pre-Markdown',
        'Incr%',
        'STD Post-Markdown',
        'Incr%',
        'Full Season',
        'Incr%',
        'STD Pre-Markdown',
        'Incr%',
        'STD Post-Markdown',
        'Incr%',
        'Full Season',
        'Incr%',
        'Cont%',
        'STD Pre-Markdown',
        'Incr%',
        'STD Post-Markdown',
        'Incr%',
        'Full Season',
        'Incr%',
        'Cont%',
    ],
];

class TotalViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.props.fetchBudgetTotalData();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewTotalData.length !== nextProps.viewTotalData.length) {
            this.setState({
                data: nextProps.viewTotalData,
            });
        }
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = datagrid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        return (<div className="parentDiv">
            <HotTable
                root="hot"
                data={datagrid.data}
                cells={cellClasses}
                cell={cellStyle}
                nestedHeaders= {headers}
                colHeaders= {true}
                fixedRowsTop={0}
                fixedColumnsLeft={0}
                formulas={true}
                contextMenu={false}
                mergeCells={newMerge}
                persistentState={true}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true} />
        </div>);
    }

    render() {
        const budgetListData = this.props.viewTotalDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                <h2>TOTAL</h2>
                {budgetListData}
            </div>
        );
    }
}


TotalViewContainer.propTypes = {
    viewTotalData: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array,
    ]).isRequired,
    viewTotalDataFetched: PropTypes.bool.isRequired,
    fetchBudgetTotalData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { TotalViewReducer } = state;
    return {
        viewTotalData: TotalViewReducer.viewTotalData,
        viewTotalDataFetched: TotalViewReducer.viewTotalDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetTotalData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalViewContainer);