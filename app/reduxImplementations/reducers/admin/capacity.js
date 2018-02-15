import { fromJS, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_FORM, CLEAR_FORM } from 'constants/admin/capacity';
import { buildNewState } from 'reduxImplementations/reduxStateHelper';

var initialState = fromJS({
	'capacityList': List([]),
	'Status': "A"
});

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case SET_FORM:

			return buildNewState(state, action.data);

		case LOCATION_CHANGE:

			return initialState;

		case CLEAR_FORM:

			return state
                .set("capacity", null)
				.set("id", null)

		default:

			return state;
	}
}