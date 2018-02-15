import React from 'react';
import Styles from './style.css'
import uuid from 'node-uuid';
import actionCreator from '../../../actions/actionCreator';
import WeekSelection from './WeekSelection';

export default class EventCalander extends React.Component {

    render() {
        return (<div>   

            {/*<div className="row">

                <WeekSelection data={this.props.data}/>

            </div>*/}

            <div className="row">

                   <div>
                <div className={["header ", Styles.header_local].join(" ")}>
                    <i className="fa fa-angle-left" onClick={this.previousScheduleMonth.bind(this)}></i>
                    <span>{this.props.data.calender.toObject().scheduleMonth ? 
                            this.props.data.calender.toObject().scheduleMonth.format("MMMM, YYYY") : null} </span>
                    <i className="fa fa-angle-right" onClick={this.nextScheduleMonth.bind(this)}></i>
                </div>
            </div>

            <div>
                <table className="table table-responsive table-hover table-bordered">
                    <thead>
                        <tr>
                            <td className="th">Sun</td>
                            <td className="th">Mon</td>
                            <td className="th">Tue</td>
                            <td className="th">Wed</td>
                            <td className="th">Thu</td>
                            <td className="th">Fri</td>
                            <td className="th">Sat</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.calender.toObject().scheduleWeeks.toArray().map((week) => {
                                {
                                    return <tr key={uuid.v1()}>
                                        {
                                            week.days.map((day) => {

                                                return <td className={["tr-td", day.isCurrentMonth ? "" : "not-current"]} key={uuid.v1()}>
                                                    <div className="div-left">
                                                        <div className="div-left">
                                                            <div className={["day-number", day.isToday ? Styles.today : ""].join(" ")}>{day.number}</div> {
                                                                day.isCurrentMonth ? <div className="day-isCurrentMonth">

                                                                    <div class="checkboxa checkbox-primary checkbox-margin" >
                                                                        <input type="checkbox" checked={day.ischecked} data-id={day.id} onChange={this.selectDay.bind(this)}/>
                                                                        <label></label>
                                                                    </div>

                                                                </div> : null
                                                            }
                                                        </div>
                                                        <div className="div-left">
                                                            {
                                                                day.title.map((objTitle) => {
                                                                    return (<div className="description-one">
                                                                        <a data-id={day.id} data-timeslottype={objTitle.timeslottype} onClick={this.triggerUpdateTimeSlot.bind(this)}>{objTitle.title}</a>
                                                                    </div>)
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            })
                                        }
                                    </tr>
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>

            </div>
        </div>)
    }

    triggerUpdateTimeSlot(e) {

        // this.props.dispatch(actionCreator("STUDENT", "APPLICATION_TIME_OPEN_SLOT_EDIT_SLOT", { 'id': e.target.getAttribute("data-id"), 'timeSlotType': e.target.getAttribute("data-timeslottype")  }))
    }

    previousScheduleMonth() {

       // this.props.dispatch(actionCreator("STUDENT", "APPLICATION_TIME_SLOT_PREVIOUS_MONTH"))
    }

    nextScheduleMonth() {

       // this.props.dispatch(actionCreator("STUDENT", "APPLICATION_TIME_SLOT_NEXT_MONTH"))
    }

    selectDay(e) {

        // this.props.dispatch(actionCreator("STUDENT", "APPLICATION_TIME_SLOT_CHECK_DAY", { 'id': (e.target.getAttribute("data-id")), 'ischecked': e.target.checked }))
    }
}