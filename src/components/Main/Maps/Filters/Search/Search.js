import React, { useEffect, useRef, useState } from "react";
import "./Search.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setEnteredText,
  setProducts,
} from "../../../../../store/actions/productsActions";

import searchIcon from "../../../../../assets/search.svg";

const Input = () => {
  const selectedObjectType = useSelector((state) => state.selectedObjectType);
  const allProducts = useSelector((state) => state.allProducts);
  const selectedCity = useSelector((state) => state.selectedCity);
  const filteredResults = useSelector((state) => state.filteredResults);
  const reseting = useSelector((state) => state.reseting);
  const objectTypes = useSelector((state) => state.objectTypes);

  const dispatch = useDispatch();
  const [enteredText, setEnteredInputText] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    reseting && setEnteredInputText("");
  }, [reseting]);

  useEffect(() => {
    if (
      selectedObjectType.objectType === null &&
      selectedCity.CityId === null &&
      enteredText.Text === "" &&
      filteredResults.length === 0 &&
      allProducts.length > 0
    ) {
      dispatch(setProducts());
    }
  }, [
    enteredText,
    allProducts,
    dispatch,
    selectedCity,
    selectedObjectType,
    filteredResults,
  ]);

  useEffect(() => {
    if (objectTypes.length !== 0) {
      if (enteredText?.length > 0) {
        const timer = setTimeout(() => {
          if (
            enteredText?.length > 0 &&
            enteredText === inputRef.current.value
          ) {
            dispatch(setEnteredText(enteredText));
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      } else {
        if (allProducts) {
          dispatch(setEnteredText(""));
        }
      }
    }
  }, [enteredText, dispatch]);

  return (
    <div className="wholeDesktopSearch">
      <h2 className="searchDesktopLabel">Search</h2>
      <div className="Desktop">
        <img alt="Slika" className="searchIcon" src={searchIcon} />
        <input
          className="input"
          type="text"
          value={enteredText}
          onChange={(e) => setEnteredInputText(e.target.value)}
          placeholder="Upišite..."
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Input;
