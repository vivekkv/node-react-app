import React from 'react';
import Styles from './styles.css';

export default class VideoWrapper extends React.Component {

    constructor() {
        super();
        this.showVideo = this.showVideo.bind(this);
        this.closeImageView = this.closeImageView.bind(this);
        this.state= { 'showVideo': false, 'path': "" } 
    }

    render() {

        return <div>
            
            {
                this.getPopup()
            }

            <div style={{ 'width': this.props.width, 'height': this.props.height }} onClick={(e) => { this.showVideo(e, this.props.path) }} className={Styles.overlay}> 
           
                 <iframe src={this.props.path} width={this.props.width} height={this.props.height} allowfullscreen></iframe>
            
            </div>

        </div>
    }

    componentDidUpdate  () {

        $("button").click(function() {
            alert();
            return false;
        })

    }

    getPopup() {
       return this.state.showVideo == true ?  <div className={Styles.popup}>
           <i className="fa fa-close" onClick={this.closeImageView} />
            <iframe  src={this.state.path} allowfullscreen></iframe>
        </div>: null

    }

    closeImageView() {

        this.setState({ 'path': "", 'showVideo': false })
    }

    showVideo(e, path) {

        alert()
        this.setState({ 'path': path, 'showVideo': true })
    }
}