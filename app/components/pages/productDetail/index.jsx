import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MetisMenu from 'react-metismenu';
import Row from 'presentational/Row';
import Column from 'presentational/Column';
import ProductInfo from './productInfo';
import { push } from 'react-router-redux';
import reduxAction from '../../../reduxImplementations/reduxActionHelper';
import { SHOW_PRODUCT, INIT_MODULE, LOAD_PRODUCTS, LOAD_METIS_MENU,  } from 'reduxImplementations/constants/admin/product';
import { LOAD_PRODUCT_DETAIL, SET_FORM, INPUT_CHANGE, STAR_INPUT_SUBMIT } from 'reduxImplementations/constants/admin/productDetail';
import Styles from './styles';

class ProductDetail extends React.Component {

    render() {

        return <div className="container-fluid">
        
            <Row>

                <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12">

                    <div className={Styles.product_menu_wrapper}>

                        <h3>Products</h3>

                        <MetisMenu content={this.props.product.get("metisMenu").toArray()} 
                                   activeLinkTo={this.props.product.get("defaultCategory") ? this.props.product.get("defaultCategory") : null} />

                    </div>

                </div>


                <div className="col-lg-9 col-md-9 col-xs-12 col-sm-12">

                    <ProductInfo {...this.props} />

                </div>

            </Row>
        </div>
    }




    componentDidMount() {
        this.props.onInit(this.props.params.productId, this.props.params.categoryId);
    }
}

let mapStateToProps = function (state) {

    return {
        data: Map(state.admin.productDetail),
        product: Map(state.admin.product),
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        onInit: function (productId, categoryId) {

            dispatch(reduxAction(LOAD_PRODUCT_DETAIL, { categoryId, productId }));
            dispatch(reduxAction(LOAD_METIS_MENU, { categoryId, productId }));
        },
        showStarUserPopup: function(nextvalue) {

            dispatch(reduxAction(SET_FORM, { 'data': { 'showPopup': true, 'rating': nextvalue } }));
        },
        onClose: function() {

            dispatch(reduxAction(SET_FORM, { 'data': { 'showPopup': false } }));
        },
        onChange: function (name, value) {
            dispatch(reduxAction(INPUT_CHANGE, { name, value }));
        },
        onRatingsSubmit: function() {
            dispatch(reduxAction(STAR_INPUT_SUBMIT));
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ProductDetail);