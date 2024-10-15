import { fetch } from "@/lib/fetcher";
import axios from "axios";

export const fetchTopRatedData = async (params: any, token: any) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_MOVIEDB_URL}/movie/top_rated`,
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
