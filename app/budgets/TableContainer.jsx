import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HotTable } from '@handsontable/react';
import { connect } from 'react-redux';
import LoadingSpinner from '../components/common/LoadingSpinner';
import rowHeaderCellRenderer from './helpers/RowHeaderCellRenderer';
import commonCellValueRenderer from './helpers/CommonCellRenderer';
import { jsonTransformer } from './helpers/TableHelpers';

class TableContainer extends Component {
    static propTypes = {
        view: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
        isBudgetLoading: PropTypes.bool.isRequired,
        isDataSpreading: PropTypes.bool.isRequired,
        onCellChange: PropTypes.func.isRequired,
        onPushHistory: PropTypes.func.isRequired,
        useDecimals: PropTypes.bool.isRequired,
        historyData: PropTypes.object,
    };

    state = {
        viewData: {
            headers: [],
            info: {},
            data: [],
        },
    };

    hotTableRef = null;
    lastEditCell = null;
    emptyChange = false;
    row = 0;
    column = 0;
    scrollPosLeft = 0;
    scrollPosTop = 0;

    componentWillMount() {
        // refresh grid on window resize
        this.resizeTimeout = '';
        window.addEventListener('resize', this.resize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize, false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.historyData && nextProps.historyData !== this.props.historyData && nextProps.historyData.focusPosition) {
            this.column = nextProps.historyData.focusPosition.col;
            this.row = nextProps.historyData.focusPosition.row;
            this.scrollPosTop = nextProps.historyData.focusPosition.scrollPosTop;
            this.scrollPosLeft = nextProps.historyData.focusPosition.scrollPosLeft;
        }

        if ((nextProps.data !== this.props.data) || nextProps.filters !== this.props.filters) {
            this.setState({
                viewData: jsonTransformer(nextProps.data, nextProps.filters, nextProps.config),
            });
        }
    }

    resetScroll() {
        this.row = 0;
        this.column = 0;
        this.scrollPosLeft = 0;
        this.scrollPosTop = 0;
    }

    /**
     *  Handsontable Change cell row index
     * @typedef {Number} Handsontable~RowIndex
     */
    /**
     *  Handsontable Change cell column and property string joined by a "."
     * @typedef {String} Handsontable~ColIndexAndProperty
     */
    /**
     *  Handsontable Change cell old value
     * @typedef {(String|Number)} Handsontable~OldValue
     */
    /**
     *  Handsontable Change cell new value
     * @typedef {(String|Number)} Handsontable~NewValue
     */
    /**
     * Handsontable Change cell
     * @typedef {Array<[Handsontable~RowIndex, Handsontable~ColIndexAndProperty, Handsontable~OldValue, Handsontable~NewValue]>} Handsontable~ChangeCell
     */
    /**
     * Change cell handler
     * @param  {Handsontable~ChangeCell[]} cellEdits An array of {Handsontable~ChangeCell}
     * @return {void}
     */
    changeCell = (cellEdits) => {
        // checks if previous change was simply a revert
        if (this.emptyChange) {
            this.emptyChange = false;
            return;
        }

        // on load this is called, hence the check
        if (cellEdits) {
            const row = cellEdits[0][0];
            const col = cellEdits[0][1].split('.');
            const cellEditKey = [cellEdits[0][0], cellEdits[0][1]].join('.');
            const prevValue = cellEdits[0][2];
            const newValue = cellEdits[0][3];

            // if user doesnt enter any text
            if (newValue === '') {
                this.emptyChange = true;
                this.hotTableRef.hotInstance.setDataAtRowProp(row, cellEdits[0][1], prevValue);
                return;
            }

            // handsontable converts to string
            if (parseFloat(prevValue, 10) !== parseFloat(newValue, 10)) {
                let dataToSend;

                if (col[0] === 'pre_mkdwn_incr') {
                    const keys = this.state.viewData.data[row].pre_mkdwn.key.split('.');
                    const presentYearDataObject = this.props.data.years[keys[1]].metrics[keys[2]].plans.wp.periods[keys[3]];
                    const pastYearDataObject = this.props.data.years[keys[1] - 1].metrics[keys[2]].plans.wp.periods[keys[3]];

                    dataToSend = {
                        key: presentYearDataObject.key,
                        value: (newValue * pastYearDataObject.value) + pastYearDataObject.value,
                        origin: 'yearOverYear',
                        metric: this.props.data.years[keys[1]].metrics[keys[2]].metric,
                    };
                } else {
                    const keys = this.state.viewData.data[row][col[0]].key.split('.');

                    dataToSend = {
                        ...this.state.viewData.data[row][col[0]],
                        origin: 'value',
                        metric: this.props.data.years[keys[1]].metrics[keys[2]].metric,
                    };
                }

                // set row/col for scrollpositioning
                this.row = row;
                this.column = Object.keys(this.state.viewData.data[row]).indexOf(col[0]);

                const element = document.getElementsByClassName('wtHolder')[0];
                const focusPosition = {
                    col: this.column,
                    row: this.row,
                    scrollPosTop: element.scrollTop,
                    scrollPosLeft: element.scrollLeft,
                };

                this.props.onCellChange(dataToSend)
                    .then(() => {
                        // Send old value into history for future undo
                        // TODO: Fix this
                        // I did this because if the second+ edited cell is not the same
                        // we need to be able to undo it, old value should be store in history
                        // same a first push
                        // this would cause a double undo / redo click when changing cell
                        if (this.lastEditCell !== cellEditKey) {
                            this.props.onPushHistory({ ...dataToSend, value: +prevValue }, focusPosition);
                        }

                        this.props.onPushHistory(dataToSend, focusPosition);

                        this.lastEditCell = cellEditKey;
                    })
                    .catch((err) => {
                        throw err;
                    });
            }
        }
    };

