import React from 'react';
import Card from 'presentational/Card';
import Form from 'presentational/Form';
import { connect } from 'react-redux';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { Map } from 'immutable';
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, LOGG_OFF } from 'constants/admin/auth';

class Navigation extends React.Component {

    render() {

        return <nav className="navbar navbar-default navbar-static-top" role="navigation" >
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html"><img src="/assets/images/logo.jpg" style={{ 'width': "100px" }} /></a>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li><a><i className="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a><i className="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li className="divider"></li>
                        <li onClick={() => { this.props.onLogOff() }}><a><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <a href="/admin/#/dashboard"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="/admin/#/dashboard/category"><i className="fa fa-table fa-fw"></i> Category</a>
                        </li>
                        <li>
                            <a href="/admin/#/dashboard/product"><i className="fa fa-table fa-fw"></i> Product</a>
                        </li>
                        <li>
                            <a href="/admin/#/dashboard/landingPage"><i className="fa fa-table fa-fw"></i>Landing Page</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
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
        onLogOff: function () {
            dispatch(reduxAction(LOGG_OFF))
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Navigation);