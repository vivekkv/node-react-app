import React from 'react';
import Styles from '../styles.css';

export default class LatestNews extends React.Component {

    render() {

        let latestProducts = this.props.landingPage.get("lstLatestProducts").toArray();

        return <div className="news-section">
            <div className="container-fluid">
                <div className={Styles.latest_products}>

                    {
                        latestProducts.map((product) => {

                            return <div className="col-md-3 news-column">
                                <img className="img-responsive" src={'/assets/uploads/' + product.path} title="name" />
                                <br />
                                <h4>{product.name}</h4>
                                <br />
                                <p>{product.description}</p>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    }
}