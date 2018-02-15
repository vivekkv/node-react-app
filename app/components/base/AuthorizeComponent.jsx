import React from 'react';
import Auth from '../../auth';

export default class AuthorizeComponent extends React.Component {


    render() {

        if (this.isValid()) {

            return (this.props.children);
        }

        if (this.props.hideChildren) {

            return  null;

        } else {

            return <p>You are not allowed to do this operation</p>
        }
    }

    isValid() {

        if(this.props.accessCode)
            return Auth.isAuthorized(this.props.accessCode);
        return true
    }
}

AuthorizeComponent.PropTypes = {
    accessCode: React.PropTypes.string,
    hideChildren: React.PropTypes.bool
}