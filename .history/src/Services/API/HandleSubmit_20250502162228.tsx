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

    const result = await response.json(); // Read actual body content

    if (!response.ok) {
      alert(result?.message || "Failed to send data.");
      throw new Error(result?.message || "Request failed");
    }

    return result;
  } catch (e: any) {
    alert(e.message || "An error occurred during submission.");
  }
};
