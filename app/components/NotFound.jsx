import i18n from 'i18next';
import React from 'react';

export default () =>
    <div>
        <h1>{i18n.t('404.title')}</h1>
        <p>{i18n.t('404.description')}</p>
    </div>;
