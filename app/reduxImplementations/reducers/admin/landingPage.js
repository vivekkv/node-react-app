import { fromJS, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_FORM, CLEAR_FORM } from 'constants/admin/landingPage';
import { buildNewState } from 'reduxImplementations/reduxStateHelper';

var initialState = fromJS({
	'lstLandingPage': List([]),
	'lstLatestProducts': List([]),
	'landingPage': List([]),
	'categoryList': List([]),
	'productList': List([]),
	'lstLastestVideos': List([])
});

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case SET_FORM:

			return buildNewState(state, action.data);

		case LOCATION_CHANGE:

			return initialState;

		case CLEAR_FORM:

			return state
				.set("type", null)
				.set("value", null)
				.set("id", null)

		default:

			return state;
	}
}