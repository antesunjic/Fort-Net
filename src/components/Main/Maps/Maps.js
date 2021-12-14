import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnabledTypes,
  getFilteredResults,
  setProducts,
} from "../../../store/actions/productsActions";
import Filters from "../Maps/Filters/Filters";
import GoogleMap from "../Maps/GoogleMap/Map";
import Products from "../Maps/Products/Products";

import Search from "../Maps/Filters/Search/Search";

import "./Maps.scss";

const Maps = () => {
  const [isDesktopView, setIsDesktopView] = useState(
    window.matchMedia("(min-width: 770px)").matches
  );
  const cities = useSelector((state) => state.cities);
  const objectTypes = useSelector((state) => state.objectTypes);

  const selectedObjectType = useSelector((state) => state.selectedObjectType);
  const selectedCity = useSelector((state) => state.selectedCity);
  const enteredText = useSelector((state) => state.enteredText);

  const allProducts = useSelector((state) => state.allProducts);
  const isLoading = useSelector((state) => state.isLoading);
  const filteredResults = useSelector((state) => state.filteredResults);
  const enabledObjectType = useSelector((state) => state.enabledObjectType);
  const enabledCitiesSearch = useSelector((state) => state.enabledCitiesSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    window
      .matchMedia("(min-width: 770px)")
      .addEventListener("change", (e) => setIsDesktopView(e.matches));
  }, []);

  useEffect(() => {
    if (
      selectedObjectType.objectType === null &&
      selectedCity.CityId === null &&
      enteredText === "" &&
      allProducts.length > 0
    ) {
      dispatch(setProducts());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [
    enteredText,
    selectedObjectType.objectType,
    selectedCity.CityId,
    allProducts.length,
    dispatch,
  ]);

  useEffect(() => {
    if (!selectedObjectType.objectType) {
      for (let i in objectTypes) {
        objectTypes[i].isDisabled = false;
      }
    }
    if (!selectedCity.CityId) {
      for (let i in cities) {
        cities[i].isDisabled = false;
      }
    }
  }, [selectedObjectType, cities, selectedCity.CityId, objectTypes]);

  useEffect(() => {
    if (enteredText || selectedObjectType.objectType || selectedCity.CityId) {
      dispatch(
        getFilteredResults({
          objectType: selectedObjectType.objectType,
          CityId: selectedCity?.CityId,
          Text: enteredText,
        })
      );
    }
  }, [
    enteredText,
    selectedObjectType.objectType,
    selectedCity.CityId,
    dispatch,
  ]);

  useEffect(() => {
    if (
      enteredText?.length > 0 &&
      (enabledObjectType?.length === 0 || enabledCitiesSearch?.length === 0)
    ) {
      const timer = setTimeout(() => {
        if (
          enteredText?.length > 0 &&
          filteredResults.length === 0 &&
          (selectedObjectType.objectType !== null ||
            selectedCity.CityId !== null)
        ) {
          dispatch(
            getEnabledTypes({
              Text: enteredText,
            })
          );
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    enteredText,
    enabledObjectType,
    enabledCitiesSearch,
    filteredResults,
    selectedObjectType.objectType,
    selectedCity.CityId,
    dispatch,
  ]);

  return (
    <>
      <div
        className={isLoading || allProducts.length === 0 ? "blurry" : "flex"}
      >
        <Filters isDesktopView={isDesktopView} />
        {isDesktopView ? (
          <div className="desktopView">
            <div className="desktopSearchAndProducts">
              <Search />
              <Products />
            </div>
            <GoogleMap />
          </div>
        ) : (
          <div>
            <GoogleMap />
            <Products />
          </div>
        )}
      </div>
    </>
  );
};

export default Maps;
