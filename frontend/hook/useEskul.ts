"use client";

import { api_eskul } from "@/constants/strings";
import { Eskul } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

export const useEskul = () => {
  const [eskul, setEskul] = useState<Eskul[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEskul = async () => {
    try {
      const data = await axios.get<Eskul[]>(`${api_eskul}`).then((res) => res.data);
      setEskul(data);
    } catch (error) {
      console.error(error);
      setError("Gagal Mengambil Data Eskul.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEskul();
  }, []);

  return { eskul, loading, error, refetch: fetchEskul };
};
