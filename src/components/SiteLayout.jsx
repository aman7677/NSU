import { motion, AnimatePresence } from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import NSULogo from "./NSULogo";
import ThemeToggle from "./ThemeToggle";
import ColourParticles from "./ColourParticles";
import Chatbot from "./Chatbot";
import NeonScrollBackground from "./NeonScrollBackground";
import { companyDetails } from "../data/company";

const links = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Applications", "/applications"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};
const SocialIcon = ({ name }) => {
  if (name === "instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-none stroke-current stroke-[1.8]"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r=".8"
          className="fill-current stroke-none"
        />
      </svg>
    );
  if (name === "facebook")
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-current"
      >
        <path d="M13.8 21v-8h2.7l.4-3.1h-3.1V7.92c0-.9.25-1.51 1.54-1.51H17V3.63c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.2 1.52-4.2 4.33V9.9H7.45V13h2.82v8h3.53Z" />
      </svg>
    );
  if (name === "twitter")
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-current"
      >
        <path d="M18.9 2.75h3.68l-8.04 9.19L24 21.25h-7.4l-5.8-7.57-6.63 7.57H.48l8.6-9.83L0 2.75h7.58l5.24 6.93 6.08-6.93Zm-1.3 16.96h2.04L6.47 4.2H4.28L17.6 19.71Z" />
      </svg>
    );
  return <MessageCircle size={15} aria-hidden="true" />;
};

const socialColorClasses = {
  WhatsApp: "text-[#25d366]",
  Instagram: "text-[#ef1678]",
  Facebook: "text-[#1877f2]",
  "X / Twitter": "text-[#f8fafc]",
};

