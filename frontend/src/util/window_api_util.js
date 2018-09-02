import axios from 'axios';
// const $ = window.$;

export const GET_WINDOW_ERRORS = 'GET_WINDOW_ERRORS';
export const CLEAR_WINDOW_ERRORS = 'CLEAR_WINDOW_ERRORS';
export const RECEIVE_WINDOWS = 'RECEIVE_WINDOWS';

export const fetchWindows = (username) => dispatch => {
    axios
        .get(`api/windows/${username}`)
        .then(res => {
            dispatch(receieveWindows(res));
        })
        .catch(err => 
            dispatch({
                type: GET_WINDOW_ERRORS,
                payload: err.response.data
            })
        );
}

///need a dayId for the date reducer
export const receieveWindows = (windows, dayId) => {
    return {
        type: RECEIVE_WINDOWS,
        windows: windows,
        dayId: dayId
    };
};