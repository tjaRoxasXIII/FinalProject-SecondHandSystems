export async function sendEmail(buildName, parts) {
  const response = await fetch("/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ buildName, parts })
  });

  return response.json();
}