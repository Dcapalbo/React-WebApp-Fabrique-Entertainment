import { useState, useEffect } from "react";
import axios from "axios";

const ApiGetHook = (url) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fabriqueData, setFabriqueData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setFabriqueData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("finished to fetch data");
      });
  }, [url]);

  return { fabriqueData, loading, error };
};

export default ApiGetHook;
