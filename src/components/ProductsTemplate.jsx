import React from "react";
import { Link } from "react-router-dom";
import usePost from "../hooks/usePost";
import { toast } from "react-toastify";

export default function ProductsTemplate({ product }) {
  const { doPost } = usePost();

  const BasketHandler = (data) => {
    let userBasketHandler = {
      productItemId: data?.itemId,
      quantity: 1,
    };

    doPost("/orderItem", userBasketHandler);

    toast.success(`${data?.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  return (
    <section key={product.id} className="p-2">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden dark:bg-black-800 hover:opacity-70 duration-300">
        <Link to={`/products/${product.id}`}>
          <img
            src={`http://127.0.0.1:6060/${product.fileUrl}`}
            alt="Product"
            className="w-full lg:h-64 sm:h-56 h-72 p-4 object-contain"
          />
        </Link>
        <div className="p-6 ">
          <Link to={`/shop/products/${product.id}`}>
            <div className="flex justify-between">
              <h2 className="font-bold mb-2 xl:text-lg md:text-base text-sm whitespace-nowrap dark:text-white-100">
                {product.name}
              </h2>
              <button
                className={`text-gray-700 mb-4 py-1 px-1 text-xs rounded-lg ${
                  product.categoryName === "Electronics"
                    ? "bg-green-400 text-green-500"
                    : "bg-orange-400 text-orange-100"
                }`}
              >
                {product.categoryName}
              </button>
            </div>
            <p className="py-3 pb-5 dark:text-white-100 text-xs text-gray-800">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
              mollitia eligendi
            </p>
          </Link>
          <div className="flex items-center justify-between pt-2">
            <p className="text-gray-900 font-bold dark:text-white-100">
              $ {product.price}
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white-100 text-sm rounded-lg hover:bg-blue-900 duration-200 transition"
              onClick={() => {
                BasketHandler(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
