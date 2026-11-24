const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatResult = {
  response: string;
  model: string;
};

export async function sendChat(messages: Message[]): Promise<ChatResult> {
  const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.detail || message;
    } catch {
      // Keep the HTTP status message.
    }
    throw new Error(message);
  }

  return response.json() as Promise<ChatResult>;
}
