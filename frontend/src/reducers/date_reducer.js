import { RECEIVE_WINDOWS } from '../util/window_api_util';
import merge from 'lodash/merge';

const dateReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WINDOWS:
            let windows = Object.keys(action.windows);
            let dayObject = {[action.dayId]: windows};
            return merge({}, state, dayObject);
        default:
            return state;
    }
}

export default dateReducer;