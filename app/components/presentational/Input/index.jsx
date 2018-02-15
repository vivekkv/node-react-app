import React from 'react';

export default class Input extends React.Component {

    render() {
        return (<input tabIndex={this.props.tabIndex}
            value={this.props.value ? this.props.value : ""}
            onChange={this.onChange.bind(this)}
            onBlur={this.onBlur.bind(this)}
            type={this.props.type}
            maxLength={this.props.maxLength}
            name={this.props.name}
            disabled={this.props.disabled}
            autoFocus={this.props.autoFocus}
            className={this.props.className}
            checked={this.props.checked}
            placeholder={this.props.placeholder}
            style={this.props.style}
            data-id={this.props.data_id}
        />)
    }

    onChange(e) {

        if (this.props.returnTarget) {
            this.props.onChange(e);
        } else {

            if (this.props.onChange && this.props.type != "checkbox") {
                var value = e.target.value.toString();
                this.props.onChange(this.props.name, value);
            } else {
                this.props.onChange(this.props.name, e.target.checked);
            }
        }
    }

    onBlur(e) {
        if (this.props.onBlur) {
            var value = e.target.value.toString();
            this.props.onBlur(this.props.name, value);
        }
    }

    formatValue(value) {
        return value ? escape(value.toString().replace(/'/g, "''")) : '';
    }
}