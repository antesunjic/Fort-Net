import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "../../../../../../store/actions/productsActions";

import "../FiltersLaptop.scss";

const FilterCity = ({ cityName, city }) => {
  const selectedCity = useSelector((state) => state.selectedCity);

  const dispatch = useDispatch();

  const [isCityActive, setCityActive] = useState(false);

  let cityButtonClass = "objectTypeLaptopButton";

  if (
    selectedCity?.CityId === city?.id ||
    (city.CityId === null && selectedCity.CityId === null)
  ) {
    cityButtonClass = "objectTypeLaptopButtonActive";
  }
  const cityButtonHandler = () => {
    if (selectedCity.CityId === city.id) {
      dispatch(
        setSelectedCity({
          CityId: null,
        })
      );
    } else {
      dispatch(
        setSelectedCity({
          CityId: city.id,
        })
      );
    }
    setCityActive(!isCityActive);
  };

  return (
    <button
      disabled={city.isDisabled}
      onClick={() => cityButtonHandler()}
      className={cityButtonClass}
    >
      {cityName}
    </button>
  );
};

export default FilterCity;
