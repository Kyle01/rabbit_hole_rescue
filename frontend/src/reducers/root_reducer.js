import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorsReducer from './errors_reducer';
import windowsReducer from './windows_reducer';
import visitsReducer from './visits_reducer';
import dateReducer from './date_reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    visits: visitsReducer,
    windows: windowsReducer,
    date: dateReducer
});

export default rootReducer;