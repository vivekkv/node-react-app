import React from 'react';
import VideoWrapper from 'presentational/VideoWrapper'

export default class VideoGallery extends React.Component {

    render() {

        let videos = this.props.landingPage.get("lstLastestVideos").toArray();

        return <div className="container-fluid" style={{ "max-height": "400px", "overflow": "hidden", "overflow-y": "scroll" }}>
 <div className="w3ls-title">
                    <h3 className="agileits-title">Videos</h3>
                </div>
            <div className="row">

                {
                    videos.map((d) => {

                        return <div className="col-sm-3 nopadding">
                            <div className="embed-responsive embed-responsive-16by9">
                                <VideoWrapper width="560" height="315" path={d.path}></VideoWrapper>
                            </div>
                        </div>

                    })
                }

            </div>

        </div>

    }
}