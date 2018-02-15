import React from 'react';
import { DateRange } from 'react-date-range';
import Styles from './styles.css';

export default class Daterange extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        let label = "";

        if(props.startDate && props.endDate) {
            label =  (props.startDate.format("L") + "-" + props.endDate.format("L"))
        }

        this.state = { value: props.value, showDateRange: false, label }
    }

    render() {
        return (<div className={Styles.wrapper}>

            <button className={Styles.btn} onClick={this.toggleDateRange.bind(this)}> {this.state.label ? this.state.label : "Select date range"} </button>

            {
                this.state.showDateRange ? <div>

                <div className={Styles.clse_wrapper}>

                    <i className="fa fa-close" onClick={this.toggleDateRange.bind(this)}/>

                </div>
                
               <div>
               <DateRange
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    onChange={this.onChange}
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    
                />

               </div>

                </div> : null
            }

        </div>)
    }

    toggleDateRange() {

        let showDateRange = !this.state.showDateRange;
        this.setState({ showDateRange: showDateRange });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value });
    }

    onChange(range) {

        if (this.props.onChange)
            this.props.onChange(this.props.name, range);

        this.setState({ value: range, label: (range.startDate.format("L") + "-" + range.endDate.format("L")) });
    }
}