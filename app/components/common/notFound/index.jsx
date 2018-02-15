import React from 'react';
import styles from './styles.css';

module.exports = class NotFound extends React.Component {
    render() {
        return (<div className={styles.error}>
            <div className={[styles.error_code, styles.m_b_10, styles.m_t_20].join(" ")}>404 <i className="fa fa-warning"></i></div>
                <h3 className="font-bold">We couldn't find the page..</h3>
                    <div className="error-desc">
                        Sorry, but the page you are looking for was either not found or does not exist. <br />
                        Try refreshing the page or click the button below to go back to the Homepage.
                    <div>
                    <a className=" login-detail-panel-button btn" href="/">
                        <i className="fa fa-arrow-left"></i>
                        Go back to Homepage
                    </a>
                    </div>
            </div>
        </div>)
    }
}