import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThesysRenderer } from "./ThesysRenderer";
import { ChatInput } from "./ChatInput";
import { SummaryHero } from "./components";
// icons removed

type Mode = "idle" | "text" | "image";

/* -----------------------------
   Parse Thesys response
------------------------------ */
function parseThesysContent(raw: string) {
  try {
    const cleaned = raw
      .replace(/^<content[^>]*>/, "")
      .replace(/<\/content>$/, "")
      .trim();

    // Use a temporary DOM element to decode HTML entities if needed
    const textarea = document.createElement("textarea");
    textarea.innerHTML = cleaned;
    return JSON.parse(textarea.value);
  } catch (e) {
    console.error("Failed to parse response:", e);
    return null;
  }
}

/* -----------------------------
   UI primitives
------------------------------ */

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Analyzing nutrition data...
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center mt-8 px-6 space-y-8"
    >
      
      
      <div className="space-y-2 max-w-[280px]">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">
          Ready to analyze
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Select ingredients on any page or right-click a product image to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 w-full gap-3 text-left">
        <div className="group flex items-center gap-3 p-3 bg-white border border-border/60 rounded-xl shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-200">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Select text</p>
            <p className="text-xs text-muted-foreground">Highlight ingredients list</p>
          </div>
        </div>

        <div className="group flex items-center gap-3 p-3 bg-white border border-border/60 rounded-xl shadow-sm hover:border-purple-200 hover:shadow-md transition-all duration-200">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Right-click image</p>
            <p className="text-xs text-muted-foreground">Analyze product photos</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("idle");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [aiTree, setAiTree] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* -----------------------------
     Backend call
  ------------------------------ */
  async function callHealthCopilot(payload: string) {
    if (!payload?.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    // Keep previous results while loading for better UX in chat mode? 
    // Usually we want to clear or show a loading indicator at the bottom.
    // For main analysis, we might want to clear.
    if (!aiTree) {
      // If it's a fresh analysis, clear everything
    }

    try {
      console.log("Fetching from http://127.0.0.1:3001/api/chat...");
      const res = await fetch("http://127.0.0.1:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: payload,
          conversationId: "chrome-session",
        }),
        signal: (AbortSignal as any).timeout ? (AbortSignal as any).timeout(30000) : undefined,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Response received:", data);
      const parsed = parseThesysContent(data.response);
      
      if (parsed && parsed.component) {
        setAiTree(parsed.component);
      }
      
      // Auto-scroll to top of result
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);

    } catch (error: any) {
      console.error("Fetch error:", error);
      setErrorMsg(`Connection failed: ${error.message || "Unknown error"}. Ensure server is running at http://localhost:3001.`);
    } finally {
      setLoading(false);
    }
  }

  /* -----------------------------
     Initial intent
  ------------------------------ */
  useEffect(() => {
    // Check if chrome API is available
    if (typeof chrome === "undefined" || !chrome.runtime) return;

    // TEXT intent
    chrome.runtime.sendMessage({ type: "GET_SELECTION" }, (res) => {
      if (typeof res === "string" && res.length) {
        chrome.storage.session.remove("lastImageUrl");

        setMode("text");
        setText(res);
        setAiTree(null);

        callHealthCopilot(res);
      }
    });

    // IMAGE intent
    chrome.storage.session.get(
      ["lastImageUrl"],
      (res: { lastImageUrl?: unknown }) => {
        if (typeof res.lastImageUrl === "string") {
          setMode("image");
          setImageUrl(res.lastImageUrl);
          setAiTree(null);

          callHealthCopilot(
            `Analyze the health implications of this packaged food product based on its image: ${res.lastImageUrl}`
          );
        }
      }
    );
  }, []);

  /* -----------------------------
     Follow-up buttons
  ------------------------------ */
  useEffect(() => {
    function onAction(e: any) {
      // For follow-up actions, we might want to treat it as a new prompt
      setAiTree(null);
      callHealthCopilot(e.detail);
    }

    window.addEventListener("C1_ACTION", onAction);
    return () => window.removeEventListener("C1_ACTION", onAction);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans text-foreground overflow-hidden">

      {/* ---------- Header ---------- */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 py-3 bg-white/80 backdrop-blur-md border-b border-border/60 shrink-0 sticky top-0 z-50 flex items-center justify-between shadow-sm"
      >
        <div>
          <h2 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
            Health Copilot
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Beta</span>
          </h2>
          <p className="text-[11px] text-muted-foreground font-medium">
            AI-Native Nutritionist
          </p>
        </div>
        
      </motion.div>

      {/* ---------- Scrollable content ---------- */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-32 no-scrollbar scroll-smooth">
        
        {/* Sticky Summary Hero */}
        <AnimatePresence>
          {aiTree && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="sticky top-0 z-40 bg-slate-50/95 backdrop-blur-sm px-4 pt-4 pb-2 border-b border-transparent transition-all"
            >
              <SummaryHero
                tree={aiTree}
                mode={mode === "text" || mode === "image" ? mode : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Container */}
        <div className="px-4 py-4 space-y-5 max-w-[420px] mx-auto">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-3 text-xs">
              {errorMsg}
            </div>
          )}
          
          {/* Empty State */}
          {mode === "idle" && !loading && !aiTree && <EmptyState />}

          {/* Context Cards */}
          <AnimatePresence>
            {mode === "text" && text && !aiTree && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="flex justify-end">
                  <div className="flex items-end gap-2 max-w-[75%]">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-3 py-2 text-xs shadow-sm">
                      <p className="font-medium mb-1 opacity-90">Analyzing selection</p>
                      <p className="opacity-90 font-mono">
                        {text}
                      </p>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            )}

            {mode === "image" && imageUrl && !aiTree && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="flex justify-end">
                  <div className="flex items-end gap-2 max-w-[75%]">
                    <div className="bg-purple-600 text-white rounded-2xl rounded-br-sm px-3 py-2 text-xs shadow-sm">
                      <p className="font-medium mb-2 opacity-90">Analyzing image</p>
                      <div className="relative rounded-lg overflow-hidden bg-white">
                        <img
                          src={imageUrl}
                          alt="Analyzed product"
                          className="w-full h-14 sm:h-16 object-contain max-w-[150px]"
                        />
                      </div>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Detailed Breakdown */}
          {aiTree && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-2">
                <div className="bg-white border border-border/60 rounded-2xl rounded-tl-sm shadow-sm p-3 w-full">
                  <ThesysRenderer node={aiTree} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ---------- Chat Input ---------- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-border/60 px-4 py-3 pb-5 safe-bottom z-50"
      >
        <ChatInput onSend={callHealthCopilot} disabled={loading} />
      </motion.div>

    </div>
  );
}
