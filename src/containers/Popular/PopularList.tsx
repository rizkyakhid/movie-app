"use client";

import Card from "@/components/Card/Card";
import CardLoading from "@/components/Card/CardLoading";
import Pagination from "@/components/Pagination/Pagination";
import { getPopularListData } from "@/features/Popular/popularListSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PopularList() {
  const { popularListData, popularListLoading } = useAppSelector(
    (state: RootState) => state.popularList
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handlePagination = (value: number) => {
    if (value > 0 && value < popularListData?.total_pages) {
      window.scrollTo(0, 0);
      setPage(value);
      dispatch(
        getPopularListData({
          params: { page: value },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    }
  };

  const handleDetail = (id: number) => {
    router.push(`/details?mid=${id}`);
  };

  useEffect(() => {
    dispatch(
      getPopularListData({
        params: { page },
        token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      })
    );
  }, []);

  return (
    <div id="container-top-rated" className="p-8 flex flex-col gap-8">
      <span className="text-xl font-bold uppercase">Popular</span>
      <div
        id="list-now-playing-movies"
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
      >
        {popularListLoading
          ? Array.from({ length: 20 }).map((_, id) => <CardLoading key={id} />)
          : popularListData?.results?.map((item: any, id: number) => (
              <Card
                data={item}
                key={id}
                popularity
                onClick={() => handleDetail(item?.id)}
              />
            ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={popularListData?.total_pages}
        handlePage={handlePagination}
      />
    </div>
  );
}
