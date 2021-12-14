import React, { useEffect, useState } from "react";
import "./Products.scss";

import { useSelector } from "react-redux";

import ProductCard from "../Products/ProductCard/ProductCard";
import "../Filters/Search/Search.scss";
import ReactPaginate from "react-paginate";

const Products = () => {
  const products = useSelector((state) => state.products);
  const selectedObjectType = useSelector((state) => state.selectedObjectType);
  const selectedCity = useSelector((state) => state.selectedCity);
  const filteredResults = useSelector((state) => state.filteredResults);
  const enteredText = useSelector((state) => state.enteredText);
  const allProducts = useSelector((state) => state.allProducts);

  const itemsPerPage = 9;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  let list;
  if (products.length > 0) {
    list = products;
  }
  if (filteredResults.length > 0) {
    list = filteredResults;
  }
  if (
    selectedObjectType.objectType === null &&
    selectedCity.CityId === null &&
    enteredText?.length === 0
  ) {
    list = allProducts;
  }

  useEffect(() => {
    if (list) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(list?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(list?.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, products, filteredResults]);

  useEffect(() => {
    setItemOffset(0);
    setCurrentPage(0);
  }, [products, filteredResults]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let paginationClassName = "pagination";
  let noResults;

  if (
    ((selectedObjectType.objectType || selectedCity.CityId) &&
      filteredResults.length === 0) ||
    (enteredText !== "" && filteredResults.length === 0)
  ) {
    paginationClassName = "paginationDisabled";
    noResults = (
      <p className="noResults">Sorry, no results match your search criteria.</p>
    );
  }

  return (
    <div className="productsLaptop">
      <div className="products">
        {list
          ? currentItems?.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                thumbnailUrl={product.thumbnailUrl}
                objectType={product.objectType}
              />
            ))
          : noResults}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Sljedeća >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prethodna"
        renderOnZeroPageCount={null}
        className={paginationClassName}
        activeClassName="paginationActive"
        disabledClassName="paginationDisabled"
        forcePage={currentPage}
      />
    </div>
  );
};

export default Products;
