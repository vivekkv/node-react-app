import React from 'react';
import Styles from './styles.css';

export default class SummaryBox extends React.Component {

    render() {

        return <div className={["m-portlet m-portlet--full-height m-portlet--fit box-shadow", Styles.summaryBox].join(" ")} style={this.props.style}>

            {this.props.showHeader != false ? <div className="m-portlet__head">

                <div className={["row", Styles.box_header_row].join(" ")}>

                    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">

                        <div className="m-portlet__head-caption">

                            <div className="m-portlet__head-title">
                                <h3 className="m-portlet__head-text">

                                    <span>{this.props.leftHeader}</span>

                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className={["col-xs-12 col-sm-12 col-md-3 col-lg-3", Styles.right_header_row].join(" ")}>

                        {
                            this.props.rihtHeader
                        }

                    </div>

                </div>

            </div> : null}

            <div className={["m-portlet__body", this.props.body_style].join(" ")}>

                {this.props.children}

            </div>

        </div>
    }
}