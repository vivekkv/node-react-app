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
import { INPUT_CHANGE, INIT_MODULE, SUBMIT_ITEM, CLEAR_FORM, EDIT_ITEM, DELETE_ITEM } from 'constants/admin/product';
import { alertError } from 'utils/notification';
import { Tabs, Tab } from 'react-bootstrap';
import validate from 'validate.js';
import Styles from './styles.css';

export default class StarInput extends React.Component {

    render() {

        {
            return this.props.data.get("showPopup") ?

                <Popup title="Enter your details" closeModal={this.props.onClose}>


                    <Form onSubmit={this.onSubmit.bind(this)} onReset={this.props.onReset}>

                        <Row>

                            <ColumnGroup label="Name" size="full">
                                <Input autoFocus={true} className="form-control tlnt-input-one" name="rating_user_name" value={this.props.data.get("rating_user_name")} placeholder="Enter name" onChange={this.props.onChange} />
                            </ColumnGroup>

                            <ColumnGroup label="Email" size="full">
                                <Input className="form-control tlnt-input-one" name="email" value={this.props.data.get("email")} placeholder="Enter email" onChange={this.props.onChange} />
                            </ColumnGroup>

                            <ColumnGroup label="Enter your comments" size="full">
                                <Textarea rows={10} className="form-control tlnt-input-one" name="remarks" value={this.props.data.get("remarks")} placeholder="Enter your comments" onChange={this.props.onChange} />
                            </ColumnGroup>

                        </Row>

                    </Form>

                </Popup> : null
        }
    }

    onSubmit(e) {

        e.preventDefault();
        this.props.onRatingsSubmit();
    }
}