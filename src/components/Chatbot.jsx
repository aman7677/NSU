import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ─── Knowledge base with synonym groups ─── */
const KNOWLEDGE = [
  /* ── Greetings & Farewells ── */
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'hola'],
    reply: "Hello! 👋 Welcome to **NSU Colours**. I can help you with our products, pricing, locations, applications, and more. How can I assist you today?",
  },
  {
    keys: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'helpful', 'nice', 'wonderful'],
    reply: "You're welcome! 😊 Is there anything else I can help you with?",
  },
  {
    keys: ['bye', 'goodbye', 'see you', 'later', 'take care'],
    reply: "Goodbye! Thanks for visiting NSU Colours. Feel free to chat anytime! 👋🎨",
  },

  /* ── Contact & Communication ── */
  {
    keys: ['contact', 'reach', 'call', 'talk', 'connect', 'get in touch', 'speak'],
    reply: "You can reach **Shivam Sharma** at:\n📞 +91 72800 12300\n✉️ enquiry@nsucolours.com\n💬 [WhatsApp](https://wa.me/917280012300)\n\nOr fill out our enquiry form on the Contact page!",
    nav: { label: 'Go to Contact Page →', to: '/contact' },
  },
  {
    keys: ['phone', 'number', 'mobile', 'telephone'],
    reply: "Our phone number is 📞 **+91 72800 12300** (Shivam Sharma). We're available during business hours!",
  },
  {
    keys: ['email', 'mail'],
    reply: "Drop us a line at ✉️ **enquiry@nsucolours.com** — we typically respond within 24 hours.",
  },
  {
    keys: ['whatsapp', 'wa'],
    reply: "You can reach us on WhatsApp for a quick conversation: 💬 [+91 72800 12300](https://wa.me/917280012300)",
  },
  {
    keys: ['social media', 'instagram', 'facebook', 'twitter', 'follow'],
    reply: "Follow us on social media! 🌐\n• 📸 [Instagram](https://www.instagram.com/)\n• 📘 [Facebook](https://www.facebook.com/)\n• 🐦 [X / Twitter](https://x.com/)\n• 💬 [WhatsApp](https://wa.me/917280012300)",
  },

  /* ── Location & Addresses ── */
  {
    keys: ['location', 'address', 'office', 'where', 'visit', 'situated', 'based'],
    reply: "🏢 **Head Office** — Nai Sadak Chowk, Patna City, District: Patna, Bihar, India - 800008\n🏭 **Manufacturing Unit** — Hajipur Industrial Area, Hajipur, District: Vaishali, Bihar, India - 844102",
  },
  {
    keys: ['factory', 'manufacturing', 'unit', 'plant', 'hajipur'],
    reply: "🏭 Our **Manufacturing Unit** is located at **Hajipur Industrial Area**, Hajipur, District: Vaishali, Bihar, India - 844102. This is where all our colour products are manufactured with strict quality control.",
  },
  {
    keys: ['patna', 'head office', 'main office'],
    reply: "🏢 Our **Head Office** is at **Nai Sadak Chowk**, Patna City, District: Patna, Bihar, India - 800008.",
  },
  {
    keys: ['bihar'],
    reply: "Yes! NSU is proudly **Bihar-based** 🇮🇳. Our head office is in **Patna City** and our manufacturing unit is in **Hajipur Industrial Area, Vaishali**.",
  },

  /* ── Products Overview ── */
  {
    keys: ['product', 'range', 'catalogue', 'catalog', 'what do you', 'sell', 'offer', 'make', 'item'],
    reply: "We specialise in four product categories:\n🔴 **Sindoor Colour** — Traditional reds & custom shades\n🟡 **Fluorescent Pigments** — 6 vivid neon colours\n🟠 **Bright Colour Powders** — 5 powder colours + custom\n🎨 **Custom Colour Solutions** — Tailored to your needs\n\nWant me to tell you more about any of these?",
    nav: { label: 'View All Products →', to: '/products' },
  },
  {
    keys: ['how many product', 'how many colour', 'how many color', 'total product', 'full list'],
    reply: "We currently offer **16 products** across 4 categories:\n• 4 Sindoor Colours\n• 6 Fluorescent Pigments\n• 6 Colour Powders (including custom shades)\n\nEach product is available for bulk orders and custom formulations!",
    nav: { label: 'Browse Full Catalogue →', to: '/products' },
  },

  /* ── Sindoor Products (detailed) ── */
  {
    keys: ['sindoor', 'traditional'],
    reply: "Our **Sindoor Colour** range includes:\n🔴 **Red Sindoor** — Classic red, the most recognisable shade\n❤️ **Bright Red Sindoor** — High-impact bright red\n🟤 **Deep Red Sindoor** — Rich, deeper red finish\n🎨 **Custom Shade Sindoor** — Tailored to your brief\n\nAll crafted for a confident and consistent traditional finish.",
    nav: { label: 'Explore Sindoor Range →', to: '/products' },
  },
  {
    keys: ['red sindoor', 'classic red'],
    reply: "Our **Red Sindoor Colour** is a vivid classic red with a direct, recognisable visual character — perfect for traditional colour products.",
    nav: { label: 'View Sindoor Products →', to: '/products' },
  },
  {
    keys: ['bright red sindoor'],
    reply: "**Bright Red Sindoor** delivers a high-impact bright red shade for a more immediate, eye-catching colour impression.",
    nav: { label: 'View Sindoor Products →', to: '/products' },
  },
  {
    keys: ['deep red', 'deep sindoor'],
    reply: "**Deep Red Sindoor** offers a deeper red direction with visual richness and a considered, premium finish.",
    nav: { label: 'View Sindoor Products →', to: '/products' },
  },

  /* ── Fluorescent Pigments (detailed) ── */
  {
    keys: ['fluorescent', 'neon', 'glow', 'bright pigment', 'uv'],
    reply: "Our **Fluorescent Pigments** range includes 6 vivid colours:\n🔴 Fluorescent Red\n💗 Fluorescent Pink\n🟠 Fluorescent Orange\n🟡 Fluorescent Yellow\n🟢 Fluorescent Green\n💜 Fluorescent Magenta\n\nAll designed for high-visibility, attention-grabbing applications!",
    nav: { label: 'See Fluorescent Pigments →', to: '/products' },
  },
  {
    keys: ['fluorescent red'],
    reply: "**Fluorescent Red** is an energetic fluorescent red pigment for attention-led colour design — bold and impossible to miss!",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['fluorescent pink'],
    reply: "**Fluorescent Pink** is a bright pink pigment with an unmistakably expressive presence — perfect for standout applications.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['fluorescent orange'],
    reply: "**Fluorescent Orange** is a vivid orange pigment for bold graphic and product colour treatments.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['fluorescent yellow'],
    reply: "**Fluorescent Yellow** is a bright yellow pigment designed for visual prominence and high-contrast palettes.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['fluorescent green'],
    reply: "**Fluorescent Green** is a bold green pigment for energetic, high-contrast colour palettes.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['fluorescent magenta', 'magenta pigment'],
    reply: "**Fluorescent Magenta** is a saturated magenta pigment direction for vivid, colour-focused applications.",
    nav: { label: 'View Product →', to: '/products' },
  },

  /* ── Colour Powders (detailed) ── */
  {
    keys: ['powder', 'colour powder', 'color powder'],
    reply: "Our **Bright Colour Powders** include:\n🔴 Bright Red — High-energy red\n🟠 Orange — Warm and luminous\n🟡 Yellow — Clear and confident\n💗 Pink — Lively personality\n💜 Magenta — Saturated high-chroma\n🎨 Custom Shades — Your desired palette\n\nAll designed for decorative colour applications!",
    nav: { label: 'Browse Colour Powders →', to: '/products' },
  },
  {
    keys: ['red powder', 'bright red powder'],
    reply: "**Bright Red Powder** is a direct, high-energy red powder colour for expressive product treatments and decorative applications.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['orange powder'],
    reply: "**Orange Powder** is a luminous orange powder colour that introduces warmth and visual impact to any surface.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['yellow powder'],
    reply: "**Yellow Powder** is a clear yellow powder colour for bright, confident colour directions.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['pink powder'],
    reply: "**Pink Powder** is a lively pink powder colour designed to bring personality to surfaces and products.",
    nav: { label: 'View Product →', to: '/products' },
  },
  {
    keys: ['magenta powder'],
    reply: "**Magenta Powder** is a saturated magenta powder colour for high-chroma visual expression.",
    nav: { label: 'View Product →', to: '/products' },
  },

  /* ── Custom Colour Development ── */
  {
    keys: ['custom', 'bespoke', 'tailored', 'specific shade', 'develop', 'colour match', 'color match', 'match shade'],
    reply: "We offer **Custom Colour Development** 🎨 — a collaborative process where we match your target shade and application needs. Whether it's a unique sindoor shade, a custom powder, or a special pigment blend, we can develop it for you!",
    nav: { label: 'Request Custom Colour →', to: '/contact' },
  },

  /* ── Applications & Industries ── */
  {
    keys: ['application', 'use case', 'industry', 'where used', 'which industry'],
    reply: "Our pigments serve **6 key application areas**:\n1️⃣ Sindoor & Traditional Products\n2️⃣ Textile Applications\n3️⃣ Plastic & Polymer Applications\n4️⃣ Printing & Ink Applications\n5️⃣ Industrial Colour Applications\n6️⃣ Custom Colour Development\n\nWant details on any specific application?",
    nav: { label: 'Explore Applications →', to: '/applications' },
  },
  {
    keys: ['textile', 'fabric', 'cloth', 'dyeing', 'dye'],
    reply: "🧵 **Textile Applications** — Our colour pigments are suitable for textile-focused applications where substrate and process requirements guide the grade selection. Contact us to discuss your specific textile needs!",
    nav: { label: 'View Textile Applications →', to: '/applications' },
  },
  {
    keys: ['plastic', 'polymer', 'moulding', 'molding', 'extrusion'],
    reply: "🏗️ **Plastic & Polymer Applications** — We provide colour options for polymer-led applications, considered against processing needs and the desired final visual effect.",
    nav: { label: 'View Polymer Applications →', to: '/applications' },
  },
  {
    keys: ['print', 'ink', 'printing'],
    reply: "🖨️ **Printing & Ink Applications** — Our pigments deliver bold colour directions for print and ink-related applications where visual coverage and process needs are part of the brief.",
    nav: { label: 'View Print Applications →', to: '/applications' },
  },
  {
    keys: ['industrial', 'industrial use', 'industrial colour'],
    reply: "🏭 **Industrial Colour Applications** — We provide application-led colour solutions for industrial product contexts, developed around the specific requirements of each use case.",
    nav: { label: 'View Industrial Applications →', to: '/applications' },
  },

  /* ── About & Company ── */
  {
    keys: ['about', 'company', 'nsu', 'narayan', 'who are', 'story'],
    reply: "**Narayan Sindoor Udyog (NSU)** is a Bihar-based colour manufacturer specialising in high-quality pigments and colour powders. We combine traditional expertise with modern manufacturing to deliver exceptional colour solutions.",
    nav: { label: 'Read Our Story →', to: '/about' },
  },
  {
    keys: ['history', 'since', 'founded', 'established', 'year', 'how old', 'how long', '1983', 'experience'],
    reply: "📅 NSU has been in the colour industry since **1983** — that's over **40 years** of dedication, experience, and trust in manufacturing high-quality colour products!",
    nav: { label: 'Learn Our History →', to: '/about' },
  },
  {
    keys: ['owner', 'founder', 'shivam', 'sharma', 'who runs', 'management'],
    reply: "NSU is managed by **Shivam Sharma**. For any business enquiries, you can reach him directly at 📞 +91 72800 12300 or ✉️ enquiry@nsucolours.com.",
  },
  {
    keys: ['full form', 'what is nsu', 'stand for', 'meaning of nsu', 'abbreviation'],
    reply: "**NSU** stands for **Narayan Sindoor Udyog** — a name rooted in our heritage of traditional colour manufacturing from Bihar, India. 🇮🇳",
  },

  /* ── Quality, Safety & Certifications ── */
  {
    keys: ['quality', 'quality control', 'standard', 'qc', 'assurance'],
    reply: "✅ At NSU, quality is at the heart of everything we do. Our products undergo **strict quality control** processes at our Hajipur manufacturing unit, ensuring consistency, colour accuracy, and reliability across every batch.",
  },
  {
    keys: ['safe', 'safety', 'harmful', 'toxic', 'skin safe', 'personal use'],
    reply: "🛡️ Yes! Our traditional colour products, especially **Sindoor**, are crafted with **strict quality control** to ensure they are safe and reliable for personal and cultural use. This trust has been built since 1983.",
  },
  {
    keys: ['certificate', 'certification', 'certified', 'iso', 'lab test', 'test report'],
    reply: "📋 For specific product certifications or lab test reports, please contact our team directly at ✉️ enquiry@nsucolours.com or 📞 +91 72800 12300. We'd be happy to share relevant documentation!",
    nav: { label: 'Contact for Certificates →', to: '/contact' },
  },

  /* ── Orders, Pricing & Enquiries ── */
  {
    keys: ['enquiry', 'inquiry', 'quote', 'pricing', 'price', 'cost', 'rate'],
    reply: "💰 For pricing and quotations, please submit your requirements through our **enquiry form** on the Contact page. Our team will respond with a competitive quote based on your quantity and specifications!",
    nav: { label: 'Submit Enquiry →', to: '/contact' },
  },
  {
    keys: ['order', 'buy', 'purchase', 'how to order', 'place order', 'booking'],
    reply: "🛒 To place an order:\n1. Visit our **Contact page**\n2. Fill out the enquiry form with your product interest and quantity\n3. Our team will get back with pricing and confirmation\n\nYou can also call us directly at 📞 +91 72800 12300!",
    nav: { label: 'Place an Order →', to: '/contact' },
  },
  {
    keys: ['bulk', 'wholesale', 'large order', 'large quantity', 'big order', 'distributor', 'dealer'],
    reply: "📦 Yes, we handle **bulk and wholesale orders**! Our structured manufacturing process at Hajipur Industrial Area allows us to fulfil both standard and large-volume orders efficiently. Contact us with your requirements!",
    nav: { label: 'Enquire for Bulk Orders →', to: '/contact' },
  },
  {
    keys: ['minimum order', 'moq', 'min order', 'smallest order'],
    reply: "📏 For minimum order quantities (MOQ), please reach out to our team — it varies by product category and formulation. Contact us at ✉️ enquiry@nsucolours.com or 📞 +91 72800 12300.",
    nav: { label: 'Ask About MOQ →', to: '/contact' },
  },
  {
    keys: ['sample', 'trial', 'test sample', 'try before'],
    reply: "🧪 Interested in samples? We can arrange product samples for evaluation! Please submit your request through the Contact page with details about the product and application you're interested in.",
    nav: { label: 'Request Samples →', to: '/contact' },
  },
  {
    keys: ['payment', 'pay', 'payment method', 'upi', 'bank', 'transfer'],
    reply: "💳 For payment methods and terms, please discuss directly with our team at 📞 +91 72800 12300 or ✉️ enquiry@nsucolours.com. We accommodate various payment arrangements for our partners.",
  },

  /* ── Shipping & Delivery ── */
  {
    keys: ['shipping', 'delivery', 'dispatch', 'ship', 'deliver', 'courier', 'transport', 'logistics'],
    reply: "🚚 We ship across India! Delivery timelines depend on your location and order size. For shipping details, estimated delivery time, and logistics options, please contact our team at 📞 +91 72800 12300.",
    nav: { label: 'Discuss Shipping →', to: '/contact' },
  },
  {
    keys: ['international', 'export', 'outside india', 'abroad', 'overseas', 'global'],
    reply: "🌍 For international enquiries and export possibilities, please reach out to our team directly at ✉️ enquiry@nsucolours.com. We'd be happy to discuss how we can serve your needs!",
    nav: { label: 'International Enquiry →', to: '/contact' },
  },

  /* ── Working Hours ── */
  {
    keys: ['timing', 'hours', 'working hours', 'open', 'closed', 'available', 'when can i'],
    reply: "🕐 Our typical business hours are **Monday to Saturday, 9:00 AM – 6:00 PM IST**. For urgent queries, you can also reach us via WhatsApp: 💬 [+91 72800 12300](https://wa.me/917280012300)",
  },

  /* ── FAQ-Mirrored Queries ── */
  {
    keys: ['what type', 'specialise', 'specialize', 'speciali'],
    reply: "NSU specialises in **traditional colour products**, with a primary focus on high-quality **Sindoor** and other cultural colour applications — along with **Fluorescent Pigments** and **Bright Colour Powders** for industrial and decorative use.",
    nav: { label: 'View Our Specialities →', to: '/products' },
  },
  {
    keys: ['grade', 'different grade', 'variety', 'varieties', 'types of sindoor'],
    reply: "Yes! We offer **multiple grades** of our colour products depending on your specific application requirements and shade preferences. From classic to deep red and custom blends — we have options to match your needs.",
    nav: { label: 'Explore Grades →', to: '/products' },
  },
  {
    keys: ['unique', 'special', 'what makes', 'why choose', 'why nsu', 'different from', 'better than', 'advantage'],
    reply: "What makes NSU special? ✨\n• **40+ years** of experience since 1983\n• Deep connection to **Indian traditions and culture**\n• **Strict quality control** at our own manufacturing unit\n• **16 products** across 4 specialised categories\n• **Custom colour development** for unique needs\n• Personal attention from our dedicated team",
    nav: { label: 'Discover NSU →', to: '/about' },
  },

  /* ── Colour-Related Queries ── */
  {
    keys: ['red', 'colour red', 'color red'],
    reply: "🔴 We have several **red** options:\n• Red Sindoor Colour (classic red)\n• Bright Red Sindoor (high-impact)\n• Deep Red Sindoor (rich, deep)\n• Fluorescent Red (neon vibrant)\n• Bright Red Powder (decorative)\n\nWhich one interests you?",
    nav: { label: 'Browse Reds →', to: '/products' },
  },
  {
    keys: ['pink', 'colour pink', 'color pink'],
    reply: "💗 Our **pink** options include:\n• Fluorescent Pink — Bright, expressive neon pink pigment\n• Pink Powder — Lively pink for decorative surfaces\n\nBoth are available for bulk orders!",
    nav: { label: 'View Pink Products →', to: '/products' },
  },
  {
    keys: ['orange', 'colour orange', 'color orange'],
    reply: "🟠 Our **orange** options include:\n• Fluorescent Orange — Vivid neon orange pigment\n• Orange Powder — Warm, luminous powder colour\n\nGreat for high-visibility and decorative applications!",
    nav: { label: 'View Orange Products →', to: '/products' },
  },
  {
    keys: ['yellow', 'colour yellow', 'color yellow'],
    reply: "🟡 Our **yellow** options include:\n• Fluorescent Yellow — Bright neon yellow for visual prominence\n• Yellow Powder — Clear, confident powder colour\n\nPerfect for standout colour palettes!",
    nav: { label: 'View Yellow Products →', to: '/products' },
  },
  {
    keys: ['green', 'colour green', 'color green'],
    reply: "🟢 We offer **Fluorescent Green** — a bold green pigment for energetic, high-contrast colour palettes. Ideal for applications requiring maximum visual impact!",
    nav: { label: 'View Green Product →', to: '/products' },
  },
  {
    keys: ['magenta', 'colour magenta', 'color magenta'],
    reply: "💜 Our **magenta** options include:\n• Fluorescent Magenta — Saturated neon magenta pigment\n• Magenta Powder — High-chroma decorative powder\n\nBoth deliver vivid, unforgettable colour!",
    nav: { label: 'View Magenta Products →', to: '/products' },
  },

  /* ── Website & Navigation Help ── */
  {
    keys: ['home', 'homepage', 'main page', 'go to home'],
    reply: "🏠 Want to go back to the homepage? Click the button below!",
    nav: { label: 'Go to Homepage →', to: '/' },
  },
  {
    keys: ['navigate', 'page', 'menu', 'section', 'where can i find'],
    reply: "📋 Here are the main pages on our website:\n• 🏠 **Home** — Landing page with featured products\n• 🎨 **Products** — Full product catalogue with filters\n• 🔬 **Applications** — Industry use cases\n• 📖 **About** — Our company story\n• 📞 **Contact** — Enquiry form & details\n\nWhat would you like to explore?",
  },
  {
    keys: ['faq', 'frequently asked', 'common question'],
    reply: "❓ Our **FAQ section** covers common questions about NSU's products, safety, grades, bulk supply, and what makes our Sindoor unique. You'll find it on the homepage!",
    nav: { label: 'View FAQs →', to: '/' },
  },

  /* ── Miscellaneous ── */
  {
    keys: ['dark mode', 'light mode', 'theme', 'switch mode', 'night mode'],
    reply: "🌗 You can toggle between **Dark** and **Light** mode using the sun/moon button in the top navigation bar. Your preference is saved automatically!",
  },
  {
    keys: ['career', 'job', 'hiring', 'work at', 'vacancy', 'recruitment', 'intern'],
    reply: "💼 For career opportunities or internship enquiries, please reach out to us at ✉️ enquiry@nsucolours.com with your details. We're always excited to hear from talented individuals!",
  },
  {
    keys: ['feedback', 'complaint', 'issue', 'problem', 'not satisfied', 'improve'],
    reply: "📝 We value your feedback! Please share your thoughts, suggestions, or concerns through our Contact page or email us at ✉️ enquiry@nsucolours.com. We're committed to improving!",
    nav: { label: 'Share Feedback →', to: '/contact' },
  },
  {
    keys: ['partnership', 'collaborate', 'partner', 'tie up', 'b2b', 'business'],
    reply: "🤝 Interested in a business partnership or collaboration? We'd love to hear from you! Contact **Shivam Sharma** at 📞 +91 72800 12300 or ✉️ enquiry@nsucolours.com to discuss opportunities.",
    nav: { label: 'Discuss Partnership →', to: '/contact' },
  },
  {
    keys: ['return', 'refund', 'exchange', 'replace', 'damaged'],
    reply: "🔄 For return, refund, or exchange requests, please contact our team directly at 📞 +91 72800 12300 or ✉️ enquiry@nsucolours.com with your order details. We'll resolve it promptly!",
  },
  {
    keys: ['shelf life', 'expiry', 'expire', 'how long last', 'storage', 'store'],
    reply: "🗄️ For specific shelf life, storage conditions, and product handling guidelines, please contact our team at ✉️ enquiry@nsucolours.com. Proper storage varies by product type.",
  },
  {
    keys: ['packaging', 'pack', 'packing', 'packet', 'bag', 'container', 'kg', 'kilogram', 'weight'],
    reply: "📦 Our products are available in various packaging sizes depending on the product category and order quantity. For specific packaging options and weights, contact us at 📞 +91 72800 12300.",
    nav: { label: 'Enquire About Packaging →', to: '/contact' },
  },
  {
    keys: ['help', 'support', 'assist', 'what can you do', 'what can i ask', 'capability'],
    reply: "I can help you with:\n🎨 **Products** — Details on all 16 products\n📞 **Contact** — Phone, email, WhatsApp\n📍 **Locations** — Office & factory addresses\n💰 **Pricing** — How to get a quote\n🔬 **Applications** — Industry use cases\n📖 **Company** — Our story & history\n📦 **Orders** — Bulk, samples, MOQ\n🚚 **Shipping** — Delivery info\n\nJust ask away! 😊",
  },
];

/* Quick suggestions removed. */
/*
const QUICK_CHIPS = [
  { label: '🎨 Products', query: 'What products do you offer?' },
  { label: '📞 Contact', query: 'How can I contact you?' },
  { label: '📍 Location', query: 'Where is your office?' },
  { label: '💰 Get Quote', query: 'I want a price quote' },
  { label: '🏭 Applications', query: 'What industries do you serve?' },
  { label: '📖 About NSU', query: 'Tell me about NSU' },
  { label: '🧪 Samples', query: 'Can I get product samples?' },
  { label: '📦 Bulk Orders', query: 'Do you accept bulk orders?' },
];
*/

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

  /* Navigation from bot reply */
  const handleNavClick = (to) => {
    navigate(to);
    setIsOpen(false);
  };

  /* Determine if we should show quick chips (only after the greeting or default reply) */
  const showChips = false;

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
