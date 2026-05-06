"use client";

import {  api_kepala } from "@/constans/strings";
import { KepalaSekolah } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

export const useKepalaDetail = (id: 1) => {
  const [kepala, setKepala] = useState<KepalaSekolah>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKepalaByID = async () => {
    try {
      const data = await axios.get<KepalaSekolah>(`${api_kepala}/${id}`).then((res) => res.data);
      setKepala(data);
    } catch (error) {
      console.error(error);
      setError("Gagal Mengambil Data Kepala Sekolah.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchKepalaByID();
  }, []);

  return { kepala, loading, error, refetch: fetchKepalaByID };
};
