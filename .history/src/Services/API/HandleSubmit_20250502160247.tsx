export const HandleSubmit = async (
  data: Record<string, unknown>,
  requestUrl: string
) => {
  try {
    console.log(requestUrl, JSON.stringify(data));
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // console.log(response.body);
    if (!response.ok) {
      //  throw new Error("Failed to send Data");
    }

    return response;
  } catch (e) {
    alert(e);
  }
};
