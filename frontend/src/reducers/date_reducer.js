import { RECEIVE_WINDOWS } from '../util/window_api_util';
import merge from 'lodash/merge';

const dateReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WINDOWS:

            let windows = getWindowIds(action.windows.data.windows);
            // let dayObject = new Date(action.windows.data.windows[0].date);
            // let dayString = dayObject.toDateString();
            // let obj = {};
            // obj["webname"] = dayString;
            // obj["url"] = "";
            // obj["description"] = `Search history for ${dayString}`;
            // obj["children"] = windows;
            return merge({}, state, windows);
        default:
            return state;
    }
}

export default dateReducer;

const getWindowIds = function(window_array){
    let result = {};
    window_array.forEach( window => {
        let date = new Date(window.date).toDateString()
        if (result[date]){
          result[date].push(window.id)
        } else {
          result[date] = [window.id]
        }
    })
    return result;
}
