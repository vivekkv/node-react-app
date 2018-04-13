import React from 'react';
import Card from 'presentational/Card';
import Form from 'presentational/Form';
import { connect } from 'react-redux';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { Map } from 'immutable';
import Row from 'presentational/Row';
import ColumnGroup from 'presentational/ColumnGroup';
import Grid from 'presentational/Griddle';
import Input from 'presentational/Input';
import Dropdown from 'presentational/Dropdown'
import Textarea from 'presentational/Textarea';
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, LOGIN_USER } from 'constants/admin/auth';
import { alertError } from 'utils/notification';
import validate from 'validate.js';
import Styles from './styles';

class Login extends React.Component {

    render() {
        return <div>


            <div id="snackbar"></div>

            <div className="header">
                <nav className="navbar navbar-default" style={{ "border": "none", "border-bottom": "4px solid #a9909c" }}>
                    <div className="container-fluid">
                        <div className="navbar-header navbar-left wthree">
                            <h1><a><img src="/assets/images/logo.jpg" style={{ 'width': "153px", "margin-left": "50px", "margin-top": "0px",  }} /></a></h1>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">SIGN IN</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.login.bind(this)}>

                                <fieldset>

                                    <div className="form-group">
                                        <Input autoFocus={true} className="form-control tlnt-input-one" name="username" value={this.props.data.get("username")} placeholder="Enter username" onChange={this.props.onChange} />
                                    </div>

                                    <div className="form-group">
                                        <Input type="password" className="form-control tlnt-input-one" name="password" value={this.props.data.get("password")} placeholder="Enter password" onChange={this.props.onChange} />
                                    </div>

                                    <div className="form-group">

                                        <button type="submit" className={Styles.login_button} >
                                            <i className="fa fa-bolt" aria-hidden="true"></i> &nbsp; Sign In
                                        </button>
                                    </div>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    login(e) {

        e.preventDefault();
        let constraints = {
            'username': { presence: true },
            'password': { presence: true }
        };

        let validations = validate(this.props.data.toObject(), constraints);

        if (!validations) {

            this.props.onLogin();

        } else {

            alertError("Enter all inputs to continue !");
        }
    }

}


let mapStateToProps = function (state) {

    return {
        data: Map(state.admin.auth)
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        onChange: function (name, value) {
            dispatch(reduxAction(INPUT_CHANGE, { name, value }));
        },
        init: function () {
            dispatch(reduxAction(INIT_MODULE));
        },
        onReset: function () {
            dispatch(reduxAction(CLEAR_FORM))
        },
        onLogin: function (id) {
            dispatch(reduxAction(LOGIN_USER, { id }))
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);