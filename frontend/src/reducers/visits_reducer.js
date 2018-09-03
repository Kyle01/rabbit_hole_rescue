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
            let visitObject = parseVisits(visits);
            return merge({}, state, visitObject);
        default:
            return state;
    }
}

export default visitsReducer;

const parseVisits = function(visit_array){
    let visitObject = {};
    visit_array.forEach( visit => {
        if (visit.children[0] === null){
            visit.children.shift();
        }
        visit["webname"] = visit.url.split('/')[2];
        visit["description"] = visit.title;
        visitObject[visit.id] = visit;
    })
    return visitObject;
}