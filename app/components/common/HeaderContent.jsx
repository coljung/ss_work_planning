import React, { Component } from 'react';
import Logo from './Logo';
import NavigationUser from './NavigationUser';


export default class HeaderContent extends Component {
    render() {
        return (
            <div className="headerContent">
                <Logo />
                <h1>MIcroservice Name</h1>
                <NavigationUser />
            </div>
        );
    }
}
