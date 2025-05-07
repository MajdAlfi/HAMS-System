export const HandleSubmit = async (
  data: Record<string, unknown>,
  requestUrl: string
) => {
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log(response.text);
    alert(response.status);
    throw new Error("Failed to send Data");
  }
  return response;
};
