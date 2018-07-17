import i18n from 'i18next';
import React from 'react';
import Logo from './Logo';

export default () =>
  <div className="headerContent">
     <Logo />
     <h1>{i18n.t('appTitle')}</h1>
 </div>;
