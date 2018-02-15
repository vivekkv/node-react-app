import React from 'react';

export default class ColumnGroup extends React.Component {

    render() {

        return (<div className={this.getColumnClasses()}  style={this.props.style}>

            <div className="form-group">
                {
                    this.props.label ?  <label>{this.props.label} {this.props.required ? <span className="required-field">*</span> : ""}</label> : null
                }

                {this.props.children}

            </div>

        </div>)
    }

    getColumnClasses() {

        let lgSize = this.props.lgSize ? this.props.lgSize : this.parseDefaultColumn();
        let mdSize = this.props.mdSize ? this.props.mdSize : this.parseDefaultColumn();

        return "col-lg-" + lgSize + " col-md-" + mdSize + " col-sm-12 col-md-12";
    }

    parseDefaultColumn() {

        switch (this.props.size) {

            case "full":
                return 12;

            case "medium":
                return 6;

            case "small":

                return 3;
            
            case "threeColumn":

                return 4;
            case "setSize":

                return this.props.columnSize;

            default:
                return 12;
        }
    }
}