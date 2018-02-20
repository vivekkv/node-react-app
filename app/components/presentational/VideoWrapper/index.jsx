import React from 'react';
import Styles from './styles.css';

export default class VideoWrapper extends React.Component {

    render() {

        return this.props.path ?  <div>
            
            <div style={{ 'width': this.props.width, 'height': this.props.height }} > 
           
                 <video controls="controls" controls src={"/assets/uploads/" + this.props.path+"?rel=0"} width={this.props.width} height={this.props.height} allowfullscreen></video>
            
            </div>

        </div>: ""
    }

}