"use client";

import Card from "@/components/Card/Card";
import CardLoading from "@/components/Card/CardLoading";
import Pagination from "@/components/Pagination/Pagination";
import Searchbar from "@/components/Searchbar/Searchbar";
import {
  getMovieListData,
  getSearchMovieListData,
} from "@/features/MovieList/movieListSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";

export default function MovieList() {
  const { movieListData, movieListLoading } = useAppSelector(
    (state: RootState) => state.movieList
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handlePagination = (value: number) => {
    if (value > 0 && value < movieListData?.total_pages) {
      window.scrollTo(0, 0);
      setPage(value);
      dispatch(
        getMovieListData({
          params: { page: value },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    }
  };

  const handleSearch = (inputValue: string) => {
    setSearchValue(inputValue);
    setPage(1);

    if (inputValue?.length > 0) {
      dispatch(
        getSearchMovieListData({
          params: { page: 1, query: inputValue },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    } else {
      dispatch(
        getMovieListData({
          params: { page: 1 },
          token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getMovieListData({
        params: { page },
        token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      })
    );
  }, []);

  return (
    <div id="container-movie-list" className="flex flex-col">
      <div className="p-8 sticky top-0 bg-gradient-to-b from-background to-transparent z-10">
        <Searchbar
          placeholder="Search movies here..."
          onChange={handleSearch}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-8">
        {movieListLoading
          ? Array.from({ length: 20 }).map((_, id) => <CardLoading key={id} />)
          : movieListData?.results?.map((item: any, id: number) => (
              <Card data={item} key={id} />
            ))}
      </div>
      <div className="p-8">
        <Pagination
          currentPage={page}
          totalPages={movieListData?.total_pages}
          handlePage={handlePagination}
        />
      </div>
    </div>
  );
}
