type APIResponse = {
  Name: string;
  phoneNo: string;
  DOB: string;
  Gender: string;
  accountType: string;
};
export const FetchAPIUser = async (
  headersFetch: Record<string, string>,
  apiString: string
): Promise<APIResponse> => {
  const response = await fetch(apiString, {
    method: "GET",
    headers: headersFetch,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
};
