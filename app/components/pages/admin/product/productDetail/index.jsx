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
import Popup from 'presentational/Popup';
import ProductFeatures from './features';
import SuitableFor from './suitableFor';
import Videos from './videos';
import Capacity from './capacity';
import Images from './images';
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM } from 'constants/admin/product';
import { alertError } from 'utils/notification';
import { Tabs, Tab } from 'react-bootstrap';
import validate from 'validate.js';
import Styles from '../styles.css';

export default class ProductDetail extends React.Component {

    render() {

        {
            return this.props.data.get("showProductDetails") ?

                <Popup title={"Update " + this.props.data.get("product_name")} closeModal={this.props.onClose}>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">


                        <Tab eventKey={1} title="Product Features">

                            <div className={Styles.tab_content}>

                                <ProductFeatures productId={this.props.data.get("product_id")} />

                            </div>

                        </Tab>

                        <Tab eventKey={2} title="Suitable For" >

                            <SuitableFor productId={this.props.data.get("product_id")} />

                        </Tab>

                        <Tab eventKey={5} title="Images">

                            <Images productId={this.props.data.get("product_id")} />

	                    </Tab>

                        <Tab eventKey={3} title="Videos" >

                            <Videos productId={this.props.data.get("product_id")} />

                        </Tab>

                        <Tab eventKey={4} title="Attachments" >

                            <Capacity productId={this.props.data.get("product_id")} />

                        </Tab>


                    </Tabs>

                </Popup> : null
        }
    }

    getGridColumnDefinition() {
        return [];
    }

    onSubmit(e) {

    }

    componentDidMount() {
        this.props.init();
    }
}