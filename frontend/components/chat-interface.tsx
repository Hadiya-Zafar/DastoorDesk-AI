"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileCheck, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EvidencePanel } from "@/components/evidence-panel";
import { DepartmentIcon } from "@/components/department-icon";
import { askLegalAI } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import type { LegalDepartment } from "@/lib/legal-departments";

interface ChatInterfaceProps {
  department: LegalDepartment;
}

export function ChatInterface({ department }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🎤 VOICE INPUT
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🔊 VOICE OUTPUT FUNCTION
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      let cleanText = text
        .replace(/[#*`>-]/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/:/g, ".")
        .replace(/\n+/g, ". ")
        .replace(/\s+/g, " ")
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9;
      utterance.pitch = 1;

      window.speechSynthesis.speak(utterance);
    }
  };

  // Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🎤 SPEECH RECOGNITION SETUP
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let transcript = "";
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          transcript = transcript.replace(/\s+/g, " ").trim();
          const isUrduScript = /[\u0600-\u06FF]/.test(transcript);
          if (!isUrduScript) {
            const lower = transcript.toLowerCase();
            transcript = lower.charAt(0).toUpperCase() + lower.slice(1);
          }
          setInput(transcript);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // 🎤 TOGGLE VOICE INPUT
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      const text = input.toLowerCase();
      recognitionRef.current.lang = /[؀-ۿ]/.test(text) ? "ur-PK" : "en-US";
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // 🔥 MAIN CHAT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await askLegalAI(input, department.id);
      const botMessage = {
        role: "assistant",
        content: data.answer,
        evidence: data.evidence_list,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to backend." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`group relative max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-xl backdrop-blur-md border ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground border-primary/20 rounded-tr-sm shadow-primary/20"
                    : "bg-white/10 dark:bg-muted/10 text-foreground border-white/20 dark:border-white/5 rounded-tl-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
                    <ReactMarkdown
                      components={{
                        h3: ({ ...props }) => <h3 className="font-bold text-lg mt-4 mb-2" {...props} />,
                        strong: ({ ...props }) => <strong className="font-bold text-primary dark:text-primary" {...props} />,
                        li: ({ ...props }) => <li className="ml-4 list-disc marker:text-primary mb-1" {...props} />,
                        p: ({ ...props }) => <p className="mb-3" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>

                  {message.role === "assistant" && (
                    <button
                      onClick={() => speakText(message.content)}
                      className="mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-primary/20 rounded-lg text-muted-foreground/60 hover:text-primary"
                      title="Speak response"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {message.evidence && (
                  <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/80">
                      <FileCheck className="h-3 w-3" />
                      Required Evidence
                    </div>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {message.evidence.map((item: string, i: number) => (
                        <li key={i} className="text-xs text-foreground/70 flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-sm text-primary/80 animate-pulse px-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="font-medium tracking-wide">Synthesizing Pakistani Law...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/10 dark:border-white/5 bg-white/5 dark:bg-black/20 backdrop-blur-xl p-4 sm:p-6 z-20">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/40 p-2.5 shadow-2xl focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-300">
            {speechSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleListening}
                className={`h-11 w-11 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? "bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse" 
                    : "text-foreground/40 hover:text-foreground hover:bg-white/10"
                }`}
                disabled={isLoading}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
            )}

            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              placeholder={
                isListening
                  ? "I'm listening..."
                  : `Describe your ${department.name.toLowerCase()} issue...`
              }
              className="flex-1 min-h-[44px] max-h-32 resize-none border-0 bg-transparent py-3 px-3 text-sm placeholder:text-foreground/30 focus-visible:ring-0 leading-relaxed"
              disabled={isLoading}
            />

            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="h-11 w-11 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}