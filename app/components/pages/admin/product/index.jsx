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
import ProductDetails from './productDetail';
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM, SET_FORM } from 'constants/admin/product';
import { alertError } from 'utils/notification';
import validate from 'validate.js';

let onEdit = null;
let onDelete = null;
let onView = null;

class Product extends AuthenticationComponent {

    render() {

        let categories = this.props.data.get("categoryList").toArray();
        categories.unshift({ 'text': "Select category", "value": "0" });

        onEdit = this.props.onEdit;
        onDelete = this.props.onDelete;
        onView = this.props.onView;

        return <Card title="Product" icon="fa-pencil">

            <Row>

                <Form onSubmit={this.onSubmit.bind(this)} onReset={this.props.onReset}>

                    <Row>

                        <ColumnGroup label="Name" size="full">
                            <Input className="form-control tlnt-input-one" name="name" value={this.props.data.get("name")} placeholder="Enter category name" onChange={this.props.onChange} />
                        </ColumnGroup>

                        <ColumnGroup label="Category" size="full">
                            <Dropdown multi={false} name="category_id"
                                data={categories}
                                value={this.props.data.get("category_id")}
                                onChange={this.props.onChange} placeholder="Select parent category" />
                        </ColumnGroup>

                        <ColumnGroup label="Description" size="full">
                            <Textarea rows={6} autoFocus={true} className="form-control tlnt-input-one" name="description" value={this.props.data.get("description")} placeholder="Enter description" onChange={this.props.onChange} />
                        </ColumnGroup>

                    </Row>

                </Form>

            </Row>

            <Row>

                <ProductDetails {...this.props} />

            </Row>

            <Row>

                <Grid showFilter={true}
                    resultsPerPage={20} data={this.props.data.get("productList").toArray()}
                    columnMetadata={this.getGridColumnDefinition()}
                    columns={["name", "id"]} />

            </Row>

        </Card>
    }

    getGridColumnDefinition() {
        return [{ "columnName": "id", "displayName": " ", "customComponent": editComponent },
        { "columnName": "name", "displayName": "Name" }];
    }

    onSubmit(e) {

        e.preventDefault();

        let constraints = {
            'name': { presence: true },
            'description': { presence: true },
            'category_id': { presence: true }
        };

        let validations = validate(this.props.data.toObject(), constraints);

        if (!validations) {

            this.props.onSubmit();

        } else {

            alertError("Enter all inputs to continue !");
        }

    }

    componentDidMount() {
        this.props.init();
    }
}

let mapStateToProps = function (state) {

    return {
        data: Map(state.admin.product)
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
        onSubmit: function () {
            dispatch(reduxAction(SUBMIT_ITEM))
        },
        onReset: function () {
            dispatch(reduxAction(CLEAR_FORM))
        },
        onEdit: function (id) {
            
            dispatch(reduxAction(EDIT_ITEM, { id }))
        },
        onDelete: function (id) {

            let deleteConfirmed = confirm("Are you sure to delete this product !");
            if (deleteConfirmed == true) {
                dispatch(reduxAction(DELETE_ITEM, { id }))
            }
        },
        onView: function (productId, name) {
            dispatch(reduxAction(SET_FORM, { 'data': { "product_id": productId, 'product_name': name, "showProductDetails": true } }));
        },
        onClose: function (productId) {
            dispatch(reduxAction(SET_FORM, { 'data': { "product_id": null, "showProductDetails": false } }));
        }
    }
}

let editComponent = React.createClass({
    render: function () {

        return <span>

            <i className={"fa fa-pencil"} onClick={() => { onEdit(this.props.rowData.id) }}></i> &nbsp;&nbsp;
            <i className={"fa fa-trash"} onClick={() => { onDelete(this.props.rowData.id) }}></i>&nbsp;&nbsp;
            <i className={"fa fa-plus-circle"} onClick={() => { onView(this.props.rowData.id, this.props.rowData.name) }}></i>&nbsp;

        </span>
    },
    onClick: function (id) {
        editAction(id)
    }
});


module.exports = connect(mapStateToProps, mapDispatchToProps)(Product);