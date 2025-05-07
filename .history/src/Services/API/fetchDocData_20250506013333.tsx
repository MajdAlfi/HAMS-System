type APIResponse = {
  img: string;
  Hospital: string;
  Specialization: string;
};

export const FetchDocData = async (
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
    img: result.img,
    Hospital: result.Hospital,
    Specialization: result.Specialization,
  };
  alert(parsedResult.img);
  return parsedResult;
};
