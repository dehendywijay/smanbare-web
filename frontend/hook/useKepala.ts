"use client";

import { api_kepala } from "@/constants/strings";
import { KepalaSekolah } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useKepalaDetail = (id: number) => {
  const { data, error, mutate, isLoading } = useSWR<KepalaSekolah>(
    `${api_kepala}/${id}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    kepala: data,
    loading: isLoading,
    error: error ? "Gagal Mengambil Data Kepala Sekolah." : null,
    refetch: mutate,
  };
};
