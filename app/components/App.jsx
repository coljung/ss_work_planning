import React from 'react';
import PropTypes from 'prop-types';
import Layout, { Content, Header } from 'antd/lib/layout';
import HeaderContent from './common/HeaderContent';
import NavigationMain from './common/NavigationMain';
import NotificationManager from '../notifications/NotificationManager';

const App = ({ children }) =>
  <div className="store_layout">
      {/*<Header>
          <HeaderContent />
      </Header> */}
      <Layout>
          <Content>
              <main style={{ flex: 1, overflowY: 'auto', padding: '0 25px 25px' }}>
                  {children}
                  <NotificationManager />
              </main>
          </Content>
      </Layout>
  </div>;

App.propTypes = {
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

export default App;
