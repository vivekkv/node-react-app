import React from 'react';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const format = 'h:mm:ss';
const now = moment().hour(0).minute(0);

export default class NewTimePicker extends React.Component {

    constructor(props) {

        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = {
            value: props.value ? props.value : null
        };
    }   

    render() {
        return (<TimePicker
            showSecond={true}
             disabled={this.props.disabled == true ? true: false}
            value={this.state.value}
            placeholder={this.props.placeholder}
            disabledHours={this.props.disabledHours}
            onChange={this.onChange}
        />)
    }

    onChange(value) {
       if(this.props.onChange)
            this.props.onChange(this.props.name, value)
    }

     componentWillReceiveProps(props) {

         this.setState({ value: props.value });
    }
}