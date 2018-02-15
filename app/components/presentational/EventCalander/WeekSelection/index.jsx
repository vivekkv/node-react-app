import React from 'react';
import FormGroup from '../../../../components/Presentational/FormGroup';
import actionCreator from '../../../../actions/actionCreator';

export default class WeekSelection extends React.Component {

    constructor() {

        super();
        this.isChecked = this.isChecked.bind(this);
        this.timeSlotChecked = this.timeSlotChecked.bind(this);
    }

    render() {

        return <div>
            <div className="col-md-10 col-xs-9 col-sm-9 col-lg-8">

                <ul className="calendar_week_selection_lst">
                    <li>  <FormGroup label="">
                        <label className="form_checkbox_label">
                            <span>Select All Days</span>
                            <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("SELECT_ALL")} name="SELECT_ALL" className="form-control tlnt-input-one" />
                        </label>
                    </FormGroup></li>
                    <li>    <FormGroup label="">
                        <label className="form_checkbox_label">
                            <span>Sun</span>
                            <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("SU")} name="SU" className="form-control tlnt-input-one" />
                        </label>
                    </FormGroup></li>
                    <li>  <FormGroup label="">
                        <label className="form_checkbox_label">
                            <span>Mon</span>
                            <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("MO")} name="MO" className="form-control tlnt-input-one" />
                        </label>
                    </FormGroup></li>
                    <li>  <FormGroup label="">
                        <label className="form_checkbox_label">
                            <span>Tue</span>
                            <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("TU")} name="TU" className="form-control tlnt-input-one" />
                        </label>
                    </FormGroup></li>
                    <li>
                        <FormGroup label="">
                            <label className="form_checkbox_label">
                                <span>Wed</span>
                                <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("WE")} name="WE" className="form-control tlnt-input-one" />
                            </label>
                        </FormGroup>
                    </li>
                    <li>
                        <FormGroup label="">
                            <label className="form_checkbox_label">
                                <span>Thu</span>
                                <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("TH")} name="TH" className="form-control tlnt-input-one" />
                            </label>
                        </FormGroup>
                    </li>
                    <li>
                        <FormGroup label="">
                            <label className="form_checkbox_label">
                                <span>Fri</span>
                                <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("FR")} name="FR" className="form-control tlnt-input-one" />
                            </label>
                        </FormGroup>
                    </li>
                    <li>
                        <FormGroup label="">
                            <label className="form_checkbox_label">
                                <span>Sat</span>
                                <input type="checkbox" onChange={this.timeSlotChecked} checked={this.isChecked("SA")} name="SA" className="form-control tlnt-input-one" />
                            </label>
                        </FormGroup>
                    </li>
                </ul>
            </div>
            <div className="col-md-2 col-xs-3 col-sm-3 col-lg-4">
                <div className=" tlnt_form_button_wrapper">
                    <button type="submit" className="btn pull-left tl_btn_submit" onClick={this.openAllocationModalPopup.bind(this)}><i className="fa fa-clock-o" aria-hidden="true"></i>Allocate</button>
                </div>
            </div>
        </div>

    }

    isChecked(name) {

        let objCalendar = this.props.data.calender.toObject()
        let checkedList = objCalendar.checkedList.toArray();
        let objChecked = _.find(checkedList, (i) => { return i.name == name });
        return objChecked ? objChecked.ischecked : false;
    }


    timeSlotChecked(e) {

       // this.props.dispatch(actionCreator("STUDENT", "APPLICATION_FORM_TIMESLOT_SLOT_CHECKED", { 'data': { 'name': e.target.getAttribute("name"), "checked": e.target.checked } }));
    }

    openAllocationModalPopup() {

       // this.props.onChange("TiggerAllocationModalPopup", true);
    }
}