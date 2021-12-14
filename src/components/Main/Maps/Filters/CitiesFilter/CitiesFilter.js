import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { setSelectedCity } from "../../../../../store/actions/productsActions";

import "../ObjectTypeSelect/ObjectTypeSelect.scss";

const CitiesFilter = () => {
  const cities = useSelector((state) => state.cities);

  const dispatch = useDispatch();
  const selectedCityHandler = (value) => {
    dispatch(
      setSelectedCity({
        CityId: value.id,
      })
    );
  };

  return (
    <div className="mobileFilters">
      <Select
        className="select"
        menuPlacement="top"
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        defaultValue={{ name: "Sve lokacije", id: 0 }}
        options={cities}
        onChange={(value) => selectedCityHandler(value)}
      />
    </div>
  );
};

export default CitiesFilter;
