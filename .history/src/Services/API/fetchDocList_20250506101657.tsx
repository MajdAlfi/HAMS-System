import { doctorModel } from "../../Models/doctorModel";
import { weeklyModel } from "../../Models/weeklyModel";

type APIResponse = {
  dataDoc: doctorModel[];
  dataWeek: weeklyModel[];
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
    throw new Error("Invalid JSON format in doctor response: " + e);
  }

  if (
    typeof result === "object" &&
    result !== null &&
    "dataDoc" in result &&
    "dataWeek" in result
  ) {
    const typedResult = result as APIResponse;

    if (
      Array.isArray(typedResult.dataDoc) &&
      Array.isArray(typedResult.dataWeek)
    ) {
      return typedResult;
    } else {
      throw new Error("Doctor data fields have incorrect types");
    }
  } else {
    throw new Error("Doctor data is missing expected fields");
  }
};
