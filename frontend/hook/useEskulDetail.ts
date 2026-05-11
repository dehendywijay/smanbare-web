"use client";

import { api_eskul } from "@/constants/strings";
import { Eskul } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

export const useEskulDetail = (slug: string) => {
  const [eskul, setEskul] = useState<Eskul>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("News slug is missing.");
      return;
    }

  const fetchEskulbySlug = async () => {
    try {
      const data = await axios.get<Eskul>(`${api_eskul}/${slug}`).then((res) => res.data);
      setEskul(data);
    } catch (error) {
      console.error(error);
      setError("Gagal Mengambil Data Eskul.");
    } finally {
      setLoading(false);
    }
  };
  void fetchEskulbySlug();
  }, [slug]);
  

  return { eskul, loading, error};
};
