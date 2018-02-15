import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';

export default class TimePicker extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            dateTime: props.dateTime ? props.dateTime : (props.showDefault == false ? null: new Date())
        };
    }   

    render() {
        return  (<DateTimeField inputFormat="h:mm:ss" onChange={this.onChange} mode="time" className={this.props.className} dateTime={moment(this.state.dateTime).format("x")}/> )
    }

    componentWillReceiveProps(props) {
         this.setState({ dateTime: props.dateTime });
    }

    componentDidMount() {

        if(this.props.enableTimeTicker == true) {
            
            setInterval(() => {
                this.props.onChange(this.props.name, new Date(this.state.dateTime.setSeconds(this.state.dateTime.getSeconds() + 2)));
            }, 2000)
        }
    }

    onChange(e) {
        if(this.props.onChange && this.props.formatMoment) 
           this.props.onChange(this.props.name, moment(new Date(parseInt(e,10))));
        else 
            this.props.onChange(this.props.name, new Date(parseInt(e,10)));
    }
}