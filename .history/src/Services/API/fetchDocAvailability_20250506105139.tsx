import { weeklyModel } from "../../Models/weeklyModel";

type APIResponse = {
  dataWeek: weeklyModel[];
};

export const FetchWeekAvailability = async (
  headersFetch: Record<string, string>,
  apiString: string
): Promise<APIResponse> => {
  const response = await fetch(apiString, {
    method: "GET",
    headers: headersFetch,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Week data: ${response.status}`);
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
    throw new Error("Invalid JSON format in Week response: " + e);
  }

  if (typeof result === "object" && result !== null && "dataWeek" in result) {
    const typedResult = result as APIResponse;

    if (Array.isArray(typedResult.dataWeek)) {
      return typedResult;
    } else {
      throw new Error("Week data fields have incorrect types");
    }
  } else {
    throw new Error("Week data is missing expected fields");
  }
};
