import React from 'react';
import Styles from './styles.css';
import Row from '../Row';

export default class Popup extends React.Component {

    render() {

        return (

            <div className={Styles.popup}>

                <div className={Styles.popup_inner}>

                        <div className={Styles.header}>

                            <h3>{this.props.title}</h3>
                            <button onClick={this.props.closeModal}><i className="fa fa-close" /> </button>

                        </div>

                        <div className={Styles.popup_content}>

                            {this.props.children}

                        </div>

                </div>

            </div>
        );
    }
}