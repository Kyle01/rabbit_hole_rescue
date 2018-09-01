import axios from 'axios';

export const GET_VISIT_ERRORS = 'GET_VISIT_ERRORS';
export const CLEAR_VISIT_ERRORS = 'CLEAR_VISIT_ERRORS';
export const RECEIVE_VISITS = 'RECEIVE_VISITS';
export const RECEIVE_VISIT = 'RECEIVE_VISIT';

export const fetchVisits = (windowId) => dispatch => {
    axios
        .get(`api/visits/`, windowId)
        .then(res => {
            dispatch(receieveVisits(res));
        })
        .catch(err => {
            dispatch(getVisitError(err));
        });
}

export const fetchVisit = (visitId) => dispatch => {
    axios
        .get(`api/visits/${visitId}`)
        .then(res => {
            dispatch(receieveVisit(res));
        })
        .catch(err => {
            dispatch(getVisitError(err));
        });
}

export const receieveVisits = visits => {
    return {
        type: RECEIVE_VISITS,
        visits: visits
    };
};

export const receieveVisit = visit => {
    return {
        type: RECEIVE_VISIT,
        visit: visit
    };
};

export const getVisitError = err => {
    return {
        type: GET_VISIT_ERRORS,
        payload: err.response.data
    };
};