import { fromJS, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_FORM, CLEAR_FORM } from 'constants/admin/product';
import { buildNewState } from 'reduxImplementations/reduxStateHelper';

var initialState = fromJS({
	'productList': List([]),
	'categoryList': List([]),
	'metisMenu': List([]),
	'categoryProductList': List([]),
	'showProductDetails': false
});

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case SET_FORM:

			return buildNewState(state, action.data);


		case CLEAR_FORM:

			return state
				.set("name", null)
				.set("id", null)
				.set("description", null)
				.set("category_id", null)

		default:

			return state;
	}
}