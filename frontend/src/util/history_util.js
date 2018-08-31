import axios from 'axios';
// const $ = window.$;

export const GET_HISTORY_ERRORS = 'GET_HISTORY_ERRORS';
export const CLEAR_HISTORY_ERRORS = 'CLEAR_HISTORY_ERRORS';
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY';

export const fetchHistory = (date) => dispatch => {
    axios
        .get(`api/history/${date}`)
        .then(res => {
            dispatch()
        })
        .catch(err => 
            dispatch({
                type: GET_HISTORY_ERRORS,
                payload: err.response.data
            })
        );
}

export const receieveHistory = history => {
    return {
        type: RECEIVE_HISTORY,
        history: history
    };
};