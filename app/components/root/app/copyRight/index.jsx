import React from 'react';

export default class CopyRight extends React.Component {

    render() {

        return <div className="footer-w3copy w3-agileits">
            <p>© {new Date().getFullYear()} Sarah's Techno's. All Rights Reserved </p>
        </div>
    }
}