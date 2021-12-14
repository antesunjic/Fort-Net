import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getObjectTypes,
  getProducts,
} from "../../../../store/actions/productsActions";

import CitiesFilter from "./CitiesFilter/CitiesFilter";
import ObjectTypeSelect from "./ObjectTypeSelect/ObjectTypeSelect";
import Search from "../Filters/Search/Search";
import FiltersLaptop from "./FiltersLaptop/FiltersLaptop";

import "../Filters/Search/Search.scss";
import "../Maps.scss";
import "./Filters.scss";

const Filters = ({ isDesktopView }) => {
  const dispatch = useDispatch();
  const objectType = useSelector((state) => state.objectTypes);
  const cities = useSelector((state) => state.cities);
  const allProducts = useSelector((state) => state.allProducts);
  const selectedObjectType = useSelector((state) => state.selectedObjectType);
  const selectedCity = useSelector((state) => state.selectedCity);
  const enteredText = useSelector((state) => state.enteredText);

  if (
    selectedObjectType.objectType === null &&
    selectedCity.CityId === null &&
    enteredText === ""
  ) {
    for (let i in objectType) {
      objectType[i].isDisabled = false;
    }
    for (let i in cities) {
      cities[i].isDisabled = false;
    }
  }

  useEffect(() => {
    if (
      selectedObjectType.objectType === null &&
      selectedCity.CityId === null &&
      allProducts.length === 0
    ) {
      dispatch(getProducts());
    }
  }, [
    selectedObjectType.objectType,
    selectedCity.CityId,
    dispatch,
    allProducts,
  ]);

  useEffect(() => {
    if (cities.length === 1) {
      dispatch(getCities());
    }
  }, [cities, dispatch]);

  useEffect(() => {
    if (objectType.length === 0) {
      dispatch(getObjectTypes());
    }
  }, [dispatch, objectType]);

  if (objectType.length > 0) {
    for (let i in objectType) {
      if (objectType[i].name === "Object") {
        objectType[i].label = "Sve";
        objectType[i].objectType = null;
      }
      if (objectType[i].name === "Accommodation") {
        objectType[i].label = "Smještaj";
      }
      if (objectType[i].name === "EnoGastro") {
        objectType[i].label = "EnoGastro";
      }
      if (objectType[i].name === "Heritage") {
        objectType[i].label = "Baština";
      }
      if (objectType[i].name === "Tourism") {
        objectType[i].label = "Aktivni turizam";
      }
    }
  }

  return isDesktopView ? (
    <div className="desktopView">
      <FiltersLaptop />
    </div>
  ) : (
    <div>
      <ObjectTypeSelect />
      <CitiesFilter cities={cities} />
      <Search />
    </div>
  );
};

export default Filters;
