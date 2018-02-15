import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


export default class Calender extends React.Component {

    render() {

        let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])
        return (<BigCalendar events={this.props.events} onSelectEvent={this.props.onSelectEvent}  onSelectSlot={this.props.onSelectSlot} selectable={true} />)
    }
}