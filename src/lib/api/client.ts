export type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatResult = {
  response: string;
  model?: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export async function sendChat(messages: Message[]): Promise<ChatResult> {
  const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body: { detail?: string; message?: string } = await response.json();
      message = body.detail || body.message || message;
    } catch {
      // Keep the HTTP status message if the server did not return JSON.
    }
    throw new Error(message);
  }

  const result: unknown = await response.json();
  if (
    typeof result !== "object" ||
    result === null ||
    !("response" in result) ||
    typeof (result as { response: unknown }).response !== "string"
  ) {
    throw new Error("The API returned an unexpected response. Expected a 'response' field.");
  }
  return result as ChatResult;
}
