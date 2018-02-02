import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { withRouter } from 'react-router';
import { fetchBudgetExecData, resetState } from './ExecViewActions';
import { headers, columns } from './grid-build/index';
import { mergeMetrics, mergeHeadersExecRecap } from '../../../Helpers';

const menu = ['undo', 'redo'];

class ExecViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const { budget, location, version } = this.props;

        this.props.fetchBudgetExecData(budget, version, location.query);
    }

    componentWillUnmount() {
        this.props.resetState();
        console.log('gone exec');
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewExecData.length || nextProps.viewExecData) {
            this.setState({
                grid: nextProps.viewExecData,
            });
        }
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = this.state.grid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        const { grid: { info, data } } = this.state;
        return (
            <div className="parentDiv">
                <HotTable
                    root='hot'
                    ref='hot'
                    data={data}
                    colHeaders={true}
                    nestedHeaders={headers}
                    viewportColumnRenderingOffset={100}
                    viewportRowRenderingOffset={100}
                    fixedRowsTop={0}
                    fixedColumnsLeft={2}
                    formulas={true}
                    columns={columns}
                    contextMenu={false}
                    mergeCells={newMerge}
                    readOnly={true}
                    persistentState={true}
                    currentRowClassName= {'currentRow'}
                    currentColClassName= {'currentCol'}
                    function={true}
                    observeChanges={true}
                    stretchH='all'
                    hiddenRows={ {
                      rows: info.hidden_rows
                    } }
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
