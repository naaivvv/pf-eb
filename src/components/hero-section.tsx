import { useState, useRef, useEffect } from "react";
import { GenerativeArtScene } from "@/components/ui/anomalous-matter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bot, User, Paperclip, ArrowUp, CodeXml, Rocket, Layers, Palette, Monitor, FileUp, Image as ImageIcon, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchAIResponse, type ChatMessage } from "@/lib/ai-service";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

interface HeroSectionProps {
  isDark: boolean;
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

  return (
    <div className="flex flex-col gap-2">
      <div className="chat-markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {mainContent}
        </ReactMarkdown>
      </div>
      {attachedFileName && (
        <div
          className="flex items-center gap-2 mt-1 px-3 py-1.5 rounded-lg w-fit"
          style={{
            background: "var(--surface-subtle)",
            border: "1px solid var(--border-subtle)",
          }}
        >
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

export default function HeroSection({ isDark }: HeroSectionProps) {
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
    { icon: CodeXml, text: "AI Skills" },
    { icon: Rocket, text: "Projects" },
    { icon: User, text: "Resume Overview" },
    { icon: ImageIcon, text: "Project Demos" },
  ];

  // Theme-aware colors
  const aiAvatarBg = isDark ? "rgba(255,95,0,0.15)" : "rgba(255,95,0,0.10)";
  const aiAvatarBorder = isDark ? "rgba(255,95,0,0.3)" : "rgba(255,95,0,0.25)";
  const userAvatarBg = isDark ? "rgba(255,212,0,0.15)" : "rgba(255,212,0,0.10)";
  const userAvatarBorder = isDark ? "rgba(255,212,0,0.3)" : "rgba(255,212,0,0.25)";

  return (
    <section className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* 3D Anomalous Matter — hero-only */}
      <GenerativeArtScene className="z-0" />


      {/* Content Layer */}
      <div className="relative z-10 w-full px-4 sm:px-6 max-w-3xl mx-auto flex flex-col items-center mt-8 pointer-events-none transition-all duration-700">

        {/* Header Area (Shrinks if interacted) */}
        <div className={cn(
          "relative flex flex-col items-center text-center transition-all duration-[1000ms] ease-out z-10",
          hasInteracted ? "opacity-0 h-0 overflow-hidden mb-0 scale-95" : "opacity-100 h-auto mb-6 scale-100"
        )}>
          {/* Conversational Greeting */}
          <h1
            className="font-[var(--font-display)] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight max-w-5xl animate-fade-up opacity-0 stagger-1 drop-shadow-sm"
            style={{ color: "var(--foreground)" }}
          >
            Hi, I'm <span className={cn("drop-shadow-md", isDark ? "text-[color:var(--primary)]" : "text-white")}>Edwin Jr.</span>
          </h1>

          <p
            className="font-[var(--font-display)] text-base sm:text-lg md:text-xl font-medium tracking-tight leading-relaxed max-w-3xl mt-2 animate-fade-up opacity-0 stagger-2"
            style={{ color: isDark ? "var(--muted-foreground)" : "#2a2420" }}
          >
            A Computer Engineer who builds things with
          </p>

          <div className="mt-2 sm:mt-4 animate-fade-up opacity-0 stagger-2 w-full flex justify-center px-4">
            <GooeyText
              texts={["IoT", "Full-stack", "AI Agents"]}
              morphTime={2}
              cooldownTime={4}
              className="text-[clamp(2rem,8vw,4rem)] leading-none inline-flex items-center justify-center w-full max-w-full h-[1.3em] overflow-visible"
              textClassName={cn(
                "font-black tracking-tighter drop-shadow-md uppercase whitespace-nowrap",
                isDark ? "text-[color:var(--primary)]" : "text-white"
              )}
            />
          </div>
        </div>

        {/* AI Prompt Box Area */}
        <div className={cn(
          "w-full flex flex-col items-center pointer-events-auto transition-all duration-700",
          hasInteracted ? "h-[60vh]" : "animate-fade-up opacity-0 stagger-3"
        )}>

          {/* Chat History Display */}
          {hasInteracted && (
            <div className="w-full flex-1 flex flex-col mb-6 min-h-0">
              <div className="flex justify-end items-center mb-4 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMessages([]);
                    setHasInteracted(false);
                    setInputValue("");
                    setAttachedFile(null);
                  }}
                  className="h-8 rounded-lg text-xs"
                  style={{ color: "var(--muted-foreground)" }}
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
                        background: msg.role === "ai" ? aiAvatarBg : userAvatarBg,
                        border: `1px solid ${msg.role === "ai" ? aiAvatarBorder : userAvatarBorder}`
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
                        background: "var(--chat-bubble-bg)",
                        backdropFilter: "blur(12px)",
                        color: "var(--foreground)",
                        border: "1px solid var(--glass-border)",
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
                        background: aiAvatarBg,
                        border: `1px solid ${aiAvatarBorder}`
                      }}
                    >
                      <Bot size={16} style={{ color: "var(--primary)" }} />
                    </div>
                    <div
                      className="px-5 py-2.5 rounded-2xl"
                      style={{
                        background: "var(--chat-bubble-bg)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid var(--glass-border)",
                        borderTopLeftRadius: "4px",
                      }}
                    >
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Main Input Box */}
          <div
            className="w-full relative group transition-all duration-300"
            style={{
              background: "var(--chat-input-bg)",
              backdropFilter: "blur(24px)",
              border: `1px solid var(--chat-input-border)`,
              boxShadow: "var(--chat-input-shadow)",
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
                <div
                  className="flex items-center justify-between px-3 py-2 mb-2 rounded-lg backdrop-blur-sm"
                  style={{
                    background: "var(--surface-subtle)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileUp size={14} style={{ color: "var(--primary)" }} className="shrink-0" />
                    <span className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{attachedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="p-1 rounded-md transition-colors shrink-0"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={attachedFile ? "Add a message about this document..." : "Ask about the projects I've brought to life..."}
                className="w-full bg-transparent border-none outline-none resize-none flex-1 text-sm sm:text-base"
                style={{
                  color: "var(--foreground)",
                  caretColor: "var(--primary)",
                }}
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
                  className="p-2 rounded-xl transition-colors"
                  style={{ color: "var(--muted-foreground)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
                >
                  <Paperclip size={18} />
                </button>

                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() && !attachedFile}
                  className="h-9 w-9 shrink-0 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    background: (inputValue.trim() || attachedFile) ? "linear-gradient(135deg, var(--primary), var(--secondary))" : "var(--surface-subtle)",
                    color: (inputValue.trim() || attachedFile) ? "white" : "var(--muted-foreground)"
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
                      background: isDark ? "rgba(12, 10, 18, 0.55)" : "rgba(245, 242, 238, 0.75)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--foreground)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--secondary)";
                      e.currentTarget.style.background = isDark ? "rgba(255, 140, 0, 0.08)" : "rgba(245, 242, 238, 0.88)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.background = isDark ? "rgba(12, 10, 18, 0.55)" : "rgba(245, 242, 238, 0.75)";
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
