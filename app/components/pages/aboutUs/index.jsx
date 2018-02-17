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

                <p className={Styles.listParagraph}>Complete turnkey projects we are under taking</p>
                
                <ul className={Styles.list}>
                    <li>Automate rice floor plant</li>       
                    <li>Fruit Processing Plant</li>       
                    <li>Spices Processing Plant</li>       
                    <li>Distillation extraction plant for spices and herbbs</li>       
                </ul>

            </div>
        </div>
    }
}