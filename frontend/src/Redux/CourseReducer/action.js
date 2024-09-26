// redux/CourseReducer/action.js

import {
    GET_COURSE_COUNT_LOADING,
    GET_COURSE_COUNT_SUCCESS,
    GET_COURSE_COUNT_ERROR,
  } from "./actionType";
  import request from "../../utils/request";
  
  // Action pour indiquer que la récupération du count est en cours
  export const getCourseCountLoading = () => {
    return {
      type: GET_COURSE_COUNT_LOADING,
    };
  };
  
  // Action pour succès
  export const getCourseCountSuccess = (count) => {
    return {
      type: GET_COURSE_COUNT_SUCCESS,
      payload: count,
    };
  };
  
  // Action pour erreur
  export const getCourseCountError = (error) => {
    return {
      type: GET_COURSE_COUNT_ERROR,
      payload: error,
    };
  };
  
  // Fonction pour récupérer le nombre de cours depuis l'API
  export const fetchCourseCount = () => (dispatch) => {
    dispatch(getCourseCountLoading());
    return request
      .get(`/courses/count`) // Endpoint pour récupérer le nombre de cours
      .then((response) => {
        const count = response.data.count;
        dispatch(getCourseCountSuccess(count));
      })
      .catch((error) => {
        dispatch(getCourseCountError(error.message));
      });
  };
  