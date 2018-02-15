import React from 'react';

export default class IFrame extends React.Component {

    render() {

        return <iframe 
            src={this.props.url}
            className={this.props.className}
            style={this.props.style}
            onLoad={this.props.onLoad}
        />
    }
}