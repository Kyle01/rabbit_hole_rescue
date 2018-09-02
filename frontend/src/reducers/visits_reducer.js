import {
    RECEIVE_VISITS, RECEIVE_VISIT
} from '../util/visit_api_util';
import merge from 'lodash/merge';

const visitsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_VISIT:
            return merge({}, state, { [action.visit.id]: action.visit });
        case RECEIVE_VISITS:
            let visits = action.visits.data.visits;
            return merge({}, state, visits);
        default:
            return state;
    }
}

export default visitsReducer;