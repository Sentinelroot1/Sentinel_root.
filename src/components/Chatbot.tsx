import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { askCyberAssistant } from '../services/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm cipher1, your cybersecurity mentor. How can I help you on your journey today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await askCyberAssistant(userMessage, history);
    setMessages(prev => [...prev, { role: 'model', content: response || 'No response' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-cyber-green text-cyber-black flex items-center justify-center shadow-lg shadow-cyber-green/20 hover:scale-110 transition-transform cursor-pointer"
          >
            <Bot size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={cn(
              "glass-panel flex flex-col shadow-2xl overflow-hidden transition-all duration-300",
              isMinimized ? "h-14 w-72" : "h-[600px] w-[400px] max-w-[90vw]"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">cipher1 Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
                >
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        msg.role === 'user' ? "bg-cyber-blue/20 text-cyber-blue" : "bg-cyber-green/20 text-cyber-green"
                      )}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user' 
                          ? "bg-cyber-blue/10 text-slate-200 rounded-tr-none border border-cyber-blue/20" 
                          : "bg-white/5 text-slate-300 rounded-tl-none border border-white/10"
                      )}>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 mr-auto animate-pulse">
                      <div className="w-8 h-8 rounded-lg bg-cyber-green/20 flex items-center justify-center">
                        <Bot size={16} className="text-cyber-green" />
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyber-green/50 animate-bounce" />
                          <div className="w-1.5 h-1.5 rounded-full bg-cyber-green/50 animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 rounded-full bg-cyber-green/50 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 bg-white/5 border-t border-white/10">
                  <div className="relative flex items-center">
                    <Terminal size={14} className="absolute left-3 text-cyber-green" />
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask Nexus..."
                      className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 pl-9 pr-10 text-sm focus:outline-none focus:border-cyber-green/50 transition-colors"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="absolute right-2 p-1 text-cyber-green hover:bg-cyber-green/10 rounded transition-colors disabled:opacity-50"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
