export async function sendEmail(email, buildName, parts) {
  const response = await fetch("/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email,buildName, parts }),
  });

  return response.json();
}
