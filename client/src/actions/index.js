import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAMS,
    FETCH_SINGLE_STREAM
} from './types';

import streams from '../api/stream';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });

    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    });
};

export const fetchSingleStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({
        type: FETCH_SINGLE_STREAM,
        payload: response.data
    });
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });
};

export const deleteStream = (id) => async dispatch => {
    const response = await streams.delete(`/streams/${id}`);

    dispatch({
        type: DELETE_STREAM,
        payload: response.data
    });
};
