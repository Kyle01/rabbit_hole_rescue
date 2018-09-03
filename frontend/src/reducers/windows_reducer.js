import { RECEIVE_WINDOWS } from '../util/window_api_util';
import merge from 'lodash/merge';

const windowsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WINDOWS:
            // debugger
            let windows = action.windows.data.windows;
            let windowObject = parseWindows(windows);

            return merge({}, state, windowObject);
        default:
            return state;
    }
}

export default windowsReducer;

const parseWindows = function(window_array){
    let windowObject = {};
    window_array.forEach( window => {
        window.visits.shift();
        let visits = window.visits.filter(onlyUnique);
        window["visits"] = visits;
        window["webname"] = `Window${window.id}`;
        window["url"] = "";
        window["description"] = `Browse Window Visits`;

        windowObject[window.id] = window;
    })
    return windowObject;
}



function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}