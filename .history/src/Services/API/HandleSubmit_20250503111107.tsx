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
      throw new Error(result?.message || JSON.stringify(result));
    }

    return result;
  } catch (e: unknown) {
    alert(e.message || "An error occurred during submission.");
  }
};
