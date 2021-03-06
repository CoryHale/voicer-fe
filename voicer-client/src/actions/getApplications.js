import axiosWithAuth from '../components/axiosAuth';
import { dbUrl } from './index';
//replace dbUrl in index.js to change backend server for testing

export const GET_JOB_OFFERS_START = 'GET_JOB_OFFERS_START';
export const GET_JOB_OFFERS_SUCCESS = 'GET_JOB_OFFERS_SUCCESS';
export const GET_JOB_OFFERS_FAILED = 'GET_JOB_OFFERS_FAILED';

export const getApplications = jobId => async dispatch => {
  dispatch({ type: GET_JOB_OFFERS_START });
  await axiosWithAuth()
    .get(`${dbUrl}/api/jobs/${jobId}/offers`)
    .then(res => {
      dispatch({
        type: GET_JOB_OFFERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_JOB_OFFERS_FAILED,
        payload: err
      });
    });
};

export const getApplicationsByClientId = clientId => async dispatch => {
  dispatch({ type: GET_JOB_OFFERS_START });
  await axiosWithAuth()
    .get(`${dbUrl}/api/jobs/client/${clientId}/offers`)
    .then(res => {
      dispatch({
        type: GET_JOB_OFFERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_JOB_OFFERS_FAILED,
        payload: err
      });
    });
};
