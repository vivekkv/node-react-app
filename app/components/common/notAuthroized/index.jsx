import React from 'react';
import styles from './styles.css';

class NotAuthorized extends React.Component {
    render() {
        return (<div className={styles.error}>
            <div className={[styles.error_code, styles.m_b_10, styles.m_t_20].join(" ")}>401 <i className="fa fa-warning"></i></div>
                <h3 className="font-bold">YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE</h3>
                <a className=" login-detail-panel-button btn" onClick={this.onGoBack.bind(this)}>
                    <i className="fa fa-arrow-left"></i>
                    Go back to Homepage
                </a>
        </div>)
    }

    onGoBack() {
        this.context.router.goBack()
    }
}

NotAuthorized.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = NotAuthorized