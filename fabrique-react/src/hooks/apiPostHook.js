import { useState, useEffect } from "react";
import axios from "axios";

const ApiPostHook = (url, body, redirectUrl) => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setloading(true);
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
        setloading(false);
        window.location.replace(redirectUrl);
        console.log("finished to fetch data");
      });
  }, [url, body, redirectUrl]);

  return { loading, error };
};

export default ApiPostHook;
