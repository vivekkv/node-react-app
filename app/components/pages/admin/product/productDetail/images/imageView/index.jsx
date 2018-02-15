import React from 'react';
import Styles from '../../../styles.css';

export default class ImageView extends React.Component {

    render() {

        return this.props.data.get("showImage") ? <div className={Styles.image_view_wrapper}>
            
            <i className="fa fa-close" onClick={this.props.closeImageView} />

            <img src={'/assets/uploads/' + this.props.data.get("imagePath")} />

        </div> : null

    }

}