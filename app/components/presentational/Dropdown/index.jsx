import React from 'react';
import uuid from 'node-uuid';

export default class Dropdown extends React.Component {

    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
    }

    render() {
        return <select value={this.props.value} 
            onChange={this.onChange} 
            name={this.props.name} 
            placeholder={this.props.placeholder}
            className={["form-control", this.props.className].join(" ")}>
            {
                this.props.data ?
                    this.props.data.map((data) => {
                        return (<option key={uuid.v1()} value={data.value}>{data.text}</option>)
                    }): ""
            }
         </select>
    }

    onChange(e) {
        this.props.onChange(this.props.name, e.target.value)
    }
}

Dropdown.defaultProps = {
    data: []
}

Dropdown.prototypes = {
    data: React.PropTypes.array,
}
