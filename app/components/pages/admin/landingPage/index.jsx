import React from 'react';
import AuthenticationComponent from 'baseComponents/authenticationComponent';
import Card from 'presentational/Card';
import Form from 'presentational/Form';
import { connect } from 'react-redux';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { Map } from 'immutable';
import Row from 'presentational/Row';
import ColumnGroup from 'presentational/ColumnGroup';
import Grid from 'presentational/Grid';
import Input from 'presentational/Input';
import Dropdown from 'presentational/Dropdown'
import Textarea from 'presentational/Textarea';
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM, SET_FORM, LOAD_PAGE_CONTENT } from 'constants/admin/landingPage';
import { alertError } from 'utils/notification';
import validate from 'validate.js';
import { Tabs, Tab } from 'react-bootstrap';
import Categories from './categories';
import LatestProduct from './latestProduct';
import Styles from '../product/styles.css';

class LandingPageContent extends AuthenticationComponent {

    render() {

        return <Card title="Landing Page Content" icon="fa-pencil">

            <Tabs defaultActiveKey={1}>

                <Tab eventKey={1} title="Footer Categories">

                    <div className={Styles.tab_content}>

                        <Categories {...this.props} />

                    </div>

                </Tab>  

                <Tab eventKey={2} title="Product">

                    <div className={Styles.tab_content}>

                        <LatestProduct {...this.props} />

                    </div>

                </Tab>

            </Tabs>

        </Card>
    }

    componentDidMount() {
        this.props.init();
        this.props.loadPageContent("CATEGORIES");
    }
}

let mapStateToProps = function (state) {

    return {
        data: Map(state.admin.landingPage)
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
        onSubmit: function (type) {

            dispatch(reduxAction(SUBMIT_ITEM, { 'pageType': type }));
        },
        loadPageContent: function (type) {
            dispatch(reduxAction(LOAD_PAGE_CONTENT, { 'pageType': type }))
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LandingPageContent);