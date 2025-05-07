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

  // Runtime type check (optional, but good for safety)
  if (
    typeof result === "object" &&
    result !== null &&
    "img" in result &&
    "Hospital" in result &&
    "Specialization" in result
  ) {
    const typedResult = result as APIResponse;
    return {
      img: typedResult.img,
      Hospital: typedResult.Hospital,
      Specialization: typedResult.Specialization,
    };
  } else {
    throw new Error("Doctor data is missing expected fields");
  }
};
