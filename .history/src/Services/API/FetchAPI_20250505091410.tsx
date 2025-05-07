import { useEffect } from "react";

export const FetchAPI = (
  headersFetch: Record<string, string>,
  apiString: string
) => {
  const result = {};
  useEffect(() => {
    fetch(apiString, {
      method: "GET",
      headers: headersFetch,
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }, []);
};
