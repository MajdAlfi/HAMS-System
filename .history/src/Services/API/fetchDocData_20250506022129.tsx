type APIResponse = {
  img: string;
  Huid: string;
  desc: string;
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
    throw new Error(`Failed to fetch doctor data: ${response.status}`);
  }

  const text = await response.text();

  if (!text) {
    throw new Error("Empty response from doctor API");
  }

  let result: unknown;
  try {
    result = JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse doctor response:", text);
    throw new Error("Invalid JSON format in doctor response");
  }

  // Runtime type check
  if (
    typeof result === "object" &&
    result !== null &&
    "img" in result &&
    "Huid" in result &&
    "desc" in result
  ) {
    const typedResult = result as {
      img: unknown;
      Huid: unknown;
      desc: unknown;
    };

    // Optional: narrow and validate types
    if (
      typeof typedResult.img === "string" &&
      typeof typedResult.Huid === "string" &&
      typeof typedResult.desc === "string"
    ) {
      return {
        img: typedResult.img,
        Huid: typedResult.Huid,
        desc: typedResult.desc,
      };
    } else {
      throw new Error("Doctor data fields have incorrect types");
    }
  } else {
    throw new Error("Doctor data is missing expected fields");
  }
};
