import React from "react";

import "./ObjectTypeSelect.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedType } from "../../../../../store/actions/productsActions";

const ObjectTypeSelect = () => {
  const objectType = useSelector((state) => state.objectTypes);

  const dispatch = useDispatch();
  const selectedTypeHandler = (value) => {
    dispatch(
      setSelectedType({
        objectType: value.objectType,
      })
    );
  };
  return (
    <div className="mobileFilters">
      <Select
        className="select"
        menuPlacement="top"
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.objectType}
        defaultValue={{ objectType: 0, label: "Svi tipovi" }}
        options={objectType}
        onChange={(value) => selectedTypeHandler(value)}
      />
    </div>
  );
};

export default ObjectTypeSelect;
