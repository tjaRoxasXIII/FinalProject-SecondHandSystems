export async function sendEmail(email, buildName, parts) {
  console.log(parts);

  const response = await fetch("https://finalproject-secondhandsystems.onrender.com/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, buildName, parts }),
  });

  return response.json();
}
