import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { fetchBudgetExecData, resetState } from './ExecViewActions';
import datagrid from './test_exec';
import { cellClasses, headers, columns } from './grid-build/index';
import { mergeMetrics, mergeHeadersExecRecap } from '../../../Helpers';

const menu = ['undo', 'redo'];

class ExecViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.props.fetchBudgetExecData();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewExecData.length || nextProps.viewExecData) {
            this.setState({
                data: nextProps.viewExecData.data,
            });
        }
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = datagrid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    test = (changes) => {
        console.log(changes);
    }

    buildTable = () => {
        console.log(columns);
        const newMerge = this.mergeCells();
        return (
            <div className="parentDiv">
                <HotTable
                    root="hot"
                    data={datagrid.data}
                    cells={cellClasses}
                    nestedHeaders= {headers}
                    colHeaders= {true}
                    fixedRowsTop={0}
                    fixedColumnsLeft={0}
                    formulas={true}
                    columns={columns}
                    contextMenu={menu}
                    mergeCells={newMerge}
                    persistentState={true}
                    currentRowClassName= {'currentRow'}
                    currentColClassName= {'currentCol'}
                    function={true}
                    observeChanges={true}
                    afterChange={this.test} />
            </div>);
    }

    render() {
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
        PropTypes.array,
        PropTypes.object,
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
