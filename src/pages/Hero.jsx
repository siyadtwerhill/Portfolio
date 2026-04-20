import React, { useLayoutEffect, useRef } from "react"
import programIcon from "../assets/programming.png"
import missionIcon from "../assets/mission.png"
import databaseIcon from "../assets/database.png"
import javascriptIcon from "../assets/java-script.png"
import architectIcon from "../assets/3d.png"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef();
  const heroCardRef = useRef();
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial Hero Entrance
      tl.from(heroCardRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      })
        .from(".hero-text-item", {
          y: 30,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6");

      // 2. Floating Icons subtle float
      gsap.to(".floating-icon", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // 3. Info Cards Scroll Entrance
      if (cardsRef.current.length) {
        gsap.from(cardsRef.current, {
          y: 60,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* === HERO MAIN SECTION === */}
      <div className="w-full h-screen flex justify-center items-center mt-10">
        <div
          ref={heroCardRef}
          className="w-[90%] md:w-[60%] p-6 md:p-10 flex flex-col items-center justify-center gap-6 relative 
                     bg-[#111c33]/80 backdrop-blur-xl rounded-2xl border border-white/10
                     shadow-[inset_1px_-1px_50px_0px_rgba(148,72,199,0.2)]"
        >
          {/* Floating Icons with specific class for animation */}
          <div className="floating-icon absolute -top-6 -left-6 w-14 h-14 bg-[#111c33] flex justify-center items-center 
                          rounded-xl border border-blue-400 shadow-lg shadow-blue-500/20">
            <img src={programIcon} alt="" className="w-6 h-6" />
          </div>

          <div className="floating-icon absolute -bottom-6 -right-6 w-14 h-14 bg-[#111c33] flex justify-center items-center 
                          rounded-xl border border-blue-400 shadow-lg shadow-blue-500/20">
            <img src={missionIcon} alt="" className="w-5 h-5" />
          </div>

          {/* Hero Content with staggered classes */}
          <p className="hero-text-item bg-black/40 px-4 py-1 text-[10px] md:text-xs text-white font-light rounded-full tracking-widest flex items-center gap-2 border border-white/5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Available for new opportunities
          </p>

          <p className="hero-text-item text-blue-400 font-bold text-sm md:text-lg tracking-widest uppercase">
            Ye Myint Swe
          </p>

          <h1 className="hero-text-item text-center text-3xl md:text-5xl leading-tight md:leading-[60px] tracking-tight font-bold text-white">
            I build scalable <br />
            web applications with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Modern Technologies</span>
          </h1>

          <p className="hero-text-item w-full md:w-[70%] text-center text-gray-400 text-sm md:text-base leading-relaxed">
            Architecting high-performance digital solutions that bridge the gap
            between complex backend logic and intuitive frontend experiences.
          </p>

          <div className="hero-text-item flex gap-4 mt-2">
            <a href="#" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold transition-all hover:scale-105 hover:bg-purple-500 active:scale-95 shadow-lg shadow-purple-500/25">
              View Projects
            </a>
            <a href="#" className="px-6 py-3 border border-gray-700 text-white rounded-xl font-semibold transition-all hover:bg-white/5 active:scale-95">
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* === FEATURE CARDS SECTION === */}
      <section className="w-full min-h-[50vh] flex items-center py-20 text-white px-8 md:px-20 overflow-hidden">
        <div className="container w-full grid lg:grid-cols-3 gap-8">
          {[
            { icon: databaseIcon, title: "Backend Excellence", desc: "Leveraging Laravel's robust ecosystem to build secure, high-concurrency APIs and complex data architectures." },
            { icon: javascriptIcon, title: "Frontend Artistry", desc: "Crafting immersive user interfaces with React and Tailwind CSS, focusing on performance and atomic design patterns." },
            { icon: architectIcon, title: "System Design", desc: "Implementing distributed systems, caching strategies, and CI/CD pipelines for production-ready reliability." }
          ].map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group card border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex flex-col gap-5 hover:border-blue-500/50 transition-colors duration-500"
            >
              <div className="w-14 h-14 bg-gray-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5">
                <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold group-hover:text-blue-400 transition-colors">{item.title}</h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero