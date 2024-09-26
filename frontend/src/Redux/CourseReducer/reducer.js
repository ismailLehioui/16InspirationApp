// redux/CourseReducer/reducer.js

import {
    GET_COURSE_COUNT_LOADING,
    GET_COURSE_COUNT_SUCCESS,
    GET_COURSE_COUNT_ERROR,
  } from "./actionType";
  
  const initialState = {
    count: 0, // Nombre initial de cours
    loading: false,
    error: null,
  };
  
  const courseReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_COURSE_COUNT_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_COURSE_COUNT_SUCCESS:
        return {
          ...state,
          count: payload,
          loading: false,
          error: null,
        };
  
      case GET_COURSE_COUNT_ERROR:
        return {
          ...state,
          loading: false,
          error: payload,
        };
  
      default:
        return state;
    }
  };
  
  export default courseReducer;
  