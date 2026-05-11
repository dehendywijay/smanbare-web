import { api_alumni, api_eskul } from "@/constants/strings";
import { Alumni, Eskul } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAlumni = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlumni = async () => {
    try {
      const data = await axios.get<Alumni[]>(`${api_alumni}`).then((res) => res.data);
      setAlumni(data);
    } catch (error) {
      console.error(error);
      setError("Gagal Mengambil Data Alumni.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return { alumni, loading, error, refetch: fetchAlumni };
};
