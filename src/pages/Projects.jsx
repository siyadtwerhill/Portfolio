import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
// Use your specific asset path
import imgStorefront from "../assets/ecom-storefront.png";

gsap.registerPlugin(ScrollTrigger);

// ── PROJECT DATA ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Three-portal full-stack marketplace system featuring ShopHub storefront, vendor dashboard, and AdminOS panel. Built with React 19, Laravel 10 REST API, Sanctum authentication, and MySQL.",
    tags: ["React", "Laravel", "Tailwind", "PHP", "MySQL"],
    image: imgStorefront,
    size: "large",
    githubUrl: "https://github.com/siyadtwerhill/E_commarce_site_front",
    backendUrl: "https://github.com/siyadtwerhill/E_commarce_backend_by_yae",
    liveUrl: "/e-commerce", // Internal React Route
    featured: true,
  },
];

// ── TAG STYLES ────────────────────────────────────────────────────────────────
const tagStyles = {
  Laravel:  "text-orange-400 bg-orange-400/10 border border-orange-400/25",
  React:    "text-sky-400 bg-sky-400/10 border border-sky-400/25",
  Tailwind: "text-indigo-400 bg-indigo-400/10 border border-indigo-400/25",
  PHP:      "text-violet-400 bg-violet-400/10 border border-violet-400/25",
  MySQL:    "text-blue-400 bg-blue-400/10 border border-blue-400/25",
};

const tagDotStyles = {
  Laravel:  "bg-orange-400",
  React:    "bg-sky-400",
  Tailwind: "bg-indigo-400",
  PHP:      "bg-violet-400",
  MySQL:    "bg-blue-400",
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

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const isLarge = project.size === "large";

  const onEnter = () => gsap.to(cardRef.current, { y: -6, duration: 0.3, ease: "power2.out" });
  const onLeave = () => gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: "power2.inOut" });

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`project-card flex flex-col overflow-hidden rounded-2xl bg-[#0b1428]/70 backdrop-blur-xl border border-white/[0.07] hover:border-indigo-500/30 transition-colors duration-300 col-span-1 ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
    >
      {/* Screenshot */}
      <div className={`relative overflow-hidden flex-shrink-0 ${isLarge ? "h-44 md:h-64" : "h-40 md:h-48"}`}>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b1428]/95" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 md:p-6 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${tagStyles[tag] || "text-gray-400 bg-gray-400/10 border border-gray-400/20"}`}>
              <span className={`w-1 h-1 rounded-full ${tagDotStyles[tag] || "bg-gray-400"}`} />
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`font-bold text-white leading-snug ${isLarge ? "text-lg md:text-xl" : "text-base md:text-lg"}`}>
          {project.title}
        </h3>

        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
          {project.description}
        </p>

        {/* Action Buttons Section */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {/* INTERNAL LINK: Use 'Link' and 'to' */}
          {project.liveUrl && (
            <Link
              to={project.liveUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 hover:bg-indigo-500/25 hover:border-indigo-500/50 transition-all duration-200 no-underline whitespace-nowrap"
            >
              View Details <IconExternal />
            </Link>
          )}

          {/* EXTERNAL LINKS: Use 'a' and 'href' */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-400 bg-white/4 border border-white/10 hover:bg-white/8 hover:text-white transition-all duration-200 no-underline whitespace-nowrap"
            >
              Frontend <IconGithub />
            </a>
          )}

          {project.backendUrl && (
            <a
              href={project.backendUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-400 bg-white/4 border border-white/10 hover:bg-white/8 hover:text-white transition-all duration-200 no-underline whitespace-nowrap"
            >
              Backend <IconGithub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const Projects = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".proj-badge", { y: -18, opacity: 0, duration: 0.55 })
        .from(".proj-word",  { y: 55,  opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.2")
        .from(".proj-desc",  { y: 24,  opacity: 0, duration: 0.6 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

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
      <section ref={heroRef} className="px-5 sm:px-10 md:px-16 lg:px-20 pt-24 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="proj-badge inline-flex items-center gap-2.5 border-b border-white/10 pb-2 mb-6 md:mb-8">
            <div className="w-6 h-px bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-bold">
              Curated Work
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tighter mb-4 md:mb-5">
            <span className="proj-word inline-block text-white">Featured</span>
            {" "}
            <span className="proj-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Projects
            </span>
            <span className="proj-word inline-block text-indigo-400">.</span>
          </h1>

          <p className="proj-desc text-sm md:text-base text-gray-500 leading-relaxed max-w-md">
            A selection of architectural digital experiences built with performance,
            scalability, and aesthetic precision in mind.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-10 md:px-16 lg:px-20 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

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
