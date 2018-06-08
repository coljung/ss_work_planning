import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import { Button, Spin } from 'antd';
import { withRouter } from 'react-router';
import {
    saveBudget,
    fetchBudgetMetricData,
    resetState,
    fetchBudgetConfigData,
    refreshGridData } from './SectionActions';
import { historyPush } from '../history/HistoryActions';
import LoadingSpinner from '../../components/common/LoadingSpinner';

class SectionContainer extends Component {
    constructor(props) {
        super(props);

        const { budget, version, view } = this.props;

        this.state = {
            data: [],
            canSave: true,
            headers: [],
            info: {},
            season: '',
            budget,
            version,
            view,
        };

        // set a reference to the Handsontable
        this.hotTableRef = null;

        this.row = 0;
        this.column = 0;

        this.lastEditCell = null;

        this.emptyChange = false;
    }

    setHotTableRef = (element) => {
        if (element) {
            this.hotTableRef = element;
            if (this.row !== 0 || this.column !== 0) {
                // selects cell and scrolls
                this.hotTableRef.hotInstance.selectCell(this.row, this.column, this.row, this.column, true, false);
                // scrolls and moves grid so that selected cell is not in the bottom right section
                this.hotTableRef.hotInstance.scrollViewportTo(this.row, this.column, false, true);
                // reset numbers
                this.row = 0;
                this.column = 0;
            }
        }
    };

    componentDidMount() {
        const promise = this.props.fetchBudgetConfigData();
        promise.then(this.metricData);

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
        const setData = nextProps.viewData ? nextProps.viewData[nextProps.view] : {};
        // console.log(nextProps);
        if (this.props.viewData.length !== setData && !!setData) {
            this.setState({
                headers: setData.headers,
                data: setData.data,
                info: setData.info,
                season: setData.info.season,
            });
        }

        if (nextProps.refreshData) {
            this.metricData();
        }

        if (nextProps.version !== this.props.version) {
            this.setState(
                {
                    version: nextProps.version,
                }, () => this.metricData(),
            );
        }
    };

    resize = () => this.hotTableRef.hotInstance.render();

    metricData = () => {
        const { budget, version, view } = this.state;
        const { config, router: { location } } = this.props;
        this.props.fetchBudgetMetricData(budget, version, view, config, location.query);
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
                const { budget, version, view } = this.state;
                const { historyPush } = this.props; // eslint-disable-line no-shadow
                const viewHistory = history[view];

                // set row/col for scrollpositioning
                this.row = row;
                this.column = Object.keys(this.state.data[row]).indexOf(col[0]);

                this.props.refreshGridData(budget, version, view, dataToSend)
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
        const refreshLoad = this.props.spreadingData ? (<div className="refreshLoad"><LoadingSpinner /></div>) : null;
        return (
            <div className={`${this.state.view}-view parentDiv`}>
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
        const budgetListData = this.props.viewData[this.props.view] && !this.props.refreshData ? this.buildTable() : <LoadingSpinner />;
        let buttonStr = this.props.view;
        buttonStr = `${buttonStr.charAt(0).toUpperCase()}${buttonStr.slice(1)}`;

        return (
            <div>
                {budgetListData}
            </div>
        );
    }
}

SectionContainer.propTypes = {
    viewData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    viewDataFetched: PropTypes.bool.isRequired,
    saveBudget: PropTypes.func.isRequired,
    fetchBudgetMetricData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
    cellRenderer: PropTypes.func,
    fetchBudgetConfigData: PropTypes.func.isRequired,
    refreshGridData: PropTypes.func.isRequired,
    refreshData: PropTypes.bool.isRequired,
    spreadingData: PropTypes.bool.isRequired,
    config: PropTypes.array,
    history: PropTypes.object.isRequired,
    historyPush: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { SectionReducers, HistoryReducer } = state;
    return {
        viewData: SectionReducers.viewData,
        viewDataFetched: SectionReducers.viewDataFetched,
        config: SectionReducers.config.available_metrics,
        refreshData: SectionReducers.refreshData,
        spreadingData: SectionReducers.spreadingData,
        history: HistoryReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBudgetMetricData,
        resetState,
        saveBudget,
        fetchBudgetConfigData,
        refreshGridData,
        historyPush,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SectionContainer));
