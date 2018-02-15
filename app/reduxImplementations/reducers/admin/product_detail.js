import { fromJS, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_FORM, CLEAR_FORM } from 'constants/admin/productDetail';
import { buildNewState } from 'reduxImplementations/reduxStateHelper';

var initialState = fromJS({
	'productInfo': null,
	'showPopup': false
});

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case SET_FORM:

			return buildNewState(state, action.data);

		case LOCATION_CHANGE:

			return initialState;

		case CLEAR_FORM:

			return state
				.set("showPopup", false)
				.set("rating_user_name", null)
				.set("email", null)
				.set("comments", null)

		default:

			return state;
	}
}