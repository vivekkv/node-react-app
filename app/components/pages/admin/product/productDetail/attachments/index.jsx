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
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM } from 'constants/admin/attachments';
import { alertError } from 'utils/notification';
import validate from 'validate.js';

class Capacity extends React.Component {

    render() {

      
        return <Card title="Attachments" icon="fa-pencil">
    
            <Row>

                <Form onSubmit={this.onSubmit.bind(this)} onReset={this.props.onReset}>

                    <Row>

                        <ColumnGroup label="Attachment" size="full">
                            <Input autoFocus={true} className="form-control tlnt-input-one" name="attachment" value={this.props.data.get("attachment")} placeholder="Enter attachment" onChange={this.props.onChange} />
                        </ColumnGroup>

                    </Row>

                </Form>

            </Row>

            <Row>

                <Grid showFilter={true}
                    primaryKey="id"
                    enableEdit={true} enableDelete={true} editAction={this.props.onEdit} deleteAction={this.props.onDelete}
                    resultsPerPage={20} data={this.props.data.get("attachmentList").toArray()}
                    columnMetadata={this.getGridColumnDefinition()}
                    columns={["attachment", "id"]} />

            </Row>

        </Card>
    }

    getGridColumnDefinition() {
        return [];
    }

    onSubmit(e) {

        e.preventDefault();

        let constraints = {
            'attachment': { presence: true },
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
        data: Map(state.admin.attachments),
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
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Capacity);