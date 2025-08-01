import { useState, useCallback, useEffect } from "react";

const API_URL = "https://dummyjson.com/products";

function Pages({ currenntPage, totalPages, setCurrentPage }) {
  return (
    <div className="">
      <div className="flex justify-center">
        <div
          className={`h-[40px] w-[40px]  justify-center items-center flex border border-indigo-600 ${
            currenntPage === 1 && "bg-gray-600"
          } ${currenntPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev === 1) return;
              return prev - 1;
            })
          }
        >
          Prev
        </div>
        {new Array(totalPages).fill("1").map((c, i) => {
          return (
            <div
              className={`h-[40px] w-[40px] cursor-pointer justify-center items-center flex border border-indigo-600 ${
                currenntPage === i + 1 && "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </div>
          );
        })}
        <div
          className={`h-[40px] w-[40px] justify-center items-center flex border border-indigo-600 ${
            currenntPage === totalPages && "bg-gray-600"
          } ${
            currenntPage === totalPages
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev === totalPages) return;
              return prev + 1;
            })
          }
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default Pages;
