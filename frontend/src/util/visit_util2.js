import axios from 'axios';

export const GET_VISIT_ERRORS = 'GET_VISIT_ERRORS';
export const CLEAR_VISIT_ERRORS = 'CLEAR_VISIT_ERRORS';
export const RECEIVE_VISIT = 'RECEIVE_HISTORY';

export const createVisit = visitData => dispatch => {
    axios
        .post('api/visits/', visitData)
        .then(res => {
            dispatch()
        })
        .catch(err =>
            dispatch({
                type: GET_VISIT_ERRORS,
                payload: err
            })
            
        );
};
