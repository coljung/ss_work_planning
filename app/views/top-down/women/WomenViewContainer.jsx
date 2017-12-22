import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { mergeMetrics, mergeHeadersExecRecap } from 'helpers';
import { fetchBudgetWomenData, resetState } from './WomenViewActions';
import { cellClasses, headers, columns } from '../common/men-women/index';

class WomenViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        this.props.fetchBudgetWomenData(this.props.budget, this.props.version);
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewWomenData.length !== nextProps.viewWomenData) {
            this.setState({
                grid: nextProps.viewWomenData,
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
        const { currentMonthColumn, season } = this.state.grid.info;
        const cols = columns(currentMonthColumn, season);
        const seasonColumns = season === 'SS' ? cols[0] : cols[1];
        const seasonHeaders = season === 'SS' ? headers[0] : headers[1];
        return (<div className="parentDiv">
            <HotTable
                root='hot'
                data={this.state.grid.data}
                cells={cellClasses}
                nestedHeaders={seasonHeaders}
                colHeaders={true}
                columns={seasonColumns}
                formulas={true}
                contextMenu={false}
                mergeCells={newMerge}
                persistentState={true}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true}
                licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
        </div>);
    }

    render() {
        const budgetListData = this.props.viewWomenDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                <h2>WOMEN</h2>
                {budgetListData}
            </div>
        );
    }
}


WomenViewContainer.propTypes = {
    viewWomenData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    viewWomenDataFetched: PropTypes.bool.isRequired,
    fetchBudgetWomenData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const { WomenViewReducer } = state;
    return {
        viewWomenData: WomenViewReducer.viewWomenData,
        viewWomenDataFetched: WomenViewReducer.viewWomenDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetWomenData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WomenViewContainer);
