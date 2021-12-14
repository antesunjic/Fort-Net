import React from "react";

import "../Products.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductCard = ({ name, thumbnailUrl, objectType }) => {
  const newUrl = thumbnailUrl.replace("\\", "/");

  let category = null;
  let categoryClass = null;

  switch (objectType) {
    case (objectType = 1):
      category = "Smještaj";
      categoryClass = "productCardCategory";
      break;
    case (objectType = 2):
      category = "EnoGastro";
      categoryClass = "productCardCategory";
      break;
    case (objectType = 3):
      category = "Baština";
      categoryClass = "productCardCategory";
      break;
    case (objectType = 4):
      category = "Aktivni turizam";
      categoryClass = "productCardCategoryBlue";
      break;
    default:
      break;
  }

  return (
    <div className="productCard">
      <LazyLoadImage
        alt="ProductPhoto"
        src={newUrl}
        className="productCardImg"
      />
      <div className={categoryClass}>{category}</div>
      <h4>{name}</h4>
    </div>
  );
};

export default ProductCard;
