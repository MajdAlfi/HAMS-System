import { doctorModel } from "../../Models/doctorModel";
import { weeklyModel } from "../../Models/weeklyModel";

type APIResponse = {
  doc: doctorModel;
  dataWeek: weeklyModel;
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

  const result: APIResponse = await response.json();
  console.log(result);
  return result;
};
