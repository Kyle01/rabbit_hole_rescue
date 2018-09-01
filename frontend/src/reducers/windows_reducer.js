import { RECEIVE_WINDOWS } from '../util/window_api_util';
import merge from 'lodash/merge';

const windowsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WINDOWS:
            return merge({}, state, action.windows);
        default:
            return state;
    }
}

export default windowsReducer;