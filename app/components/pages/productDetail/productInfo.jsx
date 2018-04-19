import React from 'react';
import Row from 'presentational/Row';
import StarRatingComponent from 'react-star-rating-component';
import StarInput from './starInput';
import VideoWrapper from 'presentational/VideoWrapper';
import Styles from './styles';

export default class ProdutInfo extends React.Component {

    render() {

        let productInfo = this.props.data.get("productInfo");

        if (!productInfo) {

            return <p></p>;
        }

        return <div>

            <StarInput {...this.props} />

            <div className={Styles.header}>

                <h3>{productInfo.category ? productInfo.category.categoryname : "No Category"}</h3>

            </div>

            <div className={Styles.body}>

                <Row>

                    <div className="col-lg-3 col-md-2 col-xs-12 col-sm-12">


                        {
                            productInfo.images[0] ?
                                <img src={"assets/uploads/" + productInfo.images[0].path} />
                                : <img src={"assets/images/no-image-available.png"} />
                        }
    <br />



                        {/* <div className={Styles.ratings_wrapper}>
                            <StarRatingComponent
                                name={productInfo.id}
                                value={productInfo.productRating}
                                starColor="#de963f"
                                starCount={10}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div> */}
                        <div>
                        <br />
                            <a href="/#/contact" className={Styles.enquire}>Enquire</a>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-10 col-xs-12 col-sm-12">

                        <h5>{productInfo.name}</h5>
                        <p>{productInfo.description}</p>

                        <Row>

                            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">

                                {
                                    productInfo.features.length > 0 ?

                                        <div className={Styles.list_wrapper}>

                                            <h4>FEATURES</h4>

                                            <ul>
                                                {
                                                    productInfo.features.map((i, index) => {
                                                        return <li key={index}>{i.description}</li>
                                                    })
                                                }
                                            </ul>


                                        </div> : null

                                }
                            </div>

                            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">

                                {
                                    productInfo.attachments.length > 0 ?

                                        <div className={Styles.list_wrapper}>

                                            <h4>Attachments</h4>

                                            <ul>
                                                {
                                                    productInfo.attachments.map((i, index) => {
                                                        return <li key={index}>{i.attachment}</li>
                                                    })
                                                }
                                            </ul>


                                        </div> : null

                                }
                            </div>


                            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">

                                {
                                    productInfo.suitableFor.length > 0 ?

                                        <div className={Styles.list_wrapper}>

                                            <h4>Ideal For</h4>

                                            <ul>
                                                {
                                                    productInfo.suitableFor.map((i, index) => {
                                                        return <li key={index}>{i.description}</li>
                                                    })
                                                }
                                            </ul>

                                        </div> : null

                                }
                            </div>

                            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">

                                {
                                    productInfo.capacity.length > 0 ?

                                        <div className={Styles.list_wrapper}>

                                            <h4>Capacity</h4>

                                            <ul>
                                                {
                                                    productInfo.capacity.map((i, index) => {
                                                        return <li key={index}>{i.capacity}</li>
                                                    })
                                                }
                                            </ul>


                                        </div> : null

                                }
                            </div>



                        </Row>

                        <Row>

                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">

                                {
                                    productInfo.videos.length > 0 ?

                                        <div className={Styles.list_wrapper}>

                                            <h4>Videos</h4>

                                            <ul className={Styles.video_list}>
                                                {
                                                    productInfo.videos.map((i, index) => {
                                                        return <li key={index}>

                                                            <VideoWrapper poster={productInfo.images[0] ? "assets/uploads/" + productInfo.images[0].path : null} width="200" height="200" path={i.path} allowfullscreen></VideoWrapper></li>
                                                    })
                                                }
                                            </ul>


                                        </div> : null

                                }
                            </div>

                        </Row>

                        <Row>

                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">

                                {
                                    productInfo.images.length > 0 ?

                                        <div className={Styles.list_wrapper}>

                                            <h4>Images</h4>

                                            <ul className={Styles.video_list}>
                                                {
                                                    productInfo.images.map((i, index) => {
                                                        return <li key={index}>

                                                            <img style={{ "width": "200px", "height": "200px" }} src={"assets/uploads/" + productInfo.images[0].path} />

                                                        </li>
                                                    })
                                                }
                                            </ul>

                                        </div> : null

                                }
                            </div>

                        </Row>

                    </div>
                </Row>
            </div>
        </div>
    }

    showVideo(e) {

        e.setAttribute("src", null)
        e.preventDefault();
    }

    onStarClick(nextValue, prevValue, name) {


        this.props.showStarUserPopup(nextValue);
    }
}