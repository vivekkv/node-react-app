import React from 'react';
import Styles from './styles';

export default class Button extends React.Component {

    render() {
        return <button type={this.props.type} onClick={this.props.onClick} className={this.props.type=="submit" ? Styles.submitButton: Styles.btn} >
            {this.props.children}</button>
    }
}