export default function SiteLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <NeonScrollBackground />
      <a
        href="#main-content"
        className="sr-only z-[100] skip-link px-4 py-3 text-sm font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header className="site-header fixed inset-x-0 top-0 z-50 transition-all duration-500">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative z-60 shrink-0"
          >
            <Link
              to="/"
              aria-label="NSU home"
              className="flex h-16 w-24 items-center justify-center overflow-hidden"
            >
              <NSULogo className="[&_video]:h-32 [&_video]:w-32" />
            </Link>
          </motion.div>
          <nav
            aria-label="Primary navigation"
            className="hidden h-full items-center gap-7 lg:flex"
          >
            {links.map(([label, path]) => (
              <NavLink
                end={path === "/"}
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative flex h-full items-center text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${isActive ? "text-[var(--accent-color)]" : "text-secondary hover:text-primary after:absolute after:left-0 after:top-[calc(50%+11px)] after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[var(--accent-color)] after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:text-primary focus-visible:after:scale-x-100"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}

                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="relative z-60 inline-flex min-h-11 items-center justify-center gap-2 border px-3 lg:hidden"
              style={{ borderColor: "var(--border)" }}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
            >
              <span className="text-[10px] font-bold uppercase tracking-[.16em]">{isOpen ? "Close" : "Menu"}</span>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 border-b lg:hidden"
            style={{
              borderColor: "#334155",
              background: "color-mix(in srgb, #0f172a 68%, transparent)",
              backdropFilter: "blur(20px) saturate(135%)",
              WebkitBackdropFilter: "blur(20px) saturate(135%)",
            }}
          >
            <div
              className="flex flex-col divide-y"
              style={{ borderColor: "var(--border)" }}
            >
              {links.map(([label, path]) => (
                <NavLink
                  end={path === "/"}
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-6 py-4 text-lg font-semibold transition-colors ${isActive ? "text-[var(--accent-color)]" : "text-[#f8fafc] hover:text-[#f8fafc]"}`
                  }
                >
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <main
        id="main-content"
        className={`relative z-10 flex-1 ${location.pathname === "/" ? "" : "pt-20"}`}
      >
        {children}
      </main>
      <footer className="site-footer relative z-10 isolate overflow-hidden bg-[#0b1120] px-6 pb-6 pt-14 text-[#f8fafc] uppercase md:px-10 md:pt-20 lg:px-14">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(239,22,120,.24)_0%,transparent_32%),radial-gradient(circle_at_90%_70%,rgba(255,194,28,.16)_0%,transparent_28%),linear-gradient(115deg,#050816_0%,#0f172a_48%,#111827_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,.92)_0%,rgba(15,23,42,.62)_48%,rgba(15,23,42,.28)_100%)]" />
        
        {/* Particles and Background Accents */}
        <ColourParticles particleCount={55} interactive={true} speed={0.65} />
        <div className="pointer-events-none absolute right-[12%] top-12 hidden h-36 w-36 rounded-full bg-[#ef1678]/20 blur-[65px] md:block" />
        <div className="pointer-events-none absolute left-[35%] top-20 hidden h-1.5 w-1.5 rounded-full bg-[#ffc21c] md:block" />
        <motion.div
          animate={{ y: [0, -16, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[31%] top-24 hidden h-1.5 w-1.5 rounded-full bg-[#ff75b7] md:block"
        />

        {/* Top Animated Border */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(248,250,252,.15)]" />
        <motion.div
          animate={{ x: ["-300px", "100vw"] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.5,
          }}
          className="pointer-events-none absolute left-0 top-0 h-[2px] w-[300px] bg-[linear-gradient(90deg,transparent,#ef1678,#ffc21c,transparent)] blur-[1px]"
        />
        <motion.div
          animate={{ x: ["-300px", "100vw"] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.5,
          }}
          className="pointer-events-none absolute left-0 top-0 h-px w-[300px] bg-[linear-gradient(90deg,transparent,#ef1678,#ffc21c,transparent)]"
        />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-[rgba(248,250,252,.15)] pb-14 md:grid-cols-12 md:gap-8">
            <div className="col-span-2 md:col-span-12 lg:col-span-3 flex items-center justify-center lg:justify-start md:pl-12 lg:pl-12 lg:pr-6">
              <NSULogo className="text-[#f8fafc] [&_img]:h-auto [&_img]:w-[190px]" showTagline />
            </div>
            <div className="md:col-span-3 lg:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f8fafc]">
                Navigate
              </p>
              <nav
                aria-label="Footer navigation"
                className="mt-5 flex flex-col items-start gap-3"
              >
                {links.map(([label, path]) => (
                  <Link
                    key={path}
                    to={path}
                    className="group relative inline-flex items-center text-sm font-medium text-[#f8fafc] transition-all duration-300 ease-out hover:text-[#ffc21c]"
                  >
                    <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5">
                      {label}
                    </span>
                    <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-white/5 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-110" />
                  </Link>
                ))}
              </nav>
            </div>
            <div className="md:col-span-4 lg:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f8fafc]">
                Head Office
              </p>
              <div className="mt-5 flex flex-col gap-1.5 text-sm font-medium text-[#f8fafc]">
                <p>NAI SADAK CHOWK,</p>
                <p>PATNA CITY</p>
                <p>DISTRICT : PATNA</p>
                <p>BIHAR, INDIA</p>
                <p>PIN-800008</p>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f8fafc]">
                Manufacturing Unit
              </p>
              <div className="mt-5 flex flex-col gap-1.5 text-sm font-medium text-[#f8fafc]">
                <p>HAJIPUR INDUSTRIAL AREA,</p>
                <p> HAJIPUR</p>
                <p>District: Vaishali</p>
                <p>Bihar, India  </p>
                <p>PIN-844102</p>
              </div>
            </div>
            <div className="md:col-span-12 lg:col-span-3 md:mt-6 lg:mt-0">
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f8fafc]">
                Talk to NSU
              </p>
              <div className="mt-5 flex flex-col gap-1.5">
                <a
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#f8fafc] transition-colors hover:text-[#ffc21c]"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center text-[#ffc21c]">
                    <Phone size={15} aria-hidden="true" />
                  </span>
                  <span>{companyDetails.phone}</span>
                </a>
                {companyDetails.socialLinks
                  .filter(({ name }) => name === "WhatsApp")
                  .map(({ name, href, icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80 ${socialColorClasses[name]}`}
                      aria-label={`Visit our ${name}`}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center">
                        <SocialIcon name={icon} />
                      </span>
                      <span>{name}</span>
                    </a>
                  ))}
              </div>
              <p className="mt-7 text-[10px] font-bold uppercase tracking-[.17em] text-[#f8fafc]">
                Follow us
              </p>
              <div className="mt-3 flex items-center gap-4">
                {companyDetails.socialLinks
                  .filter(({ name }) => name !== "WhatsApp")
                  .map(({ name, href, icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-75 ${socialColorClasses[name] || "text-[#f8fafc]"}`}
                      aria-label={`Visit our ${name}`}
                    >
                      <SocialIcon name={icon} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-5 py-8 text-center text-xs font-medium text-[#f8fafc] sm:flex-row sm:text-left">
            <p>&copy; {new Date().getFullYear()} NARAYAN SINDOOR UDYOG. All rights reserved.</p>
            <div className="flex gap-6">
              {[
                ["Privacy Policy", "#"],
                ["Terms of Service", "#"],
              ].map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  className="text-[#f8fafc] transition-colors hover:text-[#ffc21c]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}
