export const HandleSubmit = async (
  data: Record<string, unknown> | FormData,
  requestUrl: string
) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type");
    let result;

    if (contentType?.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    if (response.status === 200) {
      alert("Success");
      return result;
    } else {
      throw new Error(
        typeof result === "string"
          ? result
          : result?.message || "Request failed"
      );
    }
  } catch (e: unknown) {
    alert(e || "An error occurred during submission.");
  }
};
