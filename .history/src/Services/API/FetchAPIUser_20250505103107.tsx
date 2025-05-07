type APIResponse = {
  Name: string;
  phoneNo: number;
  DOB: Date;
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

  const result = await response.json();

  const parsedResult: APIResponse = {
    Name: result.Name,
    phoneNo: result.phoneNo,
    DOB: new Date(result.DOB), // ✅ Convert string to Date
    Gender: result.Gender,
    accountType: result.accountType,
  };

  return parsedResult;
};
