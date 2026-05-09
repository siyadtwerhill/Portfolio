import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imgStorefront from "../assets/ecom-storefront.png";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

// ── PROJECT DATA ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Three-portal full-stack marketplace system featuring ShopHub storefront, vendor dashboard, and AdminOS panel. Built with React 19, Laravel 10 REST API, Sanctum authentication, and MySQL.",
    tags: [
      "React",
      "Laravel",
      "Tailwind",
      "PHP",
      "MySQL"
    ],
    image: imgStorefront,
    size: "large",

    // Main action buttons
    githubUrl:
      "https://github.com/siyadtwerhill/E_commarce_site_front",

    backendUrl:
      "https://github.com/siyadtwerhill/E_commarce_backend_by_yae",

    liveUrl: "/e-commerce",

    // Optional
    featured: true,
  },
];

// ── TAG STYLES ────────────────────────────────────────────────────────────────
const tagStyles = {
  Laravel:   "text-orange-400 bg-orange-400/10 border border-orange-400/25",
  React:     "text-sky-400 bg-sky-400/10 border border-sky-400/25",
  Tailwind:  "text-indigo-400 bg-indigo-400/10 border border-indigo-400/25",
  "Node.js": "text-emerald-400 bg-emerald-400/10 border border-emerald-400/25",
  PHP:       "text-violet-400 bg-violet-400/10 border border-violet-400/25",
  MySQL:     "text-blue-400 bg-blue-400/10 border border-blue-400/25",
  Vue:       "text-green-400 bg-green-400/10 border border-green-400/25",
};

const tagDotStyles = {
  Laravel:   "bg-orange-400",
  React:     "bg-sky-400",
  Tailwind:  "bg-indigo-400",
  "Node.js": "bg-emerald-400",
  PHP:       "bg-violet-400",
  MySQL:     "bg-blue-400",
  Vue:       "bg-green-400",
};

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
);
const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconDocs = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

// ── MOCK SCREENSHOT ───────────────────────────────────────────────────────────
const MockScreen = () => (
  <div className="w-full h-full flex flex-col gap-2 p-4"
    style={{ background: "linear-gradient(135deg,#0a1628,#0f1e3a,#091524)" }}>
    {/* browser dots */}
    <div className="flex items-center gap-1.5 mb-1">
      {["bg-red-400","bg-yellow-400","bg-emerald-400"].map(c => (
        <div key={c} className={`w-2 h-2 rounded-full ${c} opacity-70`} />
      ))}
      <div className="flex-1 h-2 rounded bg-white/5 ml-2" />
    </div>
    {/* fake UI */}
    <div className="flex gap-2 flex-1">
      <div className="w-1/4 flex flex-col gap-1.5">
        {[60,80,45,70,55,90].map((w,i) => (
          <div key={i} className="h-1.5 rounded bg-indigo-500/30" style={{ width:`${w}%` }} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-12 rounded-md bg-sky-400/8 border border-sky-400/10" />
        <div className="flex gap-2 flex-1">
          {[1,2,3].map(i => (
            <div key={i} className="flex-1 rounded-md bg-indigo-400/6 border border-indigo-400/10" />
          ))}
        </div>
      </div>
    </div>
    {/* chart bars */}
    <div className="flex items-end gap-0.5 h-7">
      {[40,70,50,90,60,80,45,75,55,85,65,95].map((h,i) => (
        <div key={i} className="flex-1 rounded-t-sm"
          style={{ height:`${h}%`, background:`rgba(20,184,166,${0.25+i*0.02})` }} />
      ))}
    </div>
  </div>
);

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const isLarge = project.size === "large";

  const onEnter = () => gsap.to(cardRef.current, { y: -6, duration: 0.3, ease: "power2.out" });
  const onLeave = () => gsap.to(cardRef.current, { y: 0,  duration: 0.4, ease: "power2.inOut" });

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`
        project-card flex flex-col overflow-hidden rounded-2xl
        bg-[#0b1428]/70 backdrop-blur-xl
        border border-white/[0.07] hover:border-indigo-500/30
        transition-colors duration-300
        col-span-1 ${isLarge ? "md:col-span-2" : "md:col-span-1"}
      `}
    >
      {/* Screenshot */}
      <div className={`relative overflow-hidden flex-shrink-0 ${isLarge ? "h-44 md:h-64" : "h-40 md:h-48"}`}>
        {project.image
          ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          : <MockScreen />
        }
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b1428]/95" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 md:p-6 flex-1">

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className={`
                inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md
                text-[9px] font-bold uppercase tracking-widest
                ${tagStyles[tag] || "text-gray-400 bg-gray-400/10 border border-gray-400/20"}
              `}
            >
              <span className={`w-1 h-1 rounded-full ${tagDotStyles[tag] || "bg-gray-400"}`} />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white leading-snug ${isLarge ? "text-lg md:text-xl" : "text-base md:text-lg"}`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
          {project.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.liveUrl && (
            <Link
              to='/e-commerce'
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 hover:bg-indigo-500/25 hover:border-indigo-500/50 transition-all duration-200 no-underline whitespace-nowrap"
            >
              Live Demo <IconExternal />
            </Link>
          )}
          {project.docsUrl && (
            <Link
              to='/e-commerce'
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-violet-400 bg-violet-500/15 border border-violet-500/30 hover:bg-violet-500/25 hover:border-violet-500/50 transition-all duration-200 no-underline whitespace-nowrap"
            >
              Docs <IconDocs />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-400 bg-white/4 border border-white/10 hover:bg-white/8 hover:text-white transition-all duration-200 no-underline whitespace-nowrap"
            >
              GitHub <IconGithub />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const Projects = () => {
  const heroRef = useRef(null);

  // On-load hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".proj-badge", { y: -18, opacity: 0, duration: 0.55 })
        .from(".proj-word",  { y: 55,  opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.2")
        .from(".proj-desc",  { y: 24,  opacity: 0, duration: 0.6 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Scroll trigger cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: { trigger: ".projects-grid", start: "top 88%" },
        y: 60, opacity: 0, duration: 0.75, stagger: 0.13, ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="text-white min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="px-5 sm:px-10 md:px-16 lg:px-20 pt-24 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Badge */}
          <div className="proj-badge inline-flex items-center gap-2.5 border-b border-white/10 pb-2 mb-6 md:mb-8">
            <div className="w-6 h-px bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-bold">
              Curated Work
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tighter mb-4 md:mb-5">
            <span className="proj-word inline-block text-white">Featured</span>
            {" "}
            <span className="proj-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Projects
            </span>
            <span className="proj-word inline-block text-indigo-400">.</span>
          </h1>

          {/* Description */}
          <p className="proj-desc text-sm md:text-base text-gray-500 leading-relaxed max-w-md">
            A selection of architectural digital experiences built with performance,
            scalability, and aesthetic precision in mind.
          </p>
        </div>
      </section>

      {/* ── GRID ──────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-16 lg:px-20 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 mt-12 md:mt-20">
            <p className="text-xs text-white/25">Want to see more?</p>
            <a
              href="https://github.com/siyadtwerhill"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold text-white/50 bg-white/4 border border-white/10 hover:bg-white/8 hover:text-white hover:border-white/20 transition-all duration-200 no-underline tracking-wide"
            >
              View all on GitHub <IconGithub />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;