export const HandleSubmit = async (
  data: Record<string, unknown>,
  requestUrl: string
) => {
  try {
    console.log("Request:", requestUrl, JSON.stringify(data));

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Show the entire response body (e.g., { message: "..." })
      alert(result?.message || JSON.stringify(result));
      throw new Error(result?.message || "Request failed");
    }

    return result;
  } catch (e) {
    console.log(e);
  }
};
