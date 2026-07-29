export async function sendEmail() {
  try {
    const res = await fetch("/send-email", {
      method: "POST"
    });

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      return { error: "Invalid JSON from server", raw: text };
    }

  } catch (err) {
    return { error: err.message };
  }
}
