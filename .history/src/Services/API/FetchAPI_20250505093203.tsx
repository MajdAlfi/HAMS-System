export const FetchAPI = async (
  headersFetch: Record<string, string>,
  apiString: string
): Promise<any> => {
  const response = await fetch(apiString, {
    method: "GET",
    headers: headersFetch,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
};
