import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import Timer from "./Timer";
import useFetch from "../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import userAxios from "./../services/Axios/userInterceptors"

export default function Promotion() {
  const { datas: productsData } = useFetch(
    "/product?onlyDiscount=true",
    userAxios
  );

  const handleAddToCart = (productID) => {
    let productData = {
      productItemId: productID.itemId,
      quantity: 1,
    };
    userAxios.post("/orderItem", productData).then((res) => {
      if (res.status === 200) {
        toast.success(`${productID.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <section className="mt-52 min-h-[30rem]">
      <div className="flex items-center md:px-5 xl:px-16 px-2">
        <Timer days={1} />
        <div className="w-full h-1 bg-blue-600"></div>
      </div>

      <div className="xl:px-16 p-2 mt-5">
        <p className="pb-3 lg:text-xl font-bold text-center text-black-900 dark:text-white-100">
          Top Discount Products
        </p>

        <Swiper
          slidesPerView={
            window.innerWidth >= 1024
              ? 4
              : window.innerWidth >= 640 && window.innerWidth <= 1024
              ? 3
              : 2
          }
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {productsData?.data.length > 1 ? (
            productsData?.data.map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  className="overflow-hidden dark:bg-black-800 relative hover:shadow-lg duration-200"
                  key={product.id}
                >
                  <div className="lg:h-[300px] md:h-[240px] sm:h-[200px] h-[180px] flex justify-center">
                    <Link
                      to={`/products/${product.id}`}
                      style={{ display: "block" }}
                    >
                      <img
                        src={`http://127.0.0.1:6060/${product.fileUrl}`}
                        alt="Product"
                        className="relative object-contain lg:h-[260px] md:h-[220px] sm:h-[180px] h-[160px]"
                      />
                    </Link>
                    <button
                      className="flex items-center justify-center text-blue-600 hover:text-white-100 hover:bg-blue-300 absolute md:w-10 md:h-10 w-7 h-7 rounded-full xl:bottom-32 lg:bottom-24 md:bottom-20 bottom-16 right-6 z-10 border border-blue-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-xl" />
                    </button>
                  </div>

                  <div className="lg:p-6 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <p className="font-semibold dark:text-white-100 lg:text-base md:text-xs text-[8px] whitespace-nowrap mr-4 line-through text-gray-200">
                          $ {product.price}
                        </p>
                        <p className="font-semibold dark:text-white-100 lg:text-base md:text-xs text-[8px] whitespace-nowrap">
                          {product?.price -
                            (product?.discountValue / 100) * product.price}
                          $
                        </p>
                      </div>
                      <div className="md:p-2 p-1 lg:text-sm text-xs text-white-100 bg-red-700 rounded-full">
                        {product?.discountValue}%
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center text-red-700 font-black text-2xl mt-10">
              We do not have any discount products
            </div>
          )}
          {}
        </Swiper>

        <ToastContainer />
      </div>
    </section>
  );
}
