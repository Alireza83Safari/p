import React from "react";
import { ToastContainer } from "react-toastify";
import adminAxios from "../../services/Axios/adminInterceptors";
import DiscountTable from "../../components/Admin/Discount/DiscountTable";
import TotalDiscount from "../../components/Admin/Discount/TotalDiscount";
import AddDiscount from "../../components/Admin/Discount/Add/AddDiscount";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import DiscountContext from "../../Context/discountContext";
export default function Discount() {
  let url = "/discount";
  const {
    isLoading: paginatedProductsLoading,
    paginatedProducts,
    fetchData,
    totalProducts,
  } = useFetchPagination(url, adminAxios);
  return (
    <DiscountContext.Provider
      value={{
        paginatedProducts,
        fetchData,
        paginatedProductsLoading,
        totalProducts,
      }}
    >
      <section className="p-6 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2">
            <DiscountTable paginatedProducts={paginatedProducts} />
          </div>
          <div className="lg:col-span-4 col-span-12 gap-x-12 gap-y-6 lg:order-2 order-1">
            <TotalDiscount />
            <AddDiscount />
          </div>
        </div>
        <ToastContainer />
      </section>
    </DiscountContext.Provider>
  );
}
