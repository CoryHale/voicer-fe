import {
  GET_ACCENTS_START,
  GET_ACCENTS_SUCCESS,
  GET_ACCENTS_FAIL,
  ADD_TALENT_ACCENT_START,
  ADD_TALENT_ACCENT_SUCCESS,
  ADD_TALENT_ACCENT_FAIL,
  GET_PREV_TACC_START,
  GET_PREV_TACC_SUCCESS,
  GET_PREV_TACC_FAIL
} from '../actions';

const initialState = {
  accents: [],
  error: null,
  talentAccents: [],
  prevAccents: []
};

export const accentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCENTS_START:
      return {
        ...state,
        error: null
      };
    case GET_ACCENTS_SUCCESS:
      return {
        ...state,
        accents: action.payload,
        error: null
      };
    case GET_ACCENTS_FAIL:
      return {
        ...state,
        error: null
      };
    case ADD_TALENT_ACCENT_START:
      return {
        ...state,
        error: null
      };
    case ADD_TALENT_ACCENT_SUCCESS:
      return {
        ...state
      };
    case ADD_TALENT_ACCENT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case GET_PREV_TACC_START:
      return {
        ...state,
        error: null
      };
    case GET_PREV_TACC_SUCCESS:
      return {
        ...state,
        prevAccents: action.payload
      };
    case GET_PREV_TACC_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
