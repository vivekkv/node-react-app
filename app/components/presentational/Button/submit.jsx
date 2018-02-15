import React from 'react';
import Styles from './styles.css';

export default class SubmitButton extends React.Component {

    render() {
        return <button type={"submit"} onClick={this.props.onClick} className={[Styles.btn, this.props.className].join(" ")} >{this.props.children}</button>
    }
}