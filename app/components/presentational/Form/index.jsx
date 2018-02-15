import React from 'react';
import Button from 'presentational/Button';
import Row from 'presentational/Button';
import Styles from './styles';

export default class Form extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (<form className={[this.props.className, Styles.form_wrapper].join(" ")} onSubmit={this.props.onSubmit} enctype={this.props.enctype}>


            {this.props.children}

            <div className={Styles.btn_wrapper}>

                <Button type="submit">Submit</Button>
                <Button type="reset" onClick={this.props.onReset}>Reset</Button>

            </div>

        </form>)
    }
}