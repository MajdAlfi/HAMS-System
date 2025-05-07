export const HandleRegSubmit = async (data: FormData, requestUrl: string) => {
  try {
    alert(`Request: ${requestUrl}, ${data}`);

    const response = await fetch(requestUrl, {
      method: "POST",
      body: data,
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
