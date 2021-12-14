import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  allProducts: [],
  cities: [{ id: null, name: "Sve" }],
  objectTypes: [],
  selectedObjectType: {
    objectType: null,
    CityId: null,
    name: "Sve",
  },
  selectedCity: { CityId: null },
  filteredResults: [],
  enteredText: "",
  isLoading: false,
  enabledCitiesSearch: [],
  enabledCitiesSelect: [],
  reseting: false,
};

const enableObjectTypes = (result, objectTypes) => {
  const enabledObjectTypesSelect = [];
  for (let i = 0; i < result.length; i++) {
    enabledObjectTypesSelect.push(result[i].objectType);
    if (enabledObjectTypesSelect.indexOf(result[i].objectType) === -1) {
      enabledObjectTypesSelect.push(result[i].objectType);
    }
  }
  for (let i in objectTypes) {
    if (enabledObjectTypesSelect.includes(objectTypes[i].objectType)) {
      objectTypes[i].isDisabled = false;
    } else {
      objectTypes[i].isDisabled = true;
    }
    objectTypes[0].isDisabled = false;
  }
};
const enableCities = (result, cities) => {
  const enabledCitiesSearch = [];
  for (let i = 0; i < result.length; i++) {
    if (enabledCitiesSearch.indexOf(result[i].location.cityID) === -1) {
      enabledCitiesSearch.push(result[i].location.cityID);
    }
  }
  for (let i in cities) {
    if (enabledCitiesSearch.includes(cities[i].id)) {
      cities[i].isDisabled = false;
    } else {
      cities[i].isDisabled = true;
    }
    cities[0].isDisabled = false;
  }
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    //TYPES
    case actionTypes.GET_OBJECT_TYPES_START:
      return { ...state, isLoading: action.isLoading };
    case actionTypes.GET_OBJECT_TYPES_SUCCESS:
      return {
        ...state,
        objectTypes: action.response,
      };
    case actionTypes.GET_OBJECT_TYPES_FAIL:
      return { ...state, isLoading: action.isLoading };

    //CITIES
    case actionTypes.GET_CITIES_START:
      return { ...state, isLoading: action.isLoading };
    case actionTypes.GET_CITIES_SUCCESS:
      return {
        ...state,
        cities: state.cities.concat(action.response),
        isLoading: action.isLoading,
      };
    case actionTypes.GET_CITIES_FAIL:
      return { ...state, isLoading: action.isLoading };
    case actionTypes.SET_SELECTED_TYPE:
      return { ...state, selectedObjectType: action.objectType };
    case actionTypes.SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.CityId,
      };
    case actionTypes.SET_ENTERED_TEXT:
      return {
        ...state,
        enteredText: action.enteredText,
      };

    // SET AND RESET
    case actionTypes.RESET_FILTERS:
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: state.allProducts,
        selectedObjectType: {
          objectType: null,
          CityId: null,
          name: "Svi tipovi",
        },
        filteredResults: [],
        selectedCity: { CityId: null },
        enteredText: "",
        reseting: true,
      };

    //GET ALL PRODUCTS
    case actionTypes.GET_PRODUCTS_START:
      return { ...state, isLoading: action.isLoading };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.response,
        allProducts: action.response,
        filteredResults: [],
        enteredText: "",
        isLoading: action.isLoading,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return { ...state, isLoading: action.isLoading };

    //FILTERING:
    case actionTypes.GET_FILTERED_RESULTS_START:
      return {
        ...state,
        isLoading: action.isLoading,
        enabledCitiesSelect: [],
        enabledCitiesSearch: [],
        reseting: false,
      };

    case actionTypes.GET_FILTERED_RESULTS_SUCCESS:
      if (action.response.length > 0) {
        //imamo samo city select, nemamo druga 2
        if (
          action.selectedObjectType.CityId &&
          !action.selectedObjectType.objectType &&
          !action.selectedObjectType.Text
        ) {
          enableObjectTypes(action.response, state.objectTypes);
        }
        //imamo samo type select, nemamo druga 2
        if (
          action.selectedObjectType.objectType &&
          !action.selectedObjectType.CityId &&
          !action.selectedObjectType.Text
        ) {
          enableCities(action.response, state.cities);
        }

        //imamo oba selecta, nemamo search
        if (
          action.selectedObjectType.objectType &&
          action.selectedObjectType.CityId &&
          !action.selectedObjectType.Text
        ) {
          const enabledObjectTypesSelect = [];
          for (let i = 0; i < state.allProducts.length; i++) {
            if (
              state.allProducts[i].location.cityID ===
              action.selectedObjectType.CityId
            ) {
              if (
                enabledObjectTypesSelect.indexOf(
                  state.allProducts[i].objectType
                ) === -1
              ) {
                enabledObjectTypesSelect.push(state.allProducts[i].objectType);
              }
            }
          }
          for (let i in state.objectTypes) {
            if (
              enabledObjectTypesSelect.includes(state.objectTypes[i].objectType)
            ) {
              state.objectTypes[i].isDisabled = false;
            } else {
              state.objectTypes[i].isDisabled = true;
            }
            state.objectTypes[0].isDisabled = false;
            state.cities[0].isDisabled = false;
          }

          //cities za oba selecta bez search
          const enabledCitiesSelect = [];
          for (let i = 0; i < state.allProducts.length; i++) {
            if (
              state.allProducts[i].objectType ===
              action.selectedObjectType.objectType
            ) {
              if (
                enabledCitiesSelect.indexOf(
                  state.allProducts[i].location.cityID
                ) === -1
              ) {
                enabledCitiesSelect.push(state.allProducts[i].location.cityID);
              }
              for (let i in state.cities) {
                if (enabledCitiesSelect.includes(state.cities[i].id)) {
                  state.cities[i].isDisabled = false;
                } else {
                  state.cities[i].isDisabled = true;
                }
                state.objectTypes[0].isDisabled = false;
                state.cities[0].isDisabled = false;
              }
            }
          }
        }

        if (action.selectedObjectType.Text) {
          enableObjectTypes(action.response, state.objectTypes);
          enableCities(action.response, state.cities);
        }
      }

      return {
        ...state,
        products: [],
        filteredResults: action.response,
        isLoading: action.isLoading,
      };

    case actionTypes.GET_FILTERED_RESULTS_FAIL:
      return { ...state, isLoading: action.isLoading };

    case actionTypes.GET_ENABLED_TYPES_START:
      return { ...state };

    case actionTypes.GET_ENABLED_TYPES_SUCCESS:
      enableObjectTypes(action.response, state.objectTypes);
      const enabledObjectTypes = [];
      for (let i = 0; i < action.response.length; i++) {
        if (enabledObjectTypes.indexOf(action.response[i].objectType) === -1) {
          enabledObjectTypes.push(action.response[i].objectType);
        }
      }
      for (let i in state.objectTypes) {
        if (enabledObjectTypes.includes(state.objectTypes[i].objectType)) {
          state.objectTypes[i].isDisabled = false;
        } else {
          state.objectTypes[i].isDisabled = true;
        }
        state.objectTypes[0].isDisabled = false;
        state.cities[0].isDisabled = false;
      }

      // enabled cities options:
      const enabledCitiesSearch = [];
      for (let i = 0; i < action.response.length; i++) {
        if (
          enabledCitiesSearch.indexOf(action.response[i].location.cityID) === -1
        ) {
          enabledCitiesSearch.push(action.response[i].location.cityID);
        }
      }
      for (let i in state.cities) {
        if (enabledCitiesSearch.includes(state.cities[i].id)) {
          state.cities[i].isDisabled = false;
        } else {
          state.cities[i].isDisabled = true;
        }
        state.objectTypes[0].isDisabled = false;
        state.cities[0].isDisabled = false;
      }

      return {
        ...state,
        filteredResults: [],
        products: [],
        enabledObjectTypes: enabledObjectTypes,
        enabledCitiesSearch: enabledCitiesSearch,
      };

    case actionTypes.GET_ENABLED_TYPES_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default productReducer;
