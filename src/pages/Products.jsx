import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import useFetch from "../hooks/useFetch";
import Header from "./Header/Header";
import Footer from "./Footer";
import Pagination from "../components/Paganation";
import userAxios from "./../services/Axios/userInterceptors";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import FilterProducts from "../components/Product/FilterProducts";
const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function Products() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterInSm, setShowFilterInSm] = useState(false);
  const [getProducts, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  let pageSize = 9;
  let pageNumber;
  let totalPage = Math.ceil(getProducts?.length / pageSize || 1);
  pageNumber = Array.from(Array(totalPage).keys());

  const { datas: productsData, isLoading } = useFetch("/product", userAxios);

  const fetchSearchResults = async () => {
    try {
      const response = await userAxios.get(
        `/product?page=${currentPage}&limit=${pageSize}`
      );
    } catch (error) {}
  };

  const filterProductHandler = () => {
    let url = location.search;
    userAxios.get(`/product${url}`).then((res) => setFilterProduct(res?.data));
  };

  useEffect(() => {
    fetchSearchResults();
  }, [currentPage]);

  useEffect(() => {
    filterProductHandler();
  }, [location.search]);

  useEffect(() => {
    setProducts(
      filterProduct?.data?.length >= 1
        ? filterProduct?.data
        : productsData?.data
    );
  }, [filterProduct, productsData]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return getProducts?.length ? getProducts?.slice(startIndex, endIndex) : [];
  }, [currentPage, getProducts]);

  return (
    <>
      <Header />
      <Sidebar />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="relative mx-auto py-4 dark:bg-black-200 xl:container min-h-screen mt-24">
          <div className="grid grid-cols-12 xl:px-20 px-5">
            <div className="col-span-12 flex justify-center">
              <button
                className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
                onClick={() => setShowFilterInSm(!showFilterInSm)}
              >
                <img src="/images/filter.svg" alt="" />
              </button>
              <FilterProducts
                showFilterInSm={showFilterInSm}
                setCurrentPage={setCurrentPage}
              />
            </div>

            <div className="relative grid lg:grid-cols-3 sm:grid-cols-2 col-span-12 mt-5 pb-14">
              <Suspense fallback={<Spinner />}>
                {paginatedProducts?.map((product) => (
                  <ProductTemplate product={product} />
                ))}
              </Suspense>
            </div>
          </div>

          <Pagination
            pageNumber={pageNumber}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <ToastContainer />
        </section>
      )}
      <Footer />
    </>
  );
}
