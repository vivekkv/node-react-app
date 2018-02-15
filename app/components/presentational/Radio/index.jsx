import React from 'react';
import Styles from './styles.css';

export default class Radio extends React.Component {

    constructor() {
        super()
    }

    render() {
        if (this.props.layout == "inline") {
            return (<div className="form-check">
                <label className={Styles.inline}>
                    <input tabIndex={this.props.tabIndex}
                        value={this.props.value}
                        disabled={this.props.disabled}
                        onChange={this.onChange.bind(this)}
                        type="radio"
                        name={this.props.name}
                        className={this.props.className}
                        checked={this.props.checked} />
                    <span>{this.props.label}</span>
                </label>
            </div>)
        } else {
            return (<div className="form-check">
                {/* <label className="form-check-label"> */}
                <label className={Styles.inline}>
                <input tabIndex={this.props.tabIndex}
                        value={this.props.value}
                        disabled={this.props.disabled}
                        onChange={this.onChange.bind(this)}
                        type="radio"
                        name={this.props.name}
                        className={this.props.className}
                        checked={this.props.checked} />
                    <span>{this.props.label}</span>
                </label>
            </div>)
        }

    }

    onChange(e) {
        if (this.props.onChange)
            this.props.onChange(this.props.name, e.target.value)
    }
}