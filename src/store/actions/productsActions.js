import * as actionTypes from "./actionTypes";
import axios from "axios";

// GET PRODUCTS

export const getProductsStart = () => ({
  type: actionTypes.GET_PRODUCTS_START,
  isLoading: true,
});

export const getProductsSuccess = (response) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  response,
  isLoading: false,
});

export const getProductsFail = () => ({
  type: actionTypes.GET_PRODUCTS_FAIL,
  isLoading: false,
});

export const getProducts = () => (dispatch) => {
  dispatch(getProductsStart());
  axios
    .get("https://api.fort-net.org/Objects?IgnorePagination=true")
    .then((response) => {
      dispatch(getProductsSuccess(response.data.result));
    })
    .catch((err) => {
      dispatch(getProductsFail(err));
    });
};

// GET OBJECT TYPES

export const getObjectTypesStart = () => ({
  type: actionTypes.GET_OBJECT_TYPES_START,
  isLoading: true,
});

export const getObjectTypesSuccess = (response) => ({
  type: actionTypes.GET_OBJECT_TYPES_SUCCESS,
  response,
  isLoading: false,
});

export const getObjectTypesFail = () => ({
  type: actionTypes.GET_OBJECT_TYPES_FAIL,
  isLoading: false,
});

export const getObjectTypes = () => (dispatch) => {
  dispatch(getObjectTypesStart());
  axios
    .get("https://api.fort-net.org/ObjectTypes")
    .then((response) => {
      dispatch(getObjectTypesSuccess(response.data.result));
    })
    .catch((err) => {
      dispatch(getObjectTypesFail(err));
    });
};

// GET CITIES

export const getCitiesStart = () => ({
  type: actionTypes.GET_CITIES_START,
  isLoading: true,
});

export const getCitiesSuccess = (response) => ({
  type: actionTypes.GET_CITIES_SUCCESS,
  response,
  isLoading: false,
});

export const getCitiesFail = () => ({
  type: actionTypes.GET_CITIES_FAIL,
  isLoading: false,
});

export const getCities = () => (dispatch) => {
  dispatch(getCitiesStart());
  axios
    .get("https://api.fort-net.org/Cities")
    .then((response) => {
      dispatch(getCitiesSuccess(response.data.result));
    })
    .catch((err) => {
      dispatch(getCitiesFail(err));
    });
};

export const resetFilters = () => ({
  type: actionTypes.RESET_FILTERS,
});
export const setProducts = () => ({
  type: actionTypes.SET_PRODUCTS,
});

export const setSelectedType = (objectType) => ({
  type: actionTypes.SET_SELECTED_TYPE,
  objectType,
});
export const setSelectedCity = (CityId) => ({
  type: actionTypes.SET_SELECTED_CITY,
  CityId,
});
export const setEnteredText = (enteredText) => ({
  type: actionTypes.SET_ENTERED_TEXT,
  enteredText,
});

// SEARCH

export const getFilteredResultsStart = () => ({
  type: actionTypes.GET_FILTERED_RESULTS_START,
  isLoading: true,
});

export const getFilteredResultsSuccess = (response, selectedObjectType) => ({
  type: actionTypes.GET_FILTERED_RESULTS_SUCCESS,
  response,
  selectedObjectType,
  isLoading: false,
});

export const getFilteredResultsFail = () => ({
  type: actionTypes.GET_FILTERED_RESULTS_FAIL,
  isLoading: false,
});

export const getFilteredResults = (queryParams) => (dispatch) => {
  dispatch(getFilteredResultsStart());
  axios
    .get(`https://api.fort-net.org/Objects`, {
      params: {
        ...queryParams,
        IgnorePagination: true,
      },
    })
    .then((response) => {
      dispatch(getFilteredResultsSuccess(response.data.result, queryParams));
    })
    .catch((err) => {
      dispatch(getFilteredResultsFail(err));
    });
};

// ENABLED TYPES

export const getEnabledTypesStart = () => ({
  type: actionTypes.GET_ENABLED_TYPES_START,
  isLoading: true,
});

export const getEnabledTypesSuccess = (response, queryParams) => ({
  type: actionTypes.GET_ENABLED_TYPES_SUCCESS,
  response,
  queryParams,
  isLoading: false,
});

export const getEnabledTypesFail = () => ({
  type: actionTypes.GET_ENABLED_TYPES_FAIL,
  isLoading: false,
});

export const getEnabledTypes = (queryParams) => (dispatch) => {
  dispatch(getEnabledTypesStart());
  axios
    .get(`https://api.fort-net.org/Objects`, {
      params: {
        ...queryParams,
        IgnorePagination: true,
      },
    })
    .then((response) => {
      dispatch(getEnabledTypesSuccess(response.data.result, queryParams));
    })
    .catch((err) => {
      dispatch(getEnabledTypesFail(err));
    });
};
