import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../../../../../store/actions/productsActions";
import FilterCity from "./FilterCity/FilterCity";

import "./FiltersLaptop.scss";
import FilterType from "./FilterType/FilterType";

const FiltersLaptop = ({ setSelectedCity }) => {
  const objectType = useSelector((state) => state.objectTypes);
  const cities = useSelector((state) => state.cities);
  const selectedObjectType = useSelector((state) => state.selectedObjectType);
  const selectedCity = useSelector((state) => state.selectedCity);
  const dispatch = useDispatch();

  const typeButton = objectType.map((objectType) => (
    <FilterType
      key={objectType.objectType}
      objectType={objectType}
      typeName={objectType.label}
    />
  ));

  const cityButton = cities.map((city) => (
    <FilterCity
      key={city.name}
      city={city}
      cityName={city.name}
      setSelectedCity={setSelectedCity}
    />
  ));

  const resetHandler = () => {
    dispatch(resetFilters());
  };

  let isResetDisabled = "resetButton";

  if (!selectedCity?.CityId && !selectedObjectType?.objectType) {
    isResetDisabled = "resetButtonDisabled";
  }

  return (
    <>
      <div className="filters">
        <div className="filtersLaptop">
          <h3>Tip</h3>
          <div className="objectTypeLaptop">{typeButton}</div>
          <h3>Lokacija</h3>
          <div className="objectTypeLaptop">{cityButton}</div>
        </div>
        <button className={isResetDisabled} onClick={resetHandler}>
          RESET
        </button>
      </div>
    </>
  );
};

export default FiltersLaptop;
