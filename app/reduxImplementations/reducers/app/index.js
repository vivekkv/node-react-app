import { fromJS, List } from 'immutable';
import { buildNewState } from 'reduxImplementations/reduxStateHelper';
import { LOCATION_CHANGE } from 'react-router-redux';

var initialState = fromJS({

});
  
export default function appReducer(state = initialState, action) {

    switch (action.type) {

        case LOCATION_CHANGE: 

            if(document.getElementsByClassName("navbar-collapse")[0]) {

                document.getElementsByClassName("navbar-collapse")[0].classList.remove("in");               
            }
                

            return state;   

        default: 

            return state;
    }
}

