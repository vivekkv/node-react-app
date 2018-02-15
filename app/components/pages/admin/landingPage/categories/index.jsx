import React from 'react';
import AuthenticationComponent from 'baseComponents/authenticationComponent';
import Card from 'presentational/Card';
import Form from 'presentational/Form';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import Row from 'presentational/Row';
import ColumnGroup from 'presentational/ColumnGroup';
import Grid from 'presentational/Griddle';
import Input from 'presentational/Input';
import Dropdown from 'presentational/Dropdown'
import Textarea from 'presentational/Textarea';
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM } from 'constants/admin/category';
import { alertError } from 'utils/notification';
import validate from 'validate.js';

export default class Categories extends React.Component {

    render() {

        let categories = this.props.data.get("categoryList").toArray();
        categories.unshift({ 'text': "Select Category", 'value': "0" })
        let landingPageCategories = _.filter(this.props.data.get("lstLandingPage").toArray(), (i) => { return i.type == "CATEGORIES" })

        return <Row>

            <Form onSubmit={this.onSubmit.bind(this)} onReset={this.props.onReset}>

                <Row>

                    <ColumnGroup label="Category" size="full">
                        <Dropdown multi={false} name="value"
                            data={categories}
                            value={this.props.data.get("value")}
                            onChange={this.props.onChange} placeholder="Select category" />
                    </ColumnGroup>

                </Row>

            </Form>

            <Row>

                <Grid showFilter={true}
                    primaryKey="id"
                    enableEdit={false} enableDelete={true} editAction={this.props.onEdit} deleteAction={this.props.onDelete}
                    resultsPerPage={20} data={landingPageCategories}
                    columnMetadata={this.getGridColumnDefinition()}
                    columns={["additionalInfo", "id"]} />

            </Row>

        </Row>

    }

    getGridColumnDefinition() {
        return [{ "columnName": "additionalInfo", "displayName": "Category" }]
    }

    onSubmit(e) {

        e.preventDefault();

        let constraints = {
            'value': { presence: true }
        };

        let validations = validate(this.props.data.toObject(), constraints);

        if (!validations) {

            this.props.onSubmit("CATEGORIES");

        } else {

            alertError("Enter all inputs to continue !");
        }
    }
}