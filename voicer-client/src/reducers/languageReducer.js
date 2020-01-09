import {
  GET_LANGUAGES_START,
  GET_LANGUAGES_SUCESS,
  GET_LANGUAGES_FAILURE,
  ADD_TALENT_LANGUAGE_START,
  ADD_TALENT_LANGUAGE_SUCCESS,
  ADD_TALENT_LANGUAGE_FAIL,
  GET_PREV_TLANG_START,
  GET_PREV_TLANG_SUCCESS,
  GET_PREV_TLANG_FAIL,
  GET_JOBS_SUCCESS
} from '../actions';

const initialState = {
  languages: null,
  error: null,
  talentLanguages: null,
  prevLanguages: []
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGUAGES_START:
      return {
        ...state,
        error: null
      };
    case GET_LANGUAGES_SUCESS:
      return {
        ...state,
        languages: action.payload,
        error: null
      };
    case GET_LANGUAGES_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case ADD_TALENT_LANGUAGE_START:
      return {
        ...state,
        error: null
      };
    case ADD_TALENT_LANGUAGE_SUCCESS:
      return {
        ...state
      };
    case ADD_TALENT_LANGUAGE_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case GET_PREV_TLANG_START:
      return {
        ...state,
        error: null,
        prevLanguages: []
      };
    case GET_PREV_TLANG_SUCCESS:
      return {
        ...state,
        prevLanguages: action.payload
      };
    case GET_PREV_TLANG_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
