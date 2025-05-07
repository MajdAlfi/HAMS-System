export const HandleSubmit = async (
  data: Record<string, unknown>,
  requestUrl: string
) => {
  console.log(requestUrl);
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(response.text);
  if (!response.ok) {
    throw new Error("Failed to send Data");
  }

  return response;
};
