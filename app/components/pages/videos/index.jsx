import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import reduxAction from '../../../reduxImplementations/reduxActionHelper';
import { LOAD_PRODUCT_VIDEOS } from 'reduxImplementations/constants/admin/videos';
import VideoWrapper from 'presentational/VideoWrapper';

class Videos extends React.Component {

    render() {

        return <div className="container-fluid">

            <div className="row">

                <div className="gallery">

                    {
                        this.props.data.get("lstAllVideos").map((image) => {

                            return <figure>
                                <h6>{image.name}</h6>
                                <a href={"/#/product/detail/" + image.category_id + "/" + image.id}>

                                    <video poster={"/assets/uploads/" + image.imagePath} controls="controls" controls src={"/assets/uploads/" + image.path + "?rel=0"} allowfullscreen></video>
                                    <figcaption> <p>{image.description}</p></figcaption>

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
        data: Map(state.admin.videos),
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        onInit: function () {

            dispatch(reduxAction(LOAD_PRODUCT_VIDEOS));
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Videos);