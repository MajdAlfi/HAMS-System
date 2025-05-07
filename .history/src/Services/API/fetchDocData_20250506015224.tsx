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
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const text = await response.text();

  if (!text) {
    throw new Error("Empty response body");
  }

  const result = JSON.parse(text);

  const parsedResult: APIResponse = {
    img: result.img,
    Hospital: result.Hospital,
    Specialization: result.Specialization,
  };

  return parsedResult;
};
