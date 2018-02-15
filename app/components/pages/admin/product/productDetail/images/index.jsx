import React from 'react';
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
import FileUpload from 'presentational/Fileupload';
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM, SET_FORM } from 'constants/admin/images';
import { alertError } from 'utils/notification';
import validate from 'validate.js';
import ImageView from './imageView';
import Styles from '../../styles.css';

let onDelete = null;
let showImage = null;

class Images extends React.Component {

    render() {

        onDelete = this.props.onDelete;
        showImage  = this.props.showImage;

        return <Card title="Images" icon="fa-pencil">

            <ImageView {...this.props} />

            <Row>

                <Form onSubmit={this.onSubmit.bind(this)} onReset={this.props.onReset} enctype="multipart/form-data">

                    <Row>

                        <ColumnGroup label="Path" size="full">

                            <FileUpload name="ImagePath" className="form-control tlnt-input-one"
                                supportedExtensions={["jpeg", "png", "jpg", "gif"]}
                                value={this.props.data.get("ImagePath")} onChange={this.props.onChange} />

                        </ColumnGroup>

                        <ColumnGroup label="Description" size="full">
                            <Textarea className="form-control tlnt-input-one" name="description" value={this.props.data.get("description")} placeholder="Enter description" onChange={this.props.onChange} />
                        </ColumnGroup>

                    </Row>

                </Form>

            </Row>

            <Row>

                <Grid showFilter={true}
                    primaryKey="id"
                    resultsPerPage={20} data={this.props.data.get("imagesList").toArray()}
                    columnMetadata={this.getGridColumnDefinition()}
                    columns={["path", "description", "id"]} />

            </Row>

        </Card>
    }

    getGridColumnDefinition() {
        return [{ "columnName": "id", "displayName": " ", "customComponent": editComponent },
        { "columnName": "path", "displayName": 'Image', "customComponent": imageComponent }];
    }

    onSubmit(e) {

        e.preventDefault();

        let constraints = {
            'description': { presence: true },
        };

        let validations = validate(this.props.data.toObject(), constraints);

        if (!validations && this.props.product.get("product_id")) {

            this.props.onSubmit();

        } else {

            alertError("Enter all inputs to continue !");
        }

    }

    componentDidMount() {
        this.props.init(this.props.productId);
    }
}

let mapStateToProps = function (state) {

    return {
        data: Map(state.admin.images),
        product: Map(state.admin.product)
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        onChange: function (name, value) {
            dispatch(reduxAction(INPUT_CHANGE, { name, value }));
        },
        init: function (productId) {
            dispatch(reduxAction(INIT_MODULE, { name: "init", 'value': productId }));
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
            dispatch(reduxAction(DELETE_ITEM, { id }))
        },
        showImage: function(path) {
            dispatch(reduxAction(SET_FORM, { 'data': { 'imagePath': path, 'showImage': true } }))
        },
        closeImageView: function() {
            dispatch(reduxAction(SET_FORM, { 'data': { 'showImage': false } }))
        }
    }
}

let editComponent = React.createClass({
    render: function () {

        return <span>

            <i className={"fa fa-trash"} onClick={() => { onDelete(this.props.rowData.id) }}></i>&nbsp;

        </span>
    }
});

let imageComponent = React.createClass({
    render: function () {

        return <img onClick={() => { showImage(this.props.rowData.path) }} src={"/assets/uploads/" + this.props.rowData.path} className={Styles.grid_image} />
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Images);