import { fetch } from "@/lib/fetcher";
import axios from "axios";

export const fetchMovieListData = async (params: any, token: any) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_MOVIEDB_URL}/discover/movie`,
    axios.get,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/bribrain-json",
      },
      params,
    }
  );
};

export const fetchSearchMovieListData = async (params: any, token: any) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_MOVIEDB_URL}/search/movie`,
    axios.get,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/bribrain-json",
      },
      params,
    }
  );
};