import React from 'react';
import Styles from './styles.css';

export default class Widget extends React.Component {

    render() {

        return <div className={["m-widget14 box-shadow", Styles.wrapper].join(" ")}>

            <div className="m-widget14__header m--margin-bottom-30">
                <h3 className="m-widget14__title">{this.props.title}</h3>
            </div>

            <div className="m-widget1 no-padding">

                <div className="m-list-timeline m-list-timeline--skin-light">
                    
                    <div className="m-list-timeline__items">
                        
                        {this.props.children}

                    </div>
                </div>

            </div>
        </div>
    }
}