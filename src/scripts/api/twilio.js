document
  .getElementById("sendTestMessage")
  .addEventListener("click", async () => {
    const status = document.getElementById("status");
    status.textContent = "Sending…";

    try {
      const res = await fetch("/send-sms", { method: "POST" });
      const data = await res.json();

      status.textContent = data.success
        ? "Message sent!"
        : "Failed to send message.";
    } catch (err) {
      status.textContent = "Error sending message.";
      console.error(err);
    }
  });