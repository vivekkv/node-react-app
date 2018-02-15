import React from 'react';
import moment from 'moment'

export default class DateField extends React.Component {

    render() {
        
        let date = moment(this.props.rowData[this.props.field], this.props.format ? this.props.format : null);

        if(this.props.isDateTimeFormat) {

            return <div>{date.format("DD/MM/YYYY hh:mm")}</div>

        } else if(this.props.isTimeFormat) {

            var dateTime = new Date(this.props.rowData[this.props.field]);
            dateTime = moment(dateTime).format("HH:mm:ss");

            return <div>{dateTime}</div>
        } else {

            return <div>{date.format("DD/MM/YYYY")}</div>
        }
    }
}   