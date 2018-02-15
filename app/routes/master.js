import App from '../components/root/app';
import Contact from '../components/pages/contact';

module.exports = {
	path: "/",
	getIndexRoute(partialNextState, callback) {
		require.ensure([], function(require) {
			callback(null, {
				component: Contact
			})
		})
	},
	getChildRoutes(partialNextState, callback) {
		callback(null, [{
			path: "contact",
			getComponents(nextState, callback) {
				require.ensure([], function(require) {
					callback(null, require('../components/pages/contact'))
				})
			}
		}, {
			path: "aboutUs",
			getComponents(nextState, callback) {
				require.ensure([], function(require) {
					callback(null, require('../components/pages/aboutUs'))
				})
			}
		}, {
			path: "images",
			getComponents(nextState, callback) {
				require.ensure([], function(require) {
					callback(null, require('../components/pages/images'))
				})
			}
		}, {
			path: "videos",
			getComponents(nextState, callback) {
				require.ensure([], function(require) {
					callback(null, require('../components/pages/videos'))
				})
			}
		}, {
			path: "products",
			getComponents(nextState, callback) {
				require.ensure([], function(require) {
					callback(null, require('../components/pages/products'))
				})
			}
		},{
			path: "category/:categoryId",
			getComponents(nextState, callback) {
				require.ensure([], function(require) {
					callback(null, require('../components/pages/categoryProducts'))
				})
			}
		}, {
			path: "product/detail/:categoryId/:productId",
			getComponents(nextState, callback) {
				require.ensure([], function(require) {
					callback(null, require('../components/pages/productDetail'))
				})
			}
		}])
	}
}