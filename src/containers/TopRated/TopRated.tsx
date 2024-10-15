"use client";

import Card from "@/components/Card/Card";
import CardLoading from "@/components/Card/CardLoading";
import Pagination from "@/components/Pagination/Pagination";
import { getTopRatedData } from "@/features/TopRated/topRatedSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";

export default function TopRated() {
  const { topRatedData, topRatedLoading } = useAppSelector(
    (state: RootState) => state.topRated
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const handlePagination = (value: number) => {
    if (value > 0 && value < topRatedData?.total_pages) {
      window.scrollTo(0, 0);
      setPage(value);
      dispatch(
        getTopRatedData({
          params: { page: value },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getTopRatedData({
        params: { page },
        token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      })
    );
  }, []);

  return (
    <div id="container-top-rated" className="p-8 flex flex-col gap-8">
      <span className="text-xl font-bold uppercase">Top Rated</span>
      <div
        id="list-now-playing-movies"
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
      >
        {topRatedLoading
          ? Array.from({ length: 20 }).map((_, id) => <CardLoading key={id} />)
          : topRatedData?.results?.map((item: any, id: number) => (
              <Card data={item} key={id} rating />
            ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={topRatedData?.total_pages}
        handlePage={handlePagination}
      />
    </div>
  );
}
