import React from 'react';
import Info from './info';
import GetInTouch from './getInTouch';
import TeamInfo from './teamInfo';

module.exports = class AboutUs extends React.Component {

    render() {
        return <div>

            <Info />

            <GetInTouch />

            {/* <TeamInfo /> */}

        </div>
    }
}