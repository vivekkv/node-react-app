import React from 'react';

export default class Edit extends React.Component {

    render() {
        return <i onClick={this.onClick.bind(this)} data-id={this.props.primaryKey} className={this.props.IsDeleteIcon ? "fa fa-trash": "fa fa-pencil tlnt-edit-pencil"} ></i>
    }

    onClick(e) {
        if(this.props.onClick) {
            this.props.onClick(e.target.getAttribute("data-id"))
        }
    }
}   