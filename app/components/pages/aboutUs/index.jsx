import React from 'react';
import Info from './info';
import GetInTouch from './getInTouch';
import TeamInfo from './teamInfo';
import Styles from './styles.css';

module.exports = class AboutUs extends React.Component {

    render() {
        return <div>

            <Info />

            {/* <GetInTouch /> */}

            <TeamInfo />


            <div className="container">

                <p className={Styles.listParagraph}>Complet turnkey projects we are voluter</p>
                
                <ul className={Styles.list}>
                    <li>Automate rice floor plant</li>       
                    <li>Fruit Processing Plant</li>       
                    <li>Automate rice floor plant</li>       
                    <li>Automate rice floor plant</li>       
                </ul>

            </div>
        </div>
    }
}