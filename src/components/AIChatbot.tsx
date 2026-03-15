import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am the BitProx AI Trading Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Use flash-lite for simple queries, pro for complex ones (simulated by length for now)
      const isComplex = userMessage.length > 50 || userMessage.toLowerCase().includes('explain') || userMessage.toLowerCase().includes('strategy');
      
      const model = isComplex ? 'gemini-3.1-pro-preview' : 'gemini-3.1-flash-lite-preview';
      const config = isComplex ? { thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } } : undefined;

      const response = await ai.models.generateContent({
        model,
        contents: userMessage,
        config: {
          ...config,
          systemInstruction: "You are the BitProx AI Trading Assistant. You help users understand the BitProx investment platform, explain trading strategies, and provide support. Be professional, helpful, and concise. BitProx is a high-yield investment platform offering up to 15% daily returns.",
        }
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'model', text: response.text! }]);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error processing your request. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : ''}`}
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-6 right-4 left-4 md:left-auto md:right-6 z-50 md:w-96 h-[500px] bg-black/80 border border-cyan-500/30 rounded-3xl backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">BitProx AI</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-500/20' : 'bg-cyan-500/20'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-blue-400" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/10 rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span className="text-xs text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about trading strategies..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl py-2 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
