import { useState, useEffect } from "react";
import axios from "axios";

const ApiPostHook = (url, body, redirectUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(url, body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("there is an error for updating a film: ", err.name);
        setError(err);
      })
      .finally(() => {
        window.location.replace(redirectUrl);
        console.log("finished to fetch data");
        setIsLoading(false);
      });
  }, [url, body, redirectUrl]);

  return { isLoading, error };
};

export default ApiPostHook;
