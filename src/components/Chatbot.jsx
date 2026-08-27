import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─── Knowledge base with synonym groups ─── */
const KNOWLEDGE = [
  {
    keys: ['contact', 'reach', 'call', 'talk', 'connect', 'get in touch'],
    reply: "You can reach **Shivam Sharma** at 📞 +91 72800 12300 or ✉️ enquiry@nsucolours.com.",
  },
  {
    keys: ['phone', 'number', 'mobile', 'telephone'],
    reply: "Our phone number is 📞 **+91 72800 12300** (Shivam Sharma).",
  },
  {
    keys: ['email', 'mail'],
    reply: "Drop us a line at ✉️ **enquiry@nsucolours.com** — we typically respond within 24 hours.",
  },
  {
    keys: ['location', 'address', 'office', 'where', 'visit', 'factory', 'manufacturing', 'unit', 'plant'],
    reply: "🏢 **Head Office** — Nai Sadak Chowk, Patna City, Bihar 800008\n🏭 **Manufacturing Unit** — Hajipur Industrial Area, Vaishali, Bihar 844102",
  },
  {
    keys: ['product', 'range', 'catalogue', 'catalog', 'what do you', 'sell', 'offer', 'make'],
    reply: "We specialise in four categories:\n• Sindoor Colour\n• Fluorescent Pigments\n• Bright Colour Powders\n• Custom Colour Solutions\n\nWant me to tell you more about any of these?",
    nav: { label: 'View Products →', to: '/products' },
  },
  {
    keys: ['sindoor', 'traditional'],
    reply: "Our **Sindoor Colour** range delivers rich, expressive shades — from classic red to deep red and custom-blend options — designed for a confident and consistent traditional finish.",
    nav: { label: 'Explore Sindoor Range →', to: '/products' },
  },
  {
    keys: ['fluorescent', 'neon', 'glow', 'bright pigment', 'uv'],
    reply: "Our **Fluorescent Pigments** come in Red, Pink, Orange, Yellow, Green & Magenta — intense colour systems that deliver unmistakable visual energy for high-visibility applications.",
    nav: { label: 'See Fluorescent Pigments →', to: '/products' },
  },
  {
    keys: ['powder', 'colour powder', 'color powder'],
    reply: "Our **Bright Colour Powders** are brilliant powder colours for dynamic surfaces, products and applications — available in Red, Orange, Yellow, Pink, Magenta and Custom shades.",
    nav: { label: 'Browse Colour Powders →', to: '/products' },
  },
  {
    keys: ['custom', 'bespoke', 'tailored', 'specific', 'requirement', 'develop'],
    reply: "We offer **Custom Colour Development** — a collaborative process where we match your target shade and application needs. Get in touch via our contact page to start the conversation!",
    nav: { label: 'Request Custom Colour →', to: '/contact' },
  },
  {
    keys: ['application', 'use case', 'industry', 'textile', 'plastic', 'polymer', 'ink', 'print', 'industrial'],
    reply: "Our pigments serve diverse industries:\n• Sindoor & Traditional Products\n• Textiles\n• Plastics & Polymers\n• Printing & Inks\n• Industrial Applications\n• Custom Development",
    nav: { label: 'View Applications →', to: '/applications' },
  },
  {
    keys: ['about', 'company', 'nsu', 'narayan', 'who are', 'history', 'story'],
    reply: "**Narayan Sindoor Udyog (NSU)** is a Bihar-based colour manufacturer specialising in high-quality pigments and colour powders. We combine traditional expertise with modern manufacturing.",
    nav: { label: 'About NSU →', to: '/about' },
  },
  {
    keys: ['enquiry', 'inquiry', 'quote', 'pricing', 'price', 'cost', 'order', 'buy', 'purchase', 'bulk'],
    reply: "For pricing, bulk orders, or a custom quotation, please submit your requirements through our enquiry form — our team will get back to you promptly!",
    nav: { label: 'Submit Enquiry →', to: '/contact' },
  },
  {
    keys: ['whatsapp', 'chat', 'wa'],
    reply: "You can also reach us on WhatsApp for a quick conversation: 💬 [+91 72800 12300](https://wa.me/917280012300)",
  },
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
    reply: "Hello! 👋 Welcome to NSU Colours. How can I help you today?",
  },
  {
    keys: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'helpful'],
    reply: "You're welcome! 😊 Is there anything else I can help you with?",
  },
  {
    keys: ['bye', 'goodbye', 'see you', 'later'],
    reply: "Goodbye! Thanks for visiting NSU Colours. Feel free to chat anytime! 👋",
  },
];

const QUICK_CHIPS = [
  { label: '🎨 Products', query: 'What products do you offer?' },
  { label: '📞 Contact', query: 'How can I contact you?' },
  { label: '📍 Location', query: 'Where is your office?' },
  { label: '💰 Get Quote', query: 'I want a price quote' },
];

const GREETING = {
  sender: 'bot',
  text: "Hi! 👋 I'm your **NSU Colours** assistant. Ask me about our products, locations, or pricing — or tap a quick option below!",
  time: new Date(),
};

/* ─── Simple markdown-ish renderer (bold + links) ─── */
function RichText({ text }) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|\n)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part === '\n') return <br key={i} />;
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch)
          return (
            <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors">
              {linkMatch[1]}
            </a>
          );
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ─── Typing indicator dots ─── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 self-start rounded-xl border border-theme bg-primary px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: 'var(--text-secondary)' }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ─── Time formatter ─── */
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ─── Main Chatbot Component ─── */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([GREETING]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [fabHover, setFabHover] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const tooltipTimerRef = useRef(null);
  const prevIsOpenRef = useRef(false);
  const navigate = useNavigate();

  /* Show tooltip on initial mount */
  useEffect(() => {
    const timer = setTimeout(() => setFabHover(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  /* Show tooltip for 3 seconds every time the chatbot is closed */
  useEffect(() => {
    if (prevIsOpenRef.current && !isOpen) {
      setFabHover(true);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  /* Auto-dismiss tooltip after 3 seconds (fixes mobile where no mouseLeave fires) */
  useEffect(() => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
    if (fabHover) {
      tooltipTimerRef.current = setTimeout(() => {
        setFabHover(false);
      }, 3000);
    }
    return () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
    };
  }, [fabHover]);

  /* Auto-scroll to bottom */
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  /* Focus input when opening */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasUnread(false);
    }
  }, [isOpen]);

  /* Track scroll position for "scroll to bottom" button */
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setShowScrollBtn(!isNearBottom);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Match user input against knowledge base */
  const getBotReply = (userText) => {
    const text = userText.toLowerCase();
    for (const entry of KNOWLEDGE) {
      if (entry.keys.some((key) => text.includes(key))) {
        return { text: entry.reply, nav: entry.nav || null };
      }
    }
    return {
      text: "I'm not sure about that — but I can help with our **products**, **contact details**, **locations**, or **pricing**. You can also visit our Contact page to speak with our team directly!",
      nav: { label: 'Go to Contact Page →', to: '/contact' },
    };
  };

  /* Send handler */
  const handleSend = (e) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { sender: 'user', text: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    /* Simulate typing delay (proportional to reply length, with min/max bounds) */
    const reply = getBotReply(trimmed);
    const delay = Math.min(Math.max(reply.text.length * 8, 500), 1800);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = { sender: 'bot', text: reply.text, nav: reply.nav, time: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setHasUnread(true);
    }, delay);
  };

  /* Quick chip handler */
  const handleChip = (query) => {
    setInput(query);
    setTimeout(() => {
      const userMsg = { sender: 'user', text: query, time: new Date() };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      const reply = getBotReply(query);
      const delay = Math.min(Math.max(reply.text.length * 8, 500), 1800);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', text: reply.text, nav: reply.nav, time: new Date() }]);
      }, delay);
    }, 100);
  };

  /* Navigation from bot reply */
  const handleNavClick = (to) => {
    navigate(to);
    setIsOpen(false);
  };

  /* Determine if we should show quick chips (only after the greeting or default reply) */
  const lastBotMsg = [...messages].reverse().find((m) => m.sender === 'bot');
  const showChips = messages.length <= 1 || (lastBotMsg && lastBotMsg === messages[messages.length - 1] && !isTyping);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="mb-4 flex w-80 flex-col overflow-hidden rounded-2xl border border-theme shadow-2xl sm:w-96"
            style={{ background: 'var(--bg-card)', maxHeight: 'min(580px, calc(100dvh - 120px))' }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-theme px-4 py-3"
              style={{ background: 'var(--bg-secondary)' }}>
              {/* Subtle gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #ef476f, #ffc21c, #ef476f)' }} />
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: 'var(--accent-color)' }}>
                  <Bot size={18} style={{ color: 'var(--on-accent)' }} />
                  {/* Online pulse */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2"
                      style={{ '--tw-ring-color': 'var(--bg-secondary)' }} />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    NSU Assistant
                  </span>
                  <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Always online • Instant replies
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-3"
              style={{ minHeight: '260px', maxHeight: '340px', scrollbarWidth: 'thin' }}
            >
              {messages.map((msg, i) => {
                const isUser = msg.sender === 'user';
                const isFirst = i === 0 || messages[i - 1]?.sender !== msg.sender;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} ${isFirst ? 'mt-2' : 'mt-0.5'}`}
                  >
                    {/* Avatar + Name (only on first message in a group) */}
                    {isFirst && (
                      <div className={`mb-1 flex items-center gap-1.5 ${isUser ? 'flex-row-reverse' : ''}`}>
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-full"
                          style={{
                            background: isUser ? 'var(--accent-color)' : 'var(--border-color)',
                          }}
                        >
                          {isUser
                            ? <User size={10} style={{ color: 'var(--on-accent)' }} />
                            : <Sparkles size={10} style={{ color: 'var(--text-primary)' }} />
                          }
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider"
                          style={{ color: 'var(--text-secondary)' }}>
                          {isUser ? 'You' : 'NSU Bot'}
                        </span>
                      </div>
                    )}

                    {/* Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        isUser
                          ? 'rounded-br-md'
                          : 'rounded-bl-md border'
                      }`}
                      style={
                        isUser
                          ? { background: 'var(--accent-color)', color: 'var(--on-accent)' }
                          : { background: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }
                      }
                    >
                      <RichText text={msg.text} />

                      {/* Navigation button inside bot reply */}
                      {msg.nav && (
                        <button
                          onClick={() => handleNavClick(msg.nav.to)}
                          className="mt-2 block w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold transition-all hover:scale-[1.02]"
                          style={{
                            background: 'var(--accent-color)',
                            color: 'var(--on-accent)',
                          }}
                        >
                          {msg.nav.label}
                        </button>
                      )}
                    </div>

                    {/* Timestamp */}
                    {msg.time && (
                      <span className="mt-0.5 text-[9px] tabular-nums"
                        style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                        {formatTime(msg.time)}
                      </span>
                    )}
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <TypingIndicator />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[88px] left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-theme shadow-lg"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', zIndex: 10 }}
                  aria-label="Scroll to latest message"
                >
                  <ChevronDown size={14} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Quick Chips */}
            {showChips && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-1.5 border-t border-theme px-3 py-2"
                style={{ background: 'var(--bg-secondary)' }}
              >
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleChip(chip.query)}
                    className="rounded-full border px-3 py-1 text-[11px] font-semibold transition-all hover:scale-105"
                    style={{
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-primary)',
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-theme p-3"
              style={{ background: 'var(--bg-card)' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="min-h-10 flex-1 rounded-full border px-4 text-sm outline-none transition-all"
                style={{
                  borderColor: 'var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                style={{ background: 'var(--accent-color)', color: 'var(--on-accent)' }}
                aria-label="Send message"
              >
                <Send size={16} className="-ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FAB Toggle Button ─── */}
      <div className="relative group"
        onMouseEnter={() => setFabHover(true)}
        onMouseLeave={() => setFabHover(false)}
      >
        {/* Tooltip bubble — appears above FAB */}
        <AnimatePresence>
          {fabHover && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="absolute bottom-[calc(100%+14px)] right-0 whitespace-nowrap rounded-2xl px-5 py-3 shadow-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, var(--accent-color) 0%, #1e40af 100%)',
                color: '#ffffff',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🤖</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-tight tracking-tight">NSU Assistant</span>
                  <span className="text-[11px] font-medium leading-tight opacity-85">Try it out and see what's new!</span>
                </div>
              </div>
              {/* Arrow pointing down */}
              <div
                className="absolute -bottom-[7px] right-5 h-3.5 w-3.5 rotate-45"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, #1e40af 100%)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setFabHover(false);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-xl"
          style={{ background: 'var(--accent-color)', color: 'var(--on-accent)' }}
          aria-label="Toggle chat"
        >
          {/* Unread dot */}
          {hasUnread && !isOpen && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                !
              </span>
            </span>
          )}

          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
