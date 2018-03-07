import React from 'react';
import { Carousel } from 'react-bootstrap';
import Styles from '../styles.css';

export default class Slider extends React.Component {

    render() {

        return <div>
            <Carousel>
               
                <Carousel.Item>
                    <div className={Styles.slider_content}>
                        <img src="/assets/images/banners/bowlchopper.jpg" />
                        <h3 style={{ "color": "#000" }}>Bowl Chopper</h3>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className={Styles.slider_content}>
                        <img src="/assets/images/banners/drumroaster.jpg" />
                        <h3 style={{ "color": "#000" }}>Drum Roaster</h3>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className={Styles.slider_content}>
                        <img src="/assets/images/banners/Vibrosifter.jpg" />
                        <h3 style={{ "color": "#000" }}>Vibro sifter</h3>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className={Styles.slider_content}>
                        <img src="/assets/images/banners/Roaster.jpg" />
                        <h3 style={{ "color": "#000" }}>Roaster</h3>
                    </div>
                </Carousel.Item>

                 <Carousel.Item>
                    <div className={Styles.slider_content} >
                        <img src="/assets/images/banners/banner3.jpg" />
                        <h3>Mixer Cum Roaster</h3>
                    </div>
                </Carousel.Item>



                {/* <Carousel.Item>
                    <img src="/assets/images/banners/banner2.jpg" />
                </Carousel.Item> */}
            </Carousel>
        </div>
    }

    componentDidMount() {


    }
}