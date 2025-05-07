export const HandleSubmit = async (
  data: Record<string, unknown>,
  requestUrl: string
) => {
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.status != 200) {
    console.log(response.text);

    throw new Error("Failed to send Data");
  }
  alert(response.status);
  return response;
};
