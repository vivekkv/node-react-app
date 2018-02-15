import React from 'react';
import { Carousel } from 'react-bootstrap'

export default class Slider extends React.Component {

    render() {

        return   <div>
                <Carousel>
                    <Carousel.Item>
                        <img src="/assets/images/banners/banner1.jpg" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/assets/images/banners/banner2.jpg" />
                    </Carousel.Item>
                </Carousel>
            </div>
    }

    componentDidMount() {


    }
}