    setHotTableRef = (element) => {
        if (element) {
            this.hotTableRef = element;
            if (this.scrollPosTop !== 0 || this.scrollPosLeft !== 0) {
                // selects cell
                this.hotTableRef.hotInstance.selectCell(this.row, this.column, this.row, this.column, false, false);
                // scrolls to exact position
                const elem = document.getElementsByClassName('wtHolder')[0];
                elem.scrollTop = this.scrollPosTop;
                elem.scrollLeft = this.scrollPosLeft;
                // reset numbers
                this.resetScroll();
            }
        }
    };

    resize = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.hotTableRef.hotInstance.render();
        }, 500);
    };

    detectCollapse = () => {
        const elem = document.getElementsByClassName('ant-layout-sider-collapsed');
        if (!elem.length) {
            const resizeTimeout = setInterval(() => {
                if (elem.length) {
                    this.resize();
                    clearInterval(resizeTimeout);
                }
            }, 500);
        }
    };

    createColumn(column, renderer) {
        return {
            data: `${column}.value`,
            readOnly: false,
            type: 'text',
            width: column.includes('incr') ? 70 : 120, // Put less space for incr% columns
            renderer,
        };
    }

    createColumnInfos(columns) {
        const titleColumn = {
            data: `${columns[0]}.metric`,
            readOnly: true,
            type: 'text',
            width: 205,
            renderer: rowHeaderCellRenderer.bind(this),
        };

        const renderer = commonCellValueRenderer.bind(this);
        const valueColumns = columns.slice(1).map(column => this.createColumn(column, renderer));

        return [
            titleColumn,
            ...valueColumns,
        ];
    }

    buildTable() {
        if (!Object.keys(this.state.viewData).length) {
            return null;
        }

        const columnInfos = this.createColumnInfos(Object.getOwnPropertyNames(this.state.viewData.data.length ? this.state.viewData.data[0] : []));
        const refreshLoad = this.props.isDataSpreading ? (<div className="refreshLoad"><LoadingSpinner /></div>) : null;
        return (
            <div className='parentDiv'>
                {refreshLoad}
                <HotTable
                    afterChange={this.changeCell}
                    afterRender={this.detectCollapse}
                    colHeaders={true}
                    rowHeaders={false}
                    columns={columnInfos}
                    contextMenu={false}
                    currentColClassName={'currentCol'}
                    currentRowClassName={'currentRow'}
                    data={this.state.viewData.data}
                    fixedColumnsLeft={1}
                    fixedRowsTop={0}
                    formulas={false}
                    licenseKey='a389a-f2591-70b41-a480d-1911a'
                    nestedHeaders={[
                        [
                            '&nbsp;', // For the first header column; an empty header makes a smaller cell than having a nbsp, so that's why we're setting this
                            ...this.state.viewData.headers[0].slice(1),
                        ],
                    ]}
                    observeChanges={true}
                    persistentState={true}
                    ref={this.setHotTableRef}
                    id='hot'
                    root='hot'
                    viewportColumnRenderingOffset={20}
                    viewportRowRenderingOffset={100}
                />
            </div>
        );
    }

    render() {
        const budgetListData = this.props.isBudgetLoading || !this.state.viewData.data.length ? <LoadingSpinner /> : this.buildTable();

        return (
            <div>
                {budgetListData}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { budgetViewReducer, HistoryReducer } = state;
    let historyData = null;
    if (ownProps && HistoryReducer && HistoryReducer[ownProps.view]) {
        historyData = HistoryReducer[ownProps.view].present;
    }
    return {
        config: budgetViewReducer.config,
        isBudgetLoading: budgetViewReducer.isBudgetLoading,
        isDataSpreading: budgetViewReducer.isDataSpreading,
        historyData,
    };
}

export default connect(mapStateToProps, null)(TableContainer);
