import React, { PropTypes } from 'react';
import ReactBreadCrumb from 'react-router-breadcrumbs';
import { capitalizeFirstLetter, addSpaceBetweenCapitalLetter } from '../../../utils';
import { Link } from 'react-router';
import _ from 'lodash';
import Styles from './styles.css';

export default class Breadcrumb extends React.Component {
    
    render() {

        let breadCrumbs = this.getUpdatedRoutes();
        return (
            <div className={Styles.breadcrumb_wrapper}><ul className="breadcrumb">
                {breadCrumbs.map((item, index) =>
                    <li key={index} className={item.last ? "completed" : ""}>
                        <Link
                            onlyActiveOnIndex={true}
                            activeClassName="breadcrumb-active"
                            to={item.last ? '': item.path}>
                            {addSpaceBetweenCapitalLetter(capitalizeFirstLetter(item.pathName)) || ''}
                        </Link>
                    </li>
                )}
                <li className={Styles.bread_crumb_help_icon} onClick={this.onHelpButtonClick.bind(this)}><span><i className="fa fa-question-circle" aria-hidden="true"></i></span></li>
            </ul></div>
        );
    }

    getUpdatedRoutes() {

        let bindedRoutes = [{
            path: "dashboard",
            pathName: "Dashboard",
            index: 0
        }];

        if (this.props.routes.length > 2) {

            let parentRoute = this.props.routes[1];
            parentRoute.pathName = parentRoute.path ? parentRoute.path.replace(/^\//, "") : "";


            parentRoute.last = (!this.props.routes[2] || !this.props.routes[2].path);


            //bindedRoutes.push(parentRoute);

            let childRoute = this.props.routes[2];

            if (childRoute.path) {

                let parts = childRoute.path.replace(/^\//, "").split("/");

                let lastPathName = parts[parts.length - 1];

                if(lastPathName.indexOf(":") != -1 && parts[parts.length - 2]) {

                    childRoute.pathName = parts[parts.length - 2];
                    childRoute.last = true;
                    bindedRoutes.push(childRoute);

                } else {

                    childRoute.pathName = parts[parts.length - 1];
                    childRoute.last = true;
                    bindedRoutes.push(childRoute);
                }
            }

        } else {

            bindedRoutes[0].last = true;
        }

        return bindedRoutes
    }

    onHelpButtonClick() {

        let breadCrumb = this.getUpdatedRoutes();
        this.props.onHelpButtonClick(breadCrumb);
    }
}

Breadcrumb.propTypes = {
    routes: PropTypes.array.isRequired
};

Breadcrumb.contextTypes = {
    router: PropTypes.object.isRequired
};