import React, { useState, useRef, useEffect } from "react";
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid";
import { Button } from "@/components/ui/button";
import { ChevronDown, Send, Sparkles, Bot, User, Paperclip, ArrowUp, CodeXml, Rocket, Layers, Palette, Monitor, FileUp, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchAIResponse, type ChatMessage } from "@/lib/ai-service";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--primary)",
              animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    setHasInteracted(true);
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text.trim(),
    };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      // Map local messages to OpenRouter format
      const apiMessages: ChatMessage[] = newMessages.map(msg => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.content
      }));

      const responseText = await fetchAIResponse(apiMessages);
      
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: responseText,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: "Oops! Something went wrong while connecting to my brain. Please try asking again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    { icon: CodeXml, text: "Edge AI Skills" },
    { icon: Rocket, text: "KidSentry Project" },
    { icon: Layers, text: "IoT Architectures" },
    { icon: Palette, text: "UI/UX Design" },
    { icon: User, text: "Resume Overview" },
    { icon: Monitor, text: "System Dashboards" },
    { icon: FileUp, text: "Upload Docs" },
    { icon: ImageIcon, text: "Project Demos" },
  ];

  return (
    <section className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      {/* Interactive Background */}
      <ThermodynamicGrid resolution={12} coolingFactor={0.96} />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/40 to-[#0a0a0f]/90 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 w-full px-4 sm:px-6 max-w-3xl mx-auto flex flex-col items-center mt-8 pointer-events-none transition-all duration-700">

        {/* Header Area (Shrinks if interacted) */}
        <div className={cn(
          "flex flex-col items-center text-center transition-all duration-700",
          hasInteracted ? "opacity-0 h-0 overflow-hidden mb-0" : "opacity-100 h-auto mb-10"
        )}>
          {/* Name (De-emphasized) */}
          <h1
            className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold tracking-widest mb-2 animate-fade-up opacity-0 stagger-1"
            style={{ color: "var(--foreground)" }}
          >
            Edwin Jr. <span style={{ color: "var(--primary)" }}> P. Bayog</span>
          </h1>

          {/* Title */}
          <p
            className="font-[var(--font-display)] text-xs sm:text-sm font-medium tracking-widest uppercase animate-fade-up opacity-0 stagger-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            Computer Engineer · IoT - Fullstack - AI & Agentic Systems
          </p>
        </div>

        {/* AI Prompt Box Area */}
        <div className={cn(
          "w-full flex flex-col items-center pointer-events-auto transition-all duration-700",
          hasInteracted ? "h-[60vh]" : "animate-fade-up opacity-0 stagger-3"
        )}>

          {/* Chat History Display */}
          {hasInteracted && (
            <div 
              ref={chatContainerRef} 
              className="w-full flex-1 overflow-y-auto mb-6 pr-2 space-y-6 scrollbar-thin flex flex-col"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
                  )}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-1"
                    style={{
                      background: msg.role === "ai" ? "rgba(255,95,0,0.15)" : "rgba(255,212,0,0.15)",
                      border: `1px solid ${msg.role === "ai" ? "rgba(255,95,0,0.3)" : "rgba(255,212,0,0.3)"}`
                    }}
                  >
                    {msg.role === "ai" ? (
                      <Bot size={16} style={{ color: "var(--primary)" }} />
                    ) : (
                      <User size={16} style={{ color: "var(--accent)" }} />
                    )}
                  </div>
                  <div
                    className="px-5 py-3.5 rounded-2xl text-sm sm:text-base leading-relaxed"
                    style={{
                      background: "rgba(12, 10, 18, 0.6)",
                      backdropFilter: "blur(12px)",
                      color: "var(--foreground)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderTopLeftRadius: msg.role === "ai" ? "4px" : "1rem",
                      borderTopRightRadius: msg.role === "user" ? "4px" : "1rem",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] self-start">
                  <div
                    className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-1"
                    style={{
                      background: "rgba(255,95,0,0.15)",
                      border: "1px solid rgba(255,95,0,0.3)"
                    }}
                  >
                    <Bot size={16} style={{ color: "var(--primary)" }} />
                  </div>
                  <div
                    className="px-5 py-2.5 rounded-2xl"
                    style={{
                      background: "rgba(12, 10, 18, 0.6)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderTopLeftRadius: "4px",
                    }}
                  >
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Main Input Box */}
          <div
            className="w-full relative group transition-all duration-300"
            style={{
              background: "rgba(12, 10, 18, 0.75)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 140, 0, 0.25)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 95, 0, 0.1)",
              borderRadius: "1.5rem"
            }}
          >
            <form
              className="relative flex flex-col p-4 sm:p-5 min-h-[140px]"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about the projects I've brought to life..."
                className="w-full bg-transparent border-none outline-none resize-none flex-1 text-sm sm:text-base placeholder:text-white/30"
                style={{ color: "var(--foreground)" }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
              />

              {/* Bottom Row of Input Box */}
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  className="p-2 rounded-xl text-white/40 hover:text-[var(--primary)] hover:bg-white/5 transition-colors"
                >
                  <Paperclip size={18} />
                </button>

                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim()}
                  className="h-9 w-9 shrink-0 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    background: inputValue.trim() ? "linear-gradient(135deg, var(--primary), var(--secondary))" : "rgba(255, 255, 255, 0.05)",
                    color: inputValue.trim() ? "white" : "rgba(255, 255, 255, 0.3)"
                  }}
                >
                  <ArrowUp size={18} />
                </Button>
              </div>
            </form>
          </div>

          {/* Prompt Suggestions */}
          {!hasInteracted && (
            <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-2xl">
              {suggestions.map((suggestion, i) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion.text)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "var(--foreground)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--secondary)";
                      e.currentTarget.style.background = "rgba(255, 140, 0, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                    }}
                  >
                    <Icon size={14} className="opacity-70" />
                    <span>{suggestion.text}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* Scroll indicator */}
      {!hasInteracted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-chevron-bounce cursor-pointer pointer-events-auto"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDown size={32} style={{ color: "var(--muted-foreground)" }} />
        </div>
      )}
    </section>
  );
}
