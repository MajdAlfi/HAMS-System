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

    if (response.status === 200) {
      // Show the entire response body (e.g., { message: "..." })
      //alert(result?.message || JSON.stringify(result));
      alert("Success");
      return result;
    } else {
      throw new Error(result?.message || "Request failed");
    }
  } catch (e) {
    alert(e || "An error occurred during submission.");
  }
};
