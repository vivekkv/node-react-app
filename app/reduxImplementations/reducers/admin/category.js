import { fromJS, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_FORM, CLEAR_FORM } from 'constants/admin/category';
import { buildNewState } from 'reduxImplementations/reduxStateHelper';

var initialState = fromJS({
	'categoryList': List([]),
	'parent_category': '0'
});

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case SET_FORM:

			return buildNewState(state, action.data);

		case LOCATION_CHANGE:

			return initialState;

		case CLEAR_FORM:

			return state
				.set("categoryname", null)
				.set("id", null)
				.set("parent_category", "0")
				.set("description", null)

		default:

			return state;
	}
}