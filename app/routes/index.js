import App from '../components/root/app';
import LoginRoot from '../components/root/adminLogin'
import LandingPage from '../components/pages/landingPage';
import DashboardWrapper from '../components/root/dashboard';
import Dashboard from '../components/pages/admin/dashboard';

export default [{
    component: App,
    path: "/",
    getIndexRoute(partialNextState, callback) {
        require.ensure([], function (require) {
            callback(null, {
                component: LandingPage
            })
        })
    },
    getChildRoutes(partialNextState, callback) {
        require.ensure([], function (require) {
            callback(null, [
                require("./master")
            ])
        })
    },
}, {
    component: DashboardWrapper,
    path: "/dashboard",
    getIndexRoute(partialNextState, callback) {
        require.ensure([], function (require) {
            callback(null, {
                component: Dashboard
            })
        })
    },
    getChildRoutes(partialNextState, callback) {
        require.ensure([], function (require) {
            callback(null, [
                {
                    path: "category",
                    getComponents(nextState, callback) {
                        require.ensure([], function (require) {
                            callback(null, require('../components/pages/admin/category'))
                        })
                    }
                },
                {
                    path: "product",
                    getComponents(nextState, callback) {
                        require.ensure([], function (require) {
                            callback(null, require('../components/pages/admin/product'))
                        })
                    }
                },
                {
                    path: "landingPage",
                    getComponents(nextState, callback) {
                        require.ensure([], function (require) {
                            callback(null, require('../components/pages/admin/landingPage'))
                        })
                    }
                }
            ])
        })
    },
}, {
    path: "/login",
    getComponents(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('../components/pages/admin/login'))
        })
    }
}, {
    path: "/notauthorized",
    getComponents(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('../components/common/notAuthroized'))
        })
    }
}, {
    path: "*",
    getComponents(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('../components/common/notFound'))
        })
    }
}]