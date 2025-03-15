export const setPinApi =
  (onSuccess?: () => void) => async (roomNr: string, pin: string) => {
    try {
      const res = await fetch("/api/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomNr, pin }),
      });

      const data = await res.json();
      if (data.success) {
        if (onSuccess) onSuccess();
      } else {
        console.error("Error setting pin:", data.error);
      }
    } catch (error) {
      console.error("Failed to send request:", error);
    }
  };
export const logInApi =
  (onSuccess?: () => void) => async (roomNr: string, pin: string) => {
    try {
      const res = await fetch("/api/pin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomNr, pin }),
      });

      const data = await res.json();
      if (data.success) {
        if (onSuccess) onSuccess();
      } else {
        console.error("Error setting pin:", data.error);
      }
    } catch (error) {
      console.error("Failed to send request:", error);
    }
  };
