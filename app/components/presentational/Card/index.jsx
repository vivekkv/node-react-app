import React from 'react';
import Styles from './styles';

export default class Card extends React.Component {

    render() {
        return (<div className={Styles.card}>

            <span className={Styles.header}>
                <i className={"fa " + this.props.icon} aria-hidden="true"></i>&nbsp; {this.props.title}</span>

            <div className={Styles.body}>

                {this.props.children}

            </div>

        </div>)
    }
}