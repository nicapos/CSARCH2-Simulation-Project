import { useState, useEffect } from "react";
import axios from "axios";

const useNormalizeAPI = (body) => {
  const [significand, setSignificand] = useState("");
  const [exponent, setExponent] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const URL = "https://simulation-project-backend.vercel.app/api/normalize";
    const headers = { accept: '*/*', params: body };

    axios.get(URL, headers)
      .then((res) => {
        setSignificand(res.data.significand);
        setExponent(res.data.exponent);
      })
      .catch((err) => setError(Error(err).message))
      .finally(() => setLoading(false))
  }, [body]);

  return { significand, exponent, error, loading };
};

export default useNormalizeAPI;