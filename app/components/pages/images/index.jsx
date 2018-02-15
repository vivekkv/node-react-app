import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import reduxAction from '../../../reduxImplementations/reduxActionHelper';
import { LOAD_PRODUCT_IMAGES } from 'reduxImplementations/constants/admin/images';

class Images extends React.Component {

    render() {

        return <div className="container-fluid">

            <div className="row">

                <div className="gallery">

                    {
                        this.props.data.get("lstAllImages").map((image) => {

                            return <figure>
                                <a href={"/#/product/detail/" + image.category_id + "/" + image.id}>

                                    <img src={"assets/uploads/" + image.path} alt="" />
                                    <figcaption>{image.name} <p>{image.description}</p></figcaption>

                                </a>
                            </figure>

                        })
                    }


                </div>

            </div>
        </div>
    }

    componentDidMount() {
        this.props.onInit();
    }
}


let mapStateToProps = function (state) {
    return {
        data: Map(state.admin.images),
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        onInit: function () {

            dispatch(reduxAction(LOAD_PRODUCT_IMAGES));
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Images);