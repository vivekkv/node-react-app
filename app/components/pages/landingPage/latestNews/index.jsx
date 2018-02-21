import React from 'react';
import Styles from '../styles.css';
import Slider from 'react-image-slider';

export default class LatestNews extends React.Component {

    render() {

        let latestProducts = this.props.landingPage.get("lstLatestProducts").toArray();

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return <div className="news-section">
            <div className="container-fluid">

                <div className={Styles.latest_products}>

                <div className="w3ls-title">
                    <h3 className="agileits-title">Latest Products</h3>
                </div>

                    <Slider images={latestProducts.map((i) => { return '/assets/uploads/' + i.path })} isInfinite delay={5000}>

                        {
                            latestProducts.map((product, index) => {
                                return <a key={index} href={"/#/product/detail/" + product.category_id + "/" + product.id}><img src={'/assets/uploads/' + product.path} /></a>
                            })
                        }

                    </Slider>

                </div>
            </div>
        </div>
    }
}