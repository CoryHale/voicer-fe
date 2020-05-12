import axiosWithAuth from '../components/axiosAuth';
import axios from 'axios';
import { dbUrl } from './index';
//replace dbUrl in index.js to change backend server address

export const REGISTER_START = 'REGISTER-START';
export const REGISTER_SUCCESS = 'REGISTER-SUCCESS';
export const REGISTER_FAILED = 'REGISTER-FAILED';

export const CREATE_PROFILE_START = 'CREATE_PROFILE_START';
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_FAILURE = 'CREATE_PROFILE_FAILURE';

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  if (!creds.username) {
    dispatch({ type: REGISTER_FAILED, error: 'Please enter a username' });
  }
  if (!creds.password) {
    dispatch({ type: REGISTER_FAILED, error: 'Please enter a password' });
  }
  if (!creds.firstName) {
    dispatch({
      type: REGISTER_FAILED,
      error: 'Please enter your first name'
    });
  }
  if (!creds.lastName) {
    dispatch({
      type: REGISTER_FAILED,
      error: 'Please enter your last name'
    });
  }
  if (!creds.email.includes('@') && !creds.email.includes('.')) {
    dispatch({
      type: REGISTER_FAILED,
      error: 'Please enter a correct email'
    });
  }
  return axios
    .post(`${dbUrl}/api/auth/register`, creds) // CHANGE URL
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: 'SUCCEED'
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILED,
        payload: err
      });
    });
};

export const createClientProfile = creds => dispatch => {
  dispatch({ type: CREATE_PROFILE_START });
  return axiosWithAuth()
    .post(`${dbUrl}/api/clients/`, creds)
    .then(res => dispatch({ type: CREATE_PROFILE_SUCCESS }))
    .catch(err => {
      console.log(err);
      return dispatch({ type: CREATE_PROFILE_FAILURE });
    });
};

export const createTalentProfile = creds => dispatch => {
  dispatch({ type: CREATE_PROFILE_START });
  return axiosWithAuth()
    .post(`${dbUrl}/api/talents/`, creds)
    .then(res => dispatch({ type: CREATE_PROFILE_SUCCESS }))
    .catch(err => {
      console.log(err);
      return dispatch({ type: CREATE_PROFILE_FAILURE });
    });
};
