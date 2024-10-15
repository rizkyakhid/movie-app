"use client";

import Card from "@/components/Card/Card";
import CardLoading from "@/components/Card/CardLoading";
import Pagination from "@/components/Pagination/Pagination";
import { getUpcomingData } from "@/features/Upcoming/upcomingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";

export default function Upcoming() {
  const { upcomingData, upcomingLoading } = useAppSelector(
    (state: RootState) => state.upcomingMovie
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const handlePagination = (value: number) => {
    if (value > 0 && value < upcomingData?.total_pages) {
      window.scrollTo(0, 0);
      setPage(value);
      dispatch(
        getUpcomingData({
          params: { page: value },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getUpcomingData({
        params: { page },
        token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      })
    );
  }, []);

  return (
    <div id="container-top-rated" className="p-8 flex flex-col gap-8">
      <span className="text-xl font-bold uppercase">Upcoming Movies</span>
      <div
        id="list-now-playing-movies"
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
      >
        {upcomingLoading
          ? Array.from({ length: 20 }).map((_, id) => <CardLoading key={id} />)
          : upcomingData?.results?.map((item: any, id: number) => (
              <Card data={item} key={id} rating />
            ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={upcomingData?.total_pages}
        handlePage={handlePagination}
      />
    </div>
  );
}
