import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import { Button, Spin } from 'antd';
import { withRouter } from 'react-router';
import {
    resetState } from './SectionActions';
import {
    sendDataForSpreading } from '../BudgetViewActions';
import { historyPush } from '../history/HistoryActions';
import LoadingSpinner from '../../components/common/LoadingSpinner';

class SectionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            headers: [],
            info: {},
            season: '',
        };

        // set a reference to the Handsontable
        this.hotTableRef = null;

        this.resetScroll();

        this.lastEditCell = null;

        this.emptyChange = false;
    }

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
                // this.hotTableRef.focus();
                // reset numbers
                this.resetScroll();
            }
        }
    };

    componentWillMount() {
        // refresh grid on window resize
        let resizeTimeout = '';
        window.addEventListener('resize', (event) => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resize();
            }, 500);
        });
    }

    componentWillUnmount() {
        this.props.resetState();
        window.removeEventListener('resize', this.resize);
    }

    componentWillReceiveProps = (nextProps) => {
        const setData = nextProps.data ? nextProps.data[nextProps.view] : {};
        if (this.props.data.length !== setData && !!setData) {
            this.setState({
                headers: setData.headers,
                data: setData.data,
                info: setData.info,
                season: setData.info.season,
            });
        }
    };

    resetScroll = () => {
        this.row = 0;
        this.column = 0;
        this.scrollPosLeft = 0;
        this.scrollPosTop = 0;
    }

    resize = () => this.hotTableRef.hotInstance.render();

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
    changeCell = async (cellEdits) => {
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

            // future test if cell is numeric
            const isNumValue = this.hotTableRef.hotInstance.getCellMeta(row, col).numericFormat;

            // if user doesnt enter any text
            if (newValue === '') {
                this.emptyChange = true;
                this.hotTableRef.hotInstance.setDataAtRowProp(row, cellEdits[0][1], prevValue);
                return;
            }

            // handsontable converts to string
            if (parseFloat(prevValue, 10) !== parseFloat(newValue, 10)) {
                const dataToSend = this.state.data[row][col[0]];
                const { budget, version, view } = this.props;
                const { historyPush } = this.props; // eslint-disable-line no-shadow
                const viewHistory = history[view];

                // set row/col for scrollpositioning
                this.row = row;
                this.column = Object.keys(this.state.data[row]).indexOf(col[0]);

                const element = document.getElementsByClassName('wtHolder')[0];
                this.scrollPosTop = element.scrollTop;
                this.scrollPosLeft = element.scrollLeft;

                this.props.sendDataForSpreading(budget, version, view, dataToSend)
                    .then((res) => {
                        // Send old value into history for future undo
                        // TODO: Fix this
                        // I did this because if the second+ edited cell is not the same
                        // we need to be able to undo it, old value should be store in history
                        // same a first push
                        // this would cause a double undo / redo click when changing cell
                        if (this.lastEditCell !== cellEditKey) {
                            historyPush(view, { ...dataToSend, value: +prevValue });
                        }

                        historyPush(view, dataToSend);

                        this.lastEditCell = cellEditKey;
                    })
                    .catch((err) => {
                        throw err;
                    });
            }
        }
    };

    createColumn = (column, renderer) => ({
        data: `${column}.value`,
        readOnly: false,
        type: 'text',
        renderer,
    })

    createColumnInfos(columns) {
        const renderer = this.props.cellRenderer ? this.props.cellRenderer.bind(this) : undefined;
        return columns.map(column => this.createColumn(column, renderer));
    }

    buildTable = () => {
        const columnTitles = this.state.headers;
        const columnInfos = this.createColumnInfos(Object.getOwnPropertyNames(this.state.data.length ? this.state.data[0] : []));
        const refreshLoad = this.props.isDataSpreading ? (<div className="refreshLoad"><LoadingSpinner /></div>) : null;
        return (
            <div className={`${this.props.view}-view parentDiv`}>
                {refreshLoad}
                <HotTable
                    afterChange={this.changeCell}
                    colHeaders={true}
                    rowHeaders={true}
                    columns={columnInfos}
                    contextMenu={false}
                    currentColClassName={'currentCol'}
                    currentRowClassName={'currentRow'}
                    data={this.state.data}
                    fixedColumnsLeft={1}
                    fixedRowsTop={0}
                    formulas={false}
                    licenseKey='a389a-f2591-70b41-a480d-1911a'
                    nestedHeaders={columnTitles}
                    observeChanges={true}
                    persistentState={true}
                    ref={this.setHotTableRef}
                    root='hot'
                    viewportColumnRenderingOffset={20}
                    viewportRowRenderingOffset={100}
                />
            </div>
        );
    };

    render() {
        const { data, view, isBudgetLoading } = this.props;
        const budgetListData = data[view] && !isBudgetLoading ? this.buildTable() : <LoadingSpinner />;

        return (
            <div>
                {budgetListData}
            </div>
        );
    }
}

SectionContainer.propTypes = {
    // saveBudget: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    cellRenderer: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    history: PropTypes.object.isRequired,
    historyPush: PropTypes.func.isRequired,
    isBudgetLoading: PropTypes.bool.isRequired,
    isDataSpreading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    resetState: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    sendDataForSpreading: PropTypes.func.isRequired,
    version: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const { BudgetViewReducer, HistoryReducer } = state;
    return {
        history: HistoryReducer,
        isBudgetLoading: BudgetViewReducer.isBudgetLoading,
        isDataSpreading: BudgetViewReducer.isDataSpreading,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetState,
        sendDataForSpreading,
        historyPush,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SectionContainer));
