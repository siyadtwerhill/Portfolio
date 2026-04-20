import React, { useEffect, useRef } from 'react';
import profile from '../assets/aboutPhoto.jpg';
import terminal from '../assets/terminal.png';
import architectIcon from "../assets/program.png";
import databaseIcon from "../assets/database.png";
import php from "../assets/php.png";
import sql from "../assets/sql.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: "React & Ecosystem", value: 90 },
  { label: "JavaScript (ES6+)", value: 80 },
];

const About = () => {
  const containerRef = useRef(null);
  const profileRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- HERO ANIMATIONS ---
      const heroTl = gsap.timeline();
      
      // Staggered text reveal
      heroTl.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      })
      .from(profileRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      }, "-=0.8");

      // Profile Parallax on Scroll
      gsap.to(profileRef.current, {
        scrollTrigger: {
          trigger: profileRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -50
      });

      // --- SKILLS ANIMATIONS ---
      const rows = skillsRef.current.querySelectorAll(".skill-row");

      // Reveal cards themselves
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: ".skill-card",
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      // Animated Skill Bars (Your existing logic refined)
      rows.forEach((row, i) => {
        const bar = row.querySelector(".skill-bar");
        const pct = row.querySelector(".skill-pct");
        const target = +bar.dataset.width;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(bar, 
          { width: "0%" }, 
          { width: `${target}%`, duration: 1.5, ease: "power4.inOut", delay: i * 0.1 }
        );

        tl.fromTo({ val: 0 }, { val: target }, {
          duration: 1.5,
          ease: "power4.inOut",
          onUpdate: function() {
            pct.textContent = `${Math.round(this.targets()[0].val)}%`;
          }
        }, "<");
      });

      // Terminal Floating Animation
      gsap.to(".terminal-icon", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* === HERO SECTION === */}
      <section className="relative min-h-[90vh] flex items-center pt-30 text-white px-4 md:px-20 lg:px-24 overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="hero-content z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-700 bg-gray-800/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">Lifelong Learner</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                Architecting digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">solutions.</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
              I am a dedicated problem-solver who thrives at the intersection of logical complexity and aesthetic simplicity.
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
              <button className="relative group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold transition-all hover:scale-105 shadow-[0_0_25px_rgba(79,70,229,0.4)]">View Projects</button>
              <button className="px-8 py-4 bg-gray-900/50 border border-gray-800 rounded-xl font-bold hover:bg-gray-800 transition-all">Download CV</button>
            </div>
          </div>

          <div ref={profileRef} className="relative group mx-auto lg:ml-auto">
            <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-md transition group-hover:opacity-100 opacity-50"></div>
            <div className="relative bg-[#0c1222]/80 backdrop-blur-sm border border-gray-800 p-5 rounded-[2.5rem] overflow-hidden">
              <img src={profile} alt="Architect Portrait" className="rounded-[2rem] grayscale contrast-125 opacity-90 group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-10 left-10 right-10 backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl shadow-2xl">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Current Status</span>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold tracking-wide">Open for Collaboration</span>
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SKILLS SECTION === */}
      <section className='w-full min-h-[70vh] flex flex-col items-center py-10 text-white px-8 md:px-10 lg:px-12 overflow-hidden'>
        <div className='container mx-auto flex flex-col gap-5 lg:flex-row my-7 items-center justify-between w-full'>
          <div className='space-y-1.5'>
            <p className='text-lg text-sky-500 uppercase'>Technical Arsenal</p>
            <h1 className='text-4xl font-bold tracking-tight leading-[1.1]'>Expertise.</h1>
          </div>
          <p className='text-gray-400 text-center md:text-left text-sm w-full md:w-1/4'>
            A multi-disciplinary stack focused on performance, maintainability, and seamless user experiences.
          </p>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 relative'>
          {/* FRONTEND CARD */}
          <div ref={skillsRef} className="skill-card card flex flex-col gap-6 md:gap-10 py-4 px-4 md:px-8 lg:px-10 bg-[#111c33]/60 backdrop-blur-md border border-white/5 rounded-2xl">
            <div className='flex items-center gap-3 mt-2 md:gap-4'>
              <img src={architectIcon} alt="" className='w-5 h-5 md:w-7 md:h-7 object-cover' />
              <h1 className='text-lg md:text-2xl font-bold tracking-tight leading-[1.1]'>Frontend</h1>
            </div>

            {skills.map((skill) => (
              <div key={skill.label} className='skill-row flex flex-col gap-2 md:gap-3 z-20'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-sm md:text-lg lg:text-xl font-normal text-blue-300'>{skill.label}</h3>
                  <p className='skill-pct text-xs md:text-sm font-semibold text-[#698df6]'>0%</p>
                </div>
                <div className='relative w-full h-2 md:h-[5px] rounded-lg overflow-hidden bg-black/40'>
                  <div className='skill-bar absolute top-0 left-0 w-0 h-full bg-[#698df6]' data-width={skill.value} />
                </div>
              </div>
            ))}

            <div className='flex flex-wrap gap-2 md:gap-3'>
              {["HTML5", "CSS3 / SCSS", "Tailwind CSS"].map((tag) => (
                <div key={tag} className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800/40">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] md:text-xs uppercase font-medium text-gray-400">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BACKEND CARD */}
          <div className="skill-card card flex flex-col gap-6 md:gap-10 py-4 px-4 md:px-8 lg:px-10 bg-[#111c33]/60 backdrop-blur-md border border-white/5 rounded-2xl">
            <div className='flex items-center gap-3 md:gap-4 mt-2'>
              <img src={databaseIcon} alt="" className='w-5 h-5 md:w-7 md:h-7 object-cover' />
              <h1 className='text-lg md:text-2xl font-bold tracking-tight leading-[1.1]'>Backend</h1>
            </div>
            <div className='flex flex-col gap-3 py-2'>
              {[{img: php, label: 'PHP / Laravel', sub: 'Enterprise Systems'}, {img: sql, label: 'MySQL', sub: 'Relational Databases'}].map((item, idx) => (
                <div key={idx} className='flex bg-black/50 gap-5 items-center rounded-lg py-3 px-3'>
                  <div className='w-15 h-15 bg-[#111c33] rounded-lg flex justify-center items-center'>
                    <img src={item.img} alt="" />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h2 className='md:text-xl font-semibold tracking-tight leading-[1.1]'>{item.label}</h2>
                    <p className='text-[10px] md:text-sm font-normal text-gray-500 uppercase tracking-wide'>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='terminal-icon absolute top-10 left-[75%] w-15 h-10 md:top-7 md:left-[40%] md:w-20 h-15 z-0'>
            <img src={terminal} alt="" className='opacity-20 contrast-0 grayscale' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;