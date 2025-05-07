type APIResponse = {
  img: string;
  Hospital: string;
  Specialization: string;
};

export const FetchDocData = async (
  headersFetch: Record<string, string>,
  apiString: string
): Promise<APIResponse> => {
  try {
    const response = await fetch(apiString, {
      method: "GET",
      headers: headersFetch,
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);

    const parsedResult: APIResponse = {
      img: result.img,
      Hospital: result.Hospital,
      Specialization: result.Specialization,
    };

    return parsedResult;
  } catch (error) {
    console.error("FetchDocData error:", error);
    throw error;
  }
};
