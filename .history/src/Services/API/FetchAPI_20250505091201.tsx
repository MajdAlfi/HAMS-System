import { useEffect } from "react";

export const FetchAPI = (
  headersFetch: Record<string, string>,
  apiString: string
) => {
  return useEffect(() => {
    fetch(apiString, {
      method: "GET",
      headers: headersFetch, // ✅ this must be an object, not a string
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // or use a state setter here if needed
      });
  }, []);
};
