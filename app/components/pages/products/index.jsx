import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MetisMenu from 'react-metismenu';
import Row from 'presentational/Row';
import Column from 'presentational/Column';
import ProductList from './productList';
import reduxAction from '../../../reduxImplementations/reduxActionHelper';
import { SHOW_PRODUCT, INIT_MODULE, LOAD_PRODUCTS } from 'reduxImplementations/constants/admin/product';
import Styles from './styles';

class Products extends React.Component {

    render() {

        return <div className="container-fluid">

            <Row>

                <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12">

                    <div className={Styles.product_menu_wrapper}>

                        <h3>Products</h3>
                        <MetisMenu content={this.props.data.get("metisMenu").toArray()} activeLinkTo={this.props.data.get("defaultCategory") ? this.props.data.get("defaultCategory") : null} />

                    </div>

                </div>


                <div className="col-lg-9 col-md-9 col-xs-12 col-sm-12">

                    <ProductList {...this.props} />

                </div>

            </Row>
        </div>
    }
    
    componentDidMount() {

        this.props.onInit();
        // let onInit = this.props.onInit;
        // if(this.props.params.categoryId) {
        //     this.props.onInit(this.props.params.categoryId);
        // }
        // $(".metismenu").on("click", ".metismenu-link", function (e) {

        //     // e.preventDefault();
        //     // let productId = e.target.getAttribute("href");
        //     // onInit(productId);
            
        // });
    }
}

let mapStateToProps = function (state) {

    return {
        data: Map(state.admin.product)
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        onInit: function () {
            dispatch(reduxAction(LOAD_PRODUCTS));
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Products);