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
                                <a href={"/#/product/detail/" + image.category_id + "/" + image.id}>

                                     <VideoWrapper poster={"/assets/uploads/" +image.imagePath} path ={image.path} width={"80%"} height={"80%"}/>
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