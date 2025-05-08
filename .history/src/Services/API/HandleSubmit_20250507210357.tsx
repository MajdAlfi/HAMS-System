export const HandleSubmit = async (data: unknown, requestUrl: string) => {
  try {
    console.log("Request:", requestUrl, JSON.stringify(data));

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
    if (e instanceof Error) {
      alert(e.message);
    } else if (typeof e === "string") {
      alert(e);
    } else {
      alert("An error occurred during submission.");
    }
  }
};
