import React, { useState } from "react";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../../hooks/useFetchPagination";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";

export default function CommentsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  let url = "/comment";
  let pageSize = 10;
  const {
    isLoading: paginationLodaing,
    paginations,
    total,
    fetchData,
  } = useFetchPagination(url, adminAxios);
  const pagesCount = Math.ceil(total / pageSize);
  const { isLoading } = usePaginationURL(currentPage, pageSize);

  const commentStatusHandler = async (productId, statusCode) => {
    const statusInfo = {
      note: "test",
      status: Number(statusCode),
    };

    try {
      const response = await adminAxios.post(
        `/comment/changeStatus/${productId}`,
        statusInfo
      );
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {}
  };

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="sm:text-xs text-[12px] 2xl:text-lg grid lg:grid-cols-6 grid-cols-5 border-y py-2">
            <th>User</th>
            <th>Comment</th>
            <th>Product</th>
            <th className="lg:inline hidden">Date</th>
            <th className="">rate</th>
            <th>Status</th>
          </tr>
        </thead>
        {paginationLodaing || isLoading ? (
          <Spinner />
        ) : paginations?.length >= 1 ? (
          <tbody>
            {paginations?.map((comment) => (
              <tr
                className="sm:text-xs text-[10px] 2xl:text-sm grid lg:grid-cols-6 grid-cols-5 sm:px-4 sm:py- py-3 text-center"
                key={comment.id}
              >
                <td className="truncate font-bold">{comment.username}</td>

                <td className="text-ellipsis overflow-hidden truncate">
                  {comment.text}
                </td>
                <td className="truncate">{comment.productName}</td>
                <td className="lg:inline hidden">
                  {comment.createdAt.slice(0, 10)}
                </td>
                <td className="">{comment.rate}/5</td>
                <td>
                  {(() => {
                    switch (comment.commentStatus) {
                      case 0:
                        return (
                          <div>
                            <button
                              className="text-[10px] font-black p-1 rounded-l-lg bg-green-100 text-green-300"
                              onClick={() =>
                                commentStatusHandler(comment.id, 1)
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="text-[10px] font-black p-1 rounded-r-lg bg-red-300 text-red-100"
                              onClick={() =>
                                commentStatusHandler(comment.id, 2)
                              }
                            >
                              Reject
                            </button>
                          </div>
                        );
                      case 1:
                        return (
                          <button className="text-[10px] font-black p-1 rounded-lg bg-green-100 text-green-300">
                            Accepted
                          </button>
                        );
                      case 2:
                        return (
                          <button className="text-[10px] font-black p-1 rounded-lg bg-red-300 text-red-100">
                            Rejected
                          </button>
                        );
                      default:
                        return null;
                    }
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className="flex justify-center items-center mt-32">
            <div>
              <img src="/images/not-found-product.svg" alt="" />
              <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                Comment Not Found
              </p>
            </div>
          </div>
        )}
      </table>
      <Pagination
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
