// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { Row, Col, Tabs, Dropdown, Icon } from 'antd';
// import BudgetVersionMenu from '../../components/BudgetVersionMenu';
// import BudgetViewsButtonActions from '../../components/BudgetViewsButtonActions';
// import SectionContainer from '../../sections/SectionContainer';
// import { refreshGridData } from '../../sections/SectionActions';
// import { budgetVersions, saveNewBudgetVersion } from '../../BudgetViewActions';
// import { switchUrls, clearUrls } from '../../../components/customNavigation/CustomNavigationActions';
// import { cellValueRenderer as commonCellValueRenderer } from '../../sections/top-down/CommonCellRenderer';
// import { cellValueRenderer as execCellValueRenderer } from '../../sections/top-down/ExecCellRenderer';
// import { goBackAction, goForwardAction } from '../../history/HistoryActions';
// import { ROUTE_BUDGET } from '../../../Routes';
//
// // Sub Component
// const TabPane = Tabs.TabPane;
//
// export const TAB_EXEC_RECAP = 'exec';
// export const TAB_TOTAL = 'total';
// export const TAB_WOMEN = 'women';
// export const TAB_MEN = 'men';
// export const TAB_BRAND_GROUPS = 'brand-groups';
//
// class TopDownSection extends Component {
//     static contextTypes = {
//         router: PropTypes.object,
//     };
//
//     constructor(props, context) {
//         super(props, context);
//
//         const { budgetid, id, seasonname, vname, tab, section } = this.props.params;
//
//         this.state = {
//             budgetSeasonId: budgetid,
//             versionId: id,
//             seasonName: seasonname,
//             versionName: vname,
//             section,
//             activeTab: tab || TAB_EXEC_RECAP,
//             [TAB_EXEC_RECAP]: false,
//             [TAB_TOTAL]: false,
//             [TAB_WOMEN]: false,
//             [TAB_MEN]: false,
//             [TAB_BRAND_GROUPS]: false,
//         };
//
//         this.props.switchUrls(budgetid, id, seasonname, vname, tab);
//
//         this.onTabChange = this.onTabChange.bind(this);
//         this.handleVersionClick = this.handleVersionClick.bind(this);
//         this.handleUndo = this.handleUndo.bind(this);
//         this.handleRedo = this.handleRedo.bind(this);
//     }
//
//     render() {
//         const { activeTab, budgetSeasonId, versionId } = this.state;
//         return (
//             <Tabs activeKey={activeTab} onChange={this.onTabChange} animated={false}>
//                 <TabPane tab="Exec Recap" key={TAB_EXEC_RECAP}>
//                     {(activeTab === TAB_EXEC_RECAP || this.state[TAB_EXEC_RECAP]) &&
//                         <SectionContainer
//                             budget={budgetSeasonId}
//                             version={versionId}
//                             cellRenderer={execCellValueRenderer}
//                             key={TAB_EXEC_RECAP}
//                             view={TAB_EXEC_RECAP}
//                         />
//                     }
//                 </TabPane>
//                 <TabPane tab="Total" key={TAB_TOTAL}>
//                     {(activeTab === TAB_TOTAL) &&
//                         <SectionContainer
//                             budget={budgetSeasonId}
//                             version={versionId}
//                             cellRenderer={commonCellValueRenderer}
//                             key={TAB_TOTAL}
//                             view={TAB_TOTAL}
//                         />
//                     }
//                 </TabPane>
//                 <TabPane tab="Women" key={TAB_WOMEN}>
//                     {(activeTab === TAB_WOMEN) &&
//                         <SectionContainer
//                             budget={budgetSeasonId}
//                             version={versionId}
//                             cellRenderer={commonCellValueRenderer}
//                             key={TAB_WOMEN}
//                             view={TAB_WOMEN}
//                         />
//                     }
//                 </TabPane>
//                 <TabPane tab="Men" key={TAB_MEN}>
//                     {(activeTab === TAB_MEN) &&
//                         <SectionContainer
//                             budget={budgetSeasonId}
//                             version={versionId}
//                             cellRenderer={commonCellValueRenderer}
//                             key={TAB_MEN}
//                             view={TAB_MEN}
//                         />
//                     }
//                 </TabPane>
//                 <TabPane tab="Brand Groups" disabled key={TAB_BRAND_GROUPS}>
//                     {(activeTab === TAB_BRAND_GROUPS || this.state[TAB_BRAND_GROUPS]) &&
//                         <TotalViewContainer
//                             budget={budgetSeasonId}
//                             version={versionId}
//                         />
//                     }
//                 </TabPane>
//             </Tabs>
//         );
//     }
// }
//
// TopDownSection.propTypes = {
//     params: PropTypes.object.isRequired,
//     newVersion: PropTypes.object,
//     saveNewBudgetVersion: PropTypes.func.isRequired,
//     budgetVersions: PropTypes.func.isRequired,
//     switchUrls: PropTypes.func.isRequired,
//     clearUrls: PropTypes.func.isRequired,
//     versions: PropTypes.array.isRequired,
//     router: PropTypes.object,
//     history: PropTypes.object,
//     goBackAction: PropTypes.func.isRequired,
//     goForwardAction: PropTypes.func.isRequired,
//     refreshGridData: PropTypes.func.isRequired,
// };
//
