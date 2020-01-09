import axiosWithAuth from '../components/axiosAuth';
import axios from 'axios';
import { dbUrl } from './index';
//replace dbUrl in index.js to change backend server for testing

export const GET_LANGUAGES_START = 'GET_TALENT_LANGUAGES';
export const GET_LANGUAGES_SUCESS = 'GET_LANGUAGES_SUCCESS';
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE';

export const ADD_TALENT_LANGUAGE_START = 'ADD_TALENT_LANGUAGE_START';
export const ADD_TALENT_LANGUAGE_SUCCESS = 'ADD_TALENT_LANGUAGE_SUCCESS';
export const ADD_TALENT_LANGUAGE_FAIL = 'ADD_TALENT_LANGUAGE_FAIL';

export const GET_PREV_TLANG_START = 'GET_PREV_TLANG_START';
export const GET_PREV_TLANG_SUCCESS = 'GET_PREV_TLANG_SUCCESS';
export const GET_PREV_TLANG_FAIL = 'GET_PREV_TLANG_FAIL';

export const DEL_PREV_TLANG_START = 'DEL_PREV_TLANG_START';
export const DEL_PREV_TLANG_SUCCESS = 'DEL_PREV_TLANG_SUCCESS';
export const DEL_PREV_TLANG_FAIL = 'DEL_PREV_TLANG_FAIL';

export const addTalentLanguage = newTalentLanguage => dispatch => {
  dispatch({ type: ADD_TALENT_LANGUAGE_START });
  return axiosWithAuth()
    .post(`${dbUrl}/api/talents/talentLanguage`, newTalentLanguage)
    .then(res => dispatch({ type: ADD_TALENT_LANGUAGE_SUCCESS }))
    .catch(err => {
      console.log(err);
      return dispatch({ type: ADD_TALENT_LANGUAGE_FAIL });
    });
};

export const getLanguages = () => dispatch => {
  dispatch({ type: GET_LANGUAGES_START });
  return axiosWithAuth()
    .get(`${dbUrl}/api/talents/languages`)
    .then(res => {
      dispatch({
        type: GET_LANGUAGES_SUCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_LANGUAGES_SUCESS,
        payload: err
      });
    });
};

export const getPrevTLang = userId => dispatch => {
  dispatch({ type: GET_PREV_TLANG_START });
  return axiosWithAuth()
    .get(`${dbUrl}/api/talents/talentLanguage/${userId}`)
    .then(res => {
      dispatch({ type: GET_PREV_TLANG_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_PREV_TLANG_FAIL,
        payload: err
      });
    });
};

export const delPrevTLang = talentLanguageId => dispatch => {
  dispatch({ type: DEL_PREV_TLANG_START });
  return axiosWithAuth()
    .delete(`${dbUrl}/api/talents/talentLanguage/${talentLanguageId}`)
    .then(res => {
      dispatch({ type: DEL_PREV_TLANG_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: DEL_PREV_TLANG_FAIL, payload: err });
    });
};
