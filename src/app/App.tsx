import { FormEvent, KeyboardEvent, useRef, useState, useEffect } from "react";
import { Message, sendChat } from "../lib/api/client";

const starterPrompts = [
  "Explain what artificial intelligence is",
  "Help me write a Python function",
  "Give me ideas for a small project",
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submitMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const result = await sendChat(nextMessages);
      setMessages([...nextMessages, { role: "assistant", content: result.response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(input);
    }
  }

  function newChat() {
    setMessages([]);
    setError("");
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">W</span><span>WorkMind</span></div>
        <button className="new-chat" onClick={newChat}>＋ <span>New chat</span></button>
        <div className="sidebar-label">YOUR SPACE</div>
        <div className="sidebar-note">Your conversations appear here while this page is open.</div>
        <div className="sidebar-bottom"><span className="status-dot" /> Local AI · Ollama</div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark">W</span> WorkMind</div>
          <div className="model-label"><span className="status-dot" /> Local model <span className="model-name">· qwen2.5:1.5b</span></div>
          <button className="clear-button" onClick={newChat}>New chat</button>
        </header>

        <section className={`conversation ${messages.length === 0 ? "empty" : ""}`}>
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-icon">W</div>
              <h1>What can I help with?</h1>
              <p>Ask anything. Your messages are answered by an AI model running locally.</p>
              <div className="suggestions">
                {starterPrompts.map((prompt) => (
                  <button key={prompt} onClick={() => void submitMessage(prompt)}>{prompt}<span>↗</span></button>
                ))}
              </div>
            </div>
          ) : (
            <div className="message-list">
              {messages.map((message, index) => (
                <article className={`message-row ${message.role}`} key={`${index}-${message.role}`}>
                  <div className={`avatar ${message.role}`}>{message.role === "user" ? "You" : "W"}</div>
                  <div className="message-content">
                    <div className="message-author">{message.role === "user" ? "You" : "WorkMind"}</div>
                    <div className="message-text">{message.content}</div>
                  </div>
                </article>
              ))}
              {loading && <article className="message-row assistant"><div className="avatar assistant">W</div><div className="message-content"><div className="message-author">WorkMind</div><div className="typing"><i /><i /><i /></div></div></article>}
              <div ref={bottomRef} />
            </div>
          )}
        </section>

        <div className="composer-wrap">
          {error && <div className="error-message">{error}</div>}
          <form className="composer" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message WorkMind..."
              rows={1}
              disabled={loading}
              aria-label="Message WorkMind"
            />
            <button className="send-button" type="submit" disabled={!input.trim() || loading} aria-label="Send message">↑</button>
          </form>
          <p className="disclaimer">WorkMind can make mistakes. Check important information. · Enter to send, Shift + Enter for a new line.</p>
        </div>
      </main>
    </div>
  );
}
