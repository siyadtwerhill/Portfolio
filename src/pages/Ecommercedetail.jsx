import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Added for routing
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── IMAGE ASSETS ─────────────────────────────────────────────────────────────
// Ensure these match your actual high-quality filenames from the prompt
import imgStorefront from "../assets/ecom-storefront.png";
import imgAdmin      from "../assets/ecom-admin.png";
import imgVendor     from "../assets/ecom-vendor.png";

gsap.registerPlugin(ScrollTrigger);

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ── TAG STYLES ────────────────────────────────────────────────────────────────
const tagStyles = {
  Laravel:  "text-orange-400 bg-orange-400/10 border border-orange-400/25",
  React:    "text-sky-400 bg-sky-400/10 border border-sky-400/25",
  Tailwind: "text-indigo-400 bg-indigo-400/10 border border-indigo-400/25",
  PHP:      "text-violet-400 bg-violet-400/10 border border-violet-400/25",
  MySQL:    "text-blue-400 bg-blue-400/10 border border-blue-400/25",
  Axios:    "text-cyan-400 bg-cyan-400/10 border border-cyan-400/25",
  Vite:     "text-yellow-400 bg-yellow-400/10 border border-yellow-400/25",
  Sanctum:  "text-rose-400 bg-rose-400/10 border border-rose-400/25",
};

