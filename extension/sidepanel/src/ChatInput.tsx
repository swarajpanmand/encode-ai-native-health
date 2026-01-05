import { useState, useRef, useEffect } from "react";
// icons removed
import { cn } from "./lib/utils";

type ChatInputProps = {
  onSend: (value: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0 && !disabled;

  function handleSend() {
    if (!canSend) return;
    onSend(value.trim());
    setValue("");
    
    // Reset height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  // Autofocus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative flex items-center gap-2 bg-white rounded-3xl border border-input shadow-sm p-2 pl-3 transition-all focus-within:ring-1 focus-within:ring-ring focus-within:border-primary/50">

      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
        rows={1}
        className="flex-1 bg-transparent text-sm py-2 px-2 outline-none placeholder:text-muted-foreground resize-none max-h-[100px] scrollbar-hide"
      />

      <button
        onClick={handleSend}
        disabled={!canSend}
        aria-label="Send message"
        className={cn(
          "h-7 px-3 shrink-0 rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-200",
          canSend
            ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-sm"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        Send
      </button>
    </div>
  );
}
