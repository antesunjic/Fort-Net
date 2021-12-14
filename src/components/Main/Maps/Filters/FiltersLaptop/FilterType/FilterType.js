import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedType } from "../../../../../../store/actions/productsActions";

import "../FiltersLaptop.scss";

const FilterType = ({ typeName, objectType }) => {
  const selectedObjectType = useSelector((state) => state.selectedObjectType);
  const [isTypeActive, setTypeActive] = useState(false);

  let typeButtonClass = "objectTypeLaptopButton";

  if (
    selectedObjectType?.objectType === objectType?.objectType ||
    (objectType.objectType === null && selectedObjectType.objectType === null)
  ) {
    typeButtonClass = "objectTypeLaptopButtonActive";
  }

  const dispatch = useDispatch();

  const typeButtonHandler = () => {
    if (selectedObjectType.objectType === objectType.objectType) {
      //ako je vec odabran - ugasi ga
      dispatch(
        setSelectedType({
          objectType: null,
        })
      );
    } else {
      //ako nije vec odabran - postavi ga
      dispatch(
        setSelectedType({
          objectType: objectType.objectType,
        })
      );
    }
    setTypeActive(!isTypeActive);
  };

  return (
    <button
      disabled={objectType.isDisabled}
      onClick={typeButtonHandler}
      className={typeButtonClass}
    >
      {typeName}
    </button>
  );
};

export default FilterType;