const Tag = ({ label }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${tagStyles[label] || "text-gray-400 bg-gray-400/10 border border-gray-400/20"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${label === 'Laravel' ? 'bg-orange-400' : 'bg-sky-400'}`} />
    {label}
  </span>
);

// ── SCREENSHOT GALLERY ────────────────────────────────────────────────────────
const slides = [
  {
    img:   imgStorefront,
    label: "Storefront",
    dot:   "bg-sky-400",
    desc:  "ShopHub marketplace — product listing with category filters, price range, search, and cart flow.",
  },
  {
    img:   imgVendor,
    label: "Vendor Portal",
    dot:   "bg-indigo-400",
    desc:  "Ma Ma Store vendor dashboard — earnings overview, active products, pending orders, and monthly chart.",
  },
  {
    img:   imgAdmin,
    label: "Admin Panel",
    dot:   "bg-orange-400",
    desc:  "AdminOS super-admin panel — total revenue, user count, active vendors, and sales overview.",
  },
];

const ScreenshotGallery = () => {
  const [active, setActive] = useState(0);
  const imgRef = useRef(null);

  const go = (next) => {
    const el = imgRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: 0, y: 8, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setActive(next);
        gsap.fromTo(el,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
        );
      },
    });
  };

  const prev = () => go((active - 1 + slides.length) % slides.length);
  const next = () => go((active + 1) % slides.length);
  const s = slides[active];

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0b1428]/70 backdrop-blur-xl border border-white/[0.07]">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "20/9" }}>
        <img ref={imgRef} src={s.img} alt={s.label} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1428]/80 via-transparent to-transparent pointer-events-none" />
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all"><IconChevronLeft /></button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all"><IconChevronRight /></button>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur border border-white/10 text-[10px] text-white/40 font-mono">{active + 1} / {slides.length}</div>
      </div>
      <div className="px-5 py-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{s.label}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg">{s.desc}</p>
        </div>
        <div className="flex gap-1.5 pt-1 flex-shrink-0">
          {slides.map((sl, i) => (
            <button key={i} onClick={() => go(i)} className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === active ? sl.dot + " scale-125" : "bg-white/15 hover:bg-white/30"}`} />
          ))}
        </div>
      </div>
      <div className="px-5 pb-5 grid grid-cols-3 gap-2">
        {slides.map((sl, i) => (
          <button key={i} onClick={() => go(i)} className={`relative rounded-lg overflow-hidden border transition-all duration-200 ${i === active ? "border-white/30 ring-1 ring-white/20" : "border-white/[0.06] opacity-50 hover:opacity-80"}`} style={{ aspectRatio: "20/9" }}>
            <img src={sl.img} alt={sl.label} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute bottom-1 left-1.5 text-[8px] font-bold uppercase tracking-wider text-white/60">{sl.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const StatCard = ({ value, label, accent }) => (
  <div className="flex flex-col gap-1 p-4 md:p-5 rounded-2xl bg-[#0b1428]/70 border border-white/[0.07] backdrop-blur-xl">
    <span className={`text-2xl md:text-3xl font-extrabold tracking-tight ${accent}`}>{value}</span>
    <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">{label}</span>
  </div>
);

const FeatureRow = ({ icon, title, desc }) => (
  <div className="flex gap-4 items-start py-4 border-b border-white/[0.05] last:border-0">
    <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">{icon}</div>
    <div>
      <p className="text-sm font-bold text-white mb-0.5">{title}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const StackRow = ({ layer, tech, purpose, color }) => (
  <div className="grid grid-cols-3 gap-4 py-3.5 border-b border-white/[0.05] last:border-0">
    <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold pt-0.5">{layer}</span>
    <span className={`text-sm font-bold ${color}`}>{tech}</span>
    <span className="text-gray-500 text-xs leading-relaxed">{purpose}</span>
  </div>
);

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const EcommerceDetail = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".detail-back",  { x: -20, opacity: 0, duration: 0.6 })
        .from(".detail-badge", { x: -10, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".detail-word",  { y: 60,  opacity: 0, duration: 0.75, stagger: 0.08 }, "-=0.25")
        .from(".detail-sub",   { y: 20,  opacity: 0, duration: 0.55 }, "-=0.3")
        .from(".detail-tags",  { y: 15,  opacity: 0, duration: 0.45 }, "-=0.25")
        .from(".detail-btns",  { y: 15,  opacity: 0, duration: 0.45 }, "-=0.2");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          y: 50, opacity: 0, duration: 0.75, ease: "power3.out",
        });
      });
      gsap.from(".stat-card", {
        scrollTrigger: { trigger: ".stats-row", start: "top 88%", once: true },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="text-white min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="px-5 sm:px-10 md:px-16 lg:px-20 pt-20 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Row */}
          <div className="mb-12">
            <Link to="/projects"
              className="detail-back no-underline inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/30 hover:text-white/60 transition-colors font-bold">
              <IconArrowLeft /> Back to projects
            </Link>
          </div>

          {/* Project Badge */}
          <div className="detail-badge inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-sky-500/50" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
              Full-Stack <span className="mx-2 text-white/10">|</span> 2024
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tighter mb-5">
            <span className="detail-word inline-block text-white">E-Commerce</span>{" "}
            <span className="detail-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Platform</span>
            <span className="detail-word inline-block text-indigo-400">.</span>
          </h1>

          <p className="detail-sub text-sm md:text-base text-gray-500 leading-relaxed max-w-xl mb-6">
            A three-portal full-stack e-commerce system — ShopHub customer storefront, a vendor management
            dashboard, and an AdminOS super-admin panel. React 19 SPA frontend communicates with a
            Laravel 10 REST API secured via Sanctum token auth.
          </p>

          <div className="detail-tags flex flex-wrap gap-2 mb-8">
            {["React","Vite","Tailwind","Axios","Laravel","PHP","Sanctum","MySQL"].map(t => (
              <Tag key={t} label={t} />
            ))}
          </div>

          <div className="detail-btns flex flex-wrap gap-3">
            <a href="https://github.com/siyadtwerhill/E_commarce_site_front" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold text-sky-400 bg-sky-500/12 border border-sky-500/30 hover:bg-sky-500/22 hover:border-sky-500/50 transition-all duration-200 no-underline tracking-wide">
              <IconGithub /> Frontend Repo
            </a>
            <a href="https://github.com/siyadtwerhill/E_commarce_backend_by_yae" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold text-orange-400 bg-orange-500/12 border border-orange-500/30 hover:bg-orange-500/22 hover:border-orange-500/50 transition-all duration-200 no-underline tracking-wide">
              <IconGithub /> Backend Repo
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-5 sm:px-10 md:px-16 lg:px-20 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="stat-card"><StatCard value="3" label="Portals" accent="text-sky-400" /></div>
            <div className="stat-card"><StatCard value="10+" label="API Endpoints" accent="text-orange-400" /></div>
            <div className="stat-card"><StatCard value="PHP 8.1" label="Runtime" accent="text-violet-400" /></div>
            <div className="stat-card"><StatCard value="React 19" label="UI Layer" accent="text-indigo-400" /></div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-5 sm:px-10 md:px-16 lg:px-20 pb-16">
        <div className="max-w-6xl mx-auto reveal-section">
          <div className="inline-flex items-center gap-2.5 border-b border-white/10 pb-2 mb-6">
            <div className="w-5 h-px bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Screenshots</span>
          </div>
          <ScreenshotGallery />
        </div>
      </section>

      {/* FEATURES + STACK */}
      <section className="px-5 sm:px-10 md:px-16 lg:px-20 pb-16">
        <div className="max-w-6xl mx-auto reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 md:p-8 rounded-2xl bg-[#0b1428]/70 backdrop-blur-xl border border-white/[0.07]">
              <div className="inline-flex items-center gap-2.5 border-b border-white/10 pb-2 mb-6">
                <div className="w-5 h-px bg-white/30" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Key Features</span>
              </div>
              <FeatureRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} title="Token Authentication" desc="Sanctum-secured API tokens protect every endpoint. Axios interceptors attach auth headers automatically on the frontend." />
              <FeatureRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>} title="Three-Portal Architecture" desc="Distinct UIs for customers (ShopHub storefront), vendors (earnings & product management), and super-admins (AdminOS panel)." />
              <FeatureRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>} title="Eloquent ORM" desc="Fully reproducible schema via migrations, factories, and seeders. Clean relationships for products, orders, vendors, and users." />
              <FeatureRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>} title="Decoupled Architecture" desc="Frontend and backend are independent repos. The REST API is the only contract — UI can be replaced or scaled independently." />
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-[#0b1428]/70 backdrop-blur-xl border border-white/[0.07]">
              <div className="inline-flex items-center gap-2.5 border-b border-white/10 pb-2 mb-6">
                <div className="w-5 h-px bg-white/30" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Tech Stack</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <span className="text-[9px] uppercase tracking-widest text-white/15 font-bold">Layer</span>
                <span className="text-[9px] uppercase tracking-widest text-white/15 font-bold">Tech</span>
                <span className="text-[9px] uppercase tracking-widest text-white/15 font-bold">Purpose</span>
              </div>
              <StackRow layer="UI" tech="React 19" purpose="Component SPA" color="text-sky-400" />
              <StackRow layer="Build" tech="Vite 8" purpose="HMR + bundling" color="text-yellow-400" />
              <StackRow layer="Routing" tech="RR v7" purpose="Client navigation" color="text-indigo-400" />
              <StackRow layer="Style" tech="Tailwind v4" purpose="Utility CSS" color="text-indigo-400" />
              <StackRow layer="HTTP" tech="Axios" purpose="API client" color="text-cyan-400" />
              <StackRow layer="API" tech="Laravel 10" purpose="REST framework" color="text-orange-400" />
              <StackRow layer="Auth" tech="Sanctum" purpose="Token auth" color="text-rose-400" />
              <StackRow layer="ORM" tech="Eloquent" purpose="DB + migrations" color="text-violet-400" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="px-5 sm:px-10 md:px-16 lg:px-20 pb-28">
        <div className="max-w-6xl mx-auto reveal-section">
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="text-xs text-white/20 uppercase tracking-widest font-bold">Explore the code</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://github.com/siyadtwerhill/E_commarce_site_front" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/25 hover:bg-sky-500/20 hover:border-sky-500/45 transition-all duration-200 no-underline tracking-wide"><IconGithub /> Frontend Repo <IconExternal /></a>
              <a href="https://github.com/siyadtwerhill/E_commarce_backend_by_yae" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 hover:border-orange-500/45 transition-all duration-200 no-underline tracking-wide"><IconGithub /> Backend Repo <IconExternal /></a>
            </div>
            <Link to="/projects" className="mt-2 no-underline inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors font-bold">
              <IconArrowLeft /> Back to all projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcommerceDetail;