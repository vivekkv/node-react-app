import { fromJS, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_FORM, CLEAR_FORM } from 'constants/admin/contact';
import { buildNewState } from 'reduxImplementations/reduxStateHelper';

var initialState = fromJS({
	
});

export default function reducer(state = initialState, action) {

	switch (action.type) {

		case SET_FORM:

			return buildNewState(state, action.data);

		case LOCATION_CHANGE:

			return initialState;

		case CLEAR_FORM:

			return state
				.set("name", null)
				.set("email", null)
				.set("message", null)
				.set("phone", null)
				.set("id", null)

		default:

			return state;
	}
}