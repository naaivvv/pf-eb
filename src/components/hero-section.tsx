import { useState, useRef, useEffect } from "react";
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bot, User, Paperclip, ArrowUp, CodeXml, Rocket, Layers, Palette, Monitor, FileUp, Image as ImageIcon, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchAIResponse, type ChatMessage } from "@/lib/ai-service";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

function formatMessageContent(content: string) {
  // Extract attached document if present
  const docMatch = content.match(/\[Attached Document: (.*?)\]\n([\s\S]*)$/);
  let mainContent = content;
  let attachedFileName = null;

  if (docMatch) {
    mainContent = content.substring(0, docMatch.index).trim();
    attachedFileName = docMatch[1];
    if (!mainContent) {
      mainContent = `Uploaded a document`;
    }
  }

  const parts = mainContent.split(/(\*\*.*?\*\*)/g);
  return (
    <div className="flex flex-col gap-2">
      <div>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-semibold text-white drop-shadow-sm">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
      {attachedFileName && (
        <div className="flex items-center gap-2 mt-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 w-fit">
          <FileUp size={14} className="opacity-70" />
          <span className="text-xs opacity-70">{attachedFileName}</span>
        </div>
      )}
    </div>
  );
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
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAttachedFile({
        name: file.name,
        content: event.target?.result as string,
      });
    };
    reader.readAsText(file);
    // Reset input so the same file can be uploaded again if removed
    e.target.value = '';
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() && !attachedFile) return;

    setHasInteracted(true);
    
    let finalContent = text.trim();
    if (attachedFile) {
      finalContent += `\n\n[Attached Document: ${attachedFile.name}]\n${attachedFile.content}`;
    }

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: finalContent.trim(),
    };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setAttachedFile(null);
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
            <div className="w-full flex-1 flex flex-col mb-6 min-h-0">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Conversation</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setMessages([]);
                    setHasInteracted(false);
                    setInputValue("");
                    setAttachedFile(null);
                  }}
                  className="h-8 text-white/50 hover:text-white hover:bg-white/10 rounded-lg text-xs"
                >
                  <RotateCcw size={14} className="mr-1.5" />
                  New Chat
                </Button>
              </div>
              <div 
                ref={chatContainerRef} 
                className="w-full flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin flex flex-col"
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
                    {formatMessageContent(msg.content)}
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
              {/* Attachment Badge (if any) */}
              {attachedFile && (
                <div className="flex items-center justify-between px-3 py-2 mb-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileUp size={14} className="text-[var(--primary)] shrink-0" />
                    <span className="text-xs text-white/70 truncate">{attachedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={attachedFile ? "Add a message about this document..." : "Ask about the projects I've brought to life..."}
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
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload}
                  accept=".txt,.md,.csv" 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl text-white/40 hover:text-[var(--primary)] hover:bg-white/5 transition-colors"
                >
                  <Paperclip size={18} />
                </button>

                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() && !attachedFile}
                  className="h-9 w-9 shrink-0 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    background: (inputValue.trim() || attachedFile) ? "linear-gradient(135deg, var(--primary), var(--secondary))" : "rgba(255, 255, 255, 0.05)",
                    color: (inputValue.trim() || attachedFile) ? "white" : "rgba(255, 255, 255, 0.3)"
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
