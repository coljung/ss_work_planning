import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import { Button, Spin } from 'antd';
import { withRouter } from 'react-router';
import { saveBudget, fetchBudgetData, resetState } from './ViewActions';
import { customBorders, mergeMetrics } from './grid/index';
import { createColumn, groupBy } from '../../Helpers';

class ViewCommonContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            disabledBtn: true,
            columnData: {},
            season: '',
        };
        this.dataToSave = [];
    }

    componentDidMount() {
        const { budget, location, version, view } = this.props;
        this.props.fetchBudgetData(budget, version, view, location.query);
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        const setData = nextProps.viewData[nextProps.view];
        if (this.props.viewData.length !== setData && !!setData) {
            this.setState({
                columnData: setData.columnData,
                grid: setData,
                season: setData.info.season,
            });
        }
    }

    changeCell = (cellEdits) => {
        // on load this is called, hence the check
        if (cellEdits) {
            const row = cellEdits[0][0];
            const col = cellEdits[0][1];
            const prevValue = cellEdits[0][2];
            const newValue = cellEdits[0][3];
            if (prevValue !== newValue) {
                const newData = {
                    row,
                    col,
                    value: newValue,
                };
                // check if cell has been modified already
                const checkDuplicate = this.dataToSave.filter(e => e.row !== row || e.col !== col);
                checkDuplicate.push(newData);
                this.dataToSave = checkDuplicate;
            }
            if (this.state.disabledBtn) {
                this.setState({
                    disabledBtn: false,
                });
            }
        }
    }

    save = () => {
        const dataToSend = {};
        dataToSend.data = this.dataToSave;
        this.props.saveBudget(this.props.budget, this.props.version, this.props.view, dataToSend);
    }

    // TODO Move this to specific renderers
    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = this.state.grid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    // TODO Move this to specific renderers
    customBordersCells = () => {
        const { start_row, row_span, total, total_cols } = this.state.grid.info;
        const sample = this.state.grid.data[0];
        // debugger;
        const custom = customBorders(start_row, row_span, total, total_cols, sample);

        return custom;
    }

    createColumnTitles(columns) {
        let columnGroupTitles = [];
        if (columns.some(column => column.grouping)) {
            const columnGroups = groupBy(columns, column => column.grouping);
            columnGroupTitles = Array.from(columnGroups, ([group, value]) => {
                const label = group;
                const colSpan = value.length;

                return {
                    label,
                    colspan: colSpan,
                };
            });
        }

        const columnLabels = columns.map(column => column.label);

        const columnTitles = [];
        if (columnGroupTitles.length) {
            columnTitles.push(columnGroupTitles);
        }

        if (columnLabels.length) {
            columnTitles.push(columnLabels);
        }

        return columnTitles;
    }

    createColumnInfos(columns, cellRendererFactory) {
        const factory = cellRendererFactory ? cellRendererFactory.bind(this) : undefined;
        const columnInfos = columns.map((column) => {
            const renderer = factory ? factory(column) : undefined;

            return createColumn(column, renderer);
        });

        return columnInfos;
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        const newBorders = this.customBordersCells();

        const columnTitles = this.createColumnTitles(this.state.columnData.columns);
        const columnInfos = this.createColumnInfos(this.state.columnData.columns, this.props.cellRendererFactory);

        return (
            <div className="parentDiv">
                <HotTable
                    afterChange={this.changeCell}
                    colHeaders={true}
                    rowHeaders={true}
                    columns={columnInfos}
                    contextMenu={false}
                    currentColClassName={'currentCol'}
                    currentRowClassName={'currentRow'}
                    data={this.state.grid.data}
                    fixedColumnsLeft={2}
                    formulas={false}
                    licenseKey='a389a-f2591-70b41-a480d-1911a'
                    mergeCells={newMerge}
                    nestedHeaders={columnTitles}
                    observeChanges={true}
                    persistentState={true}
                    ref='hot'
                    root='hot'
                    viewportColumnRenderingOffset={20}
                    viewportRowRenderingOffset={20}
                    customBorders={newBorders} />
            </div>
        );
    }

    spinLoad = () => {
        const mySpin = <Spin size="large" tip="Loading..." />;
        return (
            <div className="spinDiv">
                {mySpin}
            </div>
        );
    }

    render() {
        const budgetListData = this.props.viewData[this.props.view] ? this.buildTable() : this.spinLoad();
        let buttonStr = this.props.view;
        buttonStr = `${buttonStr.charAt(0).toUpperCase()}${buttonStr.slice(1)}`;

        return (
            <div>
                <Button
                    icon="save"
                    className="saveBtn"
                    disabled={this.state.disabledBtn}
                    onClick={() => this.save()}>Save {buttonStr}'s view</Button>
                {budgetListData}
            </div>
        );
    }
}


ViewCommonContainer.propTypes = {
    viewData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    viewDataFetched: PropTypes.bool.isRequired,
    saveBudget: PropTypes.func.isRequired,
    fetchBudgetData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
    cellRendererFactory: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { ViewReducers } = state;
    return {
        viewData: ViewReducers.viewData,
        viewDataFetched: ViewReducers.viewDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetData, resetState, saveBudget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewCommonContainer));
