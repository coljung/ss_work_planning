import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BudgetList extends Component {

    render() {
        return (
            <ul className="budgetList">
                <li>
                    <h3 className="b">Budget SS18</h3>
                    <ul className="versionList">
                        <li>v1</li>
                        <li>v2</li>
                    </ul>
                </li>
                <li>
                    <h3 className="b">Budget FW18</h3>
                    <ul className="versionList">
                        <li>v1</li>
                    </ul>
                </li>
            </ul>

        );
    }
}
