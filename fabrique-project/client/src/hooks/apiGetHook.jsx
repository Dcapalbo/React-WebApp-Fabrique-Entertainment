import { useState, useEffect } from "react";
import axios from "axios";

const ApiGetHook = (url) => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [fabriqueData, setFabriqueData] = useState([]);

  useEffect(() => {
    setloading(true);
    axios
      .get(url)
      .then((res) => {
        setFabriqueData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
        console.log("finished to fetch data");
      });
  }, [url]);

  return { fabriqueData, loading, error };
};

export default ApiGetHook;
