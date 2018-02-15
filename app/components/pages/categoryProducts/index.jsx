import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import MetisMenu from 'react-metismenu';
import Row from 'presentational/Row';
import Column from 'presentational/Column';
import ProductList from '../products/productList';
import reduxAction from '../../../reduxImplementations/reduxActionHelper';
import { SHOW_PRODUCT, INIT_MODULE, LOAD_PRODUCTS, LOAD_CATEGORY_PRODUCTS } from 'reduxImplementations/constants/admin/product';
import Styles from '../products/styles';

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

    componentWillReceiveProps(nextProps) {

        if(nextProps.params.categoryId != this.props.params.categoryId) {
            
            this.props.onInit(nextProps.params.categoryId);
        }
    }

    componentDidMount() {
        this.props.onInit(this.props.params.categoryId);
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
        onInit: function (categoryId) {
            dispatch(reduxAction(LOAD_CATEGORY_PRODUCTS, { categoryId }));
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Products);