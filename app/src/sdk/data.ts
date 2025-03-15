export const changeInfo = async (
  roomNr: string,
  body: { email: string; name: string; pin?: string }
) => {
  try {
    const res = await fetch(`/api/data/${roomNr}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.success) {
      console.log("Update was great success!");
    } else {
      console.error("Error setting pin:", data.error);
    }
  } catch (error) {
    console.error("Failed to send request:", error);
  }
};
