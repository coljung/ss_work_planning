// TODO Remove this, not used anymore
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import { withRouter } from 'react-router';
import Handsontable from 'handsontable-pro';
import { Spin } from 'antd';
import { leftBorderColumns, percentageRows, numberRows, columns } from './grid-build/columns';
import { fetchBudgetExecData, resetState } from './ExecViewActions';
import { mergeMetrics } from '../../../Helpers';
import { createColumn, borderLeft, borderBottom, percentageRow, numberRow, groupBy, disableEdit } from '../../Helpers';

const menu = ['undo', 'redo'];

class ExecViewContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            columns: [],
        };
    }

    componentDidMount() {
        const { budget, location, version } = this.props;

        this.props.fetchBudgetExecData(budget, version, location.query);
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewExecData.length || nextProps.viewExecData) {
            this.setState({
                grid: nextProps.viewExecData,
                columns,
            });
        }
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = this.state.grid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    cellValueRender(instance, td, row, col, prop, value, cellProperties) {
        if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
            td.style.background = '#eee';
        }

        // styling border left per section
        borderLeft(leftBorderColumns, prop, td);

        // styling border for each metric
        const rowSpan = 5;
        borderBottom(row, rowSpan, td, col);

        // showing N/A instead of error
        if (isNaN(parseInt(value, 10))) {
            td.innerHTML = 'N/A';
            td.className += ' cellNA';

            disableEdit(instance, row, col);

            return td;
        }

        percentageRow(percentageRows, instance, row, col);
        numberRow(numberRows, instance, row, col);

        Handsontable.renderers.NumericRenderer.apply(this, arguments);

        return td;
    }

    cellMetric(instance, td, row, col, prop, value, cellProperties) {
        td.className += ' metricCell';

        return td;
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        const columnGroups = groupBy(this.state.columns, column => column.grouping);
        const columnGroupTitles = Array.from(columnGroups, ([group, value]) => {
            const label = group;
            const colSpan = value.length;

            return {
                label,
                colspan: colSpan,
            };
        });

        const columnLabels = this.state.columns.map(column => column.label);

        const columnTitles = [
            columnGroupTitles,
            columnLabels,
        ];
        const columnInfos = this.state.columns.map((column) => {
            let renderer;

            if (column.name === 'metric') {
                renderer = this.cellMetric;
            }

            if (column.type === 'percentage' || column.type === 'currency') {
                renderer = this.cellValueRender;
            }

            return createColumn(column, renderer);
        });

        const { info, data } = this.state.grid;
        return (
            <div className="parentDiv">
                <HotTable
                    root='hot'
                    ref='hot'
                    data={data}
                    colHeaders={true}
                    nestedHeaders={columnTitles}
                    viewportColumnRenderingOffset={100}
                    viewportRowRenderingOffset={100}
                    fixedRowsTop={0}
                    fixedColumnsLeft={2}
                    formulas={true}
                    columns={columnInfos}
                    contextMenu={false}
                    mergeCells={newMerge}
                    readOnly={true}
                    persistentState={true}
                    currentRowClassName={'currentRow'}
                    currentColClassName={'currentCol'}
                    function={true}
                    observeChanges={true}
                    stretchH='all'
                    hiddenRows={{
                        rows: info.hidden_rows,
                    }}
                    licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
            </div>
        );
    }

    spinLoad = () => {
        const mySpin = <Spin size="large" tip="Loading Exec..." />;
        return (
            <div className="spinDiv">
                {mySpin}
            </div>
        );
    }

    render() {
        const budgetListData = this.props.viewExecDataFetched ? this.buildTable() : this.spinLoad();
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
    resetState: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExecViewContainer));
