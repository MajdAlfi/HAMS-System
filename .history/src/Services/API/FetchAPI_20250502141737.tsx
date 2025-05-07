import { useEffect } from "react";

export const FetchAPI = (apiString: string) => {
  return useEffect(() => {
    fetch(apiString)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }, []);
};
