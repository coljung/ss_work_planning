import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import { saveBudget, fetchBudgetMetricData, resetState } from './ViewActions';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

class ViewCommonContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            canSave: true,
            headers: [],
            info: {},
            season: '',
        };
        this.dataToSave = [];
    }

    componentDidMount() {
        const { budget, version, view, router: { location } } = this.props;

        // TODO Use filters to select metrics
        this.props.fetchBudgetMetricData(budget, version, view, ['SALES'], location.query);
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        const setData = nextProps.viewData ? nextProps.viewData[nextProps.view] : {};
        if (this.props.viewData.length !== setData && !!setData) {
            this.setState({
                headers: setData.headers,
                data: setData.data,
                info: setData.info,
                season: setData.info.season,
            });
        }
    };

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
            if (this.state.canSave) {
                this.setState({
                    canSave: false,
                });
            }
        }
    };

    save = () => {
        const dataToSend = {};
        dataToSend.data = this.dataToSave;
        this.props.saveBudget(this.props.budget, this.props.version, this.props.view, dataToSend);
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
                    data={this.state.data}
                    fixedColumnsLeft={2}
                    formulas={false}
                    licenseKey='a389a-f2591-70b41-a480d-1911a'
                    nestedHeaders={columnTitles}
                    observeChanges={true}
                    persistentState={true}
                    ref='hot'
                    root='hot'
                    viewportColumnRenderingOffset={20}
                    viewportRowRenderingOffset={20}
                />
            </div>
        );
    };

    render() {
        const budgetListData = this.props.viewData[this.props.view] ? this.buildTable() : <LoadingSpinner />;
        let buttonStr = this.props.view;
        buttonStr = `${buttonStr.charAt(0).toUpperCase()}${buttonStr.slice(1)}`;

        return (
            <div>
                <Button
                    icon="save"
                    className="saveBtn"
                    disabled={this.state.canSave}
                    onClick={() => this.save()}>Save {buttonStr} view</Button>
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
    fetchBudgetMetricData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
    cellRenderer: PropTypes.func,
};

function mapStateToProps(state) {
    const { ViewReducers } = state;
    return {
        viewData: ViewReducers.viewData,
        viewDataFetched: ViewReducers.viewDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetMetricData, resetState, saveBudget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewCommonContainer));
