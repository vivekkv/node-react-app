import React from 'react';
import AuthenticationComponent from 'baseComponents/authenticationComponent';
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
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM } from 'constants/admin/category';
import { alertError } from 'utils/notification';
import validate from 'validate.js';

class Category extends AuthenticationComponent {

    render() {

        let categories = this.props.data.get("categoryList").toArray();
        categories.unshift({ 'text': "Select parent category", "value": "0" });

        return <Card title="Category" icon="fa-pencil">

            <Row>

                <Form onSubmit={this.onSubmit.bind(this)} onReset={this.props.onReset}>

                    <Row>

                        <ColumnGroup label="Name" size="full">
                            <Input autoFocus={true} className="form-control tlnt-input-one" name="categoryname" value={this.props.data.get("categoryname")} placeholder="Enter category name" onChange={this.props.onChange} />
                        </ColumnGroup>

                        {
                            this.props.data.get("categoryList").size > 0 ?
                                <ColumnGroup label="Parent Category" size="full">
                                    <Dropdown multi={false} name="parent_category"
                                        data={categories}
                                        value={this.props.data.get("parent_category")}
                                        onChange={this.props.onChange} placeholder="Select parent category" />
                                </ColumnGroup> : null
                        }

                        <ColumnGroup label="Description" size="full">
                            <Textarea rows={6} className="form-control tlnt-input-one" name="description" value={this.props.data.get("description")} placeholder="Enter description" onChange={this.props.onChange} />
                        </ColumnGroup>

                    </Row>

                </Form>

            </Row>

            <Row>

                <Grid showFilter={true}
                    primaryKey="id"
                    enableEdit={true} enableDelete={true} editAction={this.props.onEdit} deleteAction={this.props.onDelete}
                    resultsPerPage={20} data={this.props.data.get("categoryList").toArray()}
                    columnMetadata={this.getGridColumnDefinition()}
                    columns={["categoryname", "id"]} />

            </Row>

        </Card>
    }

    getGridColumnDefinition() {
        return [{ "columnName": "categoryname", "displayName": "Name" }];
    }

    onSubmit(e) {

        e.preventDefault();

        let constraints = {
            'categoryname': { presence: true },
            'description': { presence: true }
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
        data: Map(state.admin.category)
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

            let deleteConfirmed = confirm("Are you sure to delete this category !");
            if (deleteConfirmed == true) {
                dispatch(reduxAction(DELETE_ITEM, { id }))
            }
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Category);