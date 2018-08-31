import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorsReducer from './errors_reducer';
import historyReducer from './history_reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    history: historyReducer
});

export default rootReducer;