import React from "react"
import programIcon from "../assets/programming.png"
import missionIcon from "../assets/mission.png"
import databaseIcon from "../assets/database.png"
import javascriptIcon from "../assets/java-script.png"
import architectIcon from "../assets/3d.png"
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
  const containerRef = useRef();
  const cardsRef = useRef([]);
  

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    if (!cardsRef.current.length) return; 

    gsap.from(cardsRef.current, {
      y: 80,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current, 
        start: "top 80%",
      },
    });
  }, containerRef);

  return () => ctx.revert();
}, []);

  return (
    <>
    <div className="w-full h-screen flex justify-center items-center mt-20">
      
      <div className="w-[90%] md:w-[60%] p-6 md:p-10 flex flex-col items-center justify-center gap-6 relative 
                      bg-[#111c33] rounded-2xl shadow-[inset_1px_-1px_50px_0px_rgb(148,72,199)]">

        {/* Floating Icons */}
        <div className="absolute -top-6 -left-6 w-14 h-14 bg-[#111c33] flex justify-center items-center 
                        rounded-xl border border-blue-400 animate-bounce">
          <img src={programIcon} alt="" className="w-6 h-6" />
        </div>

        <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-[#111c33] flex justify-center items-center 
                        rounded-xl border border-blue-400 animate-bounce">
          <img src={missionIcon} alt="" className="w-5 h-5" />
        </div>

        {/* Tag */}
        <p className="bg-black px-4 py-1 text-xs text-white font-light rounded-full tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          Available for new opportunities
        </p>

        {/* Name */}
        <p className="text-blue-400 font-bold text-sm md:text-lg">
          Ye Myint Swe
        </p>

        {/* Heading */}
        <h1 className="text-center text-3xl md:text-5xl leading-tight md:leading-[60px] tracking-tight">
          I build scalable <br />
          web applications with <br />
          <span className="text-blue-400">Modern Technologies</span>
        </h1>

        {/* Description */}
        <p className="w-full md:w-[70%] text-center text-gray-300 text-sm md:text-base leading-snug">
          Architecting high-performance digital solutions that bridge the gap
          between complex backend logic and intuitive frontend experiences.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <a
            href="#"
            className="px-5 py-2 bg-purple-600 border border-dashed border-blue-400 rounded-lg 
                       transition-all duration-300 hover:bg-blue-400 hover:text-[#030a1b] hover:-translate-y-2"
          >
            View Projects
          </a>

          <a
            href="#"
            className="px-5 py-2 border border-dashed border-blue-400 rounded-lg 
                       transition-all duration-300 hover:bg-blue-400 hover:text-[#030a1b] hover:-translate-y-2"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
    <section className="w-full min-h-[70vh] flex items-center py-5 text-white px-8 md:px-10 lg:px-12 overflow-hidden" ref={containerRef}>
        <div className="container w-full grid lg:grid-cols-3 gap-6">
          <div className="card border border-gray-700 rounded-2xl p-6 flex flex-col gap-5" ref={(el) => (cardsRef.current[0] = el)}>
            <div className="imgLogo w-15 h-15 bg-gray-900 rounded-lg flex items-center justify-center">
              <img src={databaseIcon} alt="" className="w-7 h-7 object-contain" />
            </div>
            <h2 className="text-lg md:text-2xl font-medium">Backend Excellence</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">Leveraging Laravel's robust ecosystem to build secure, high-concurrency APIs and complex data architectures.</p>
          </div>
          <div className="card border border-gray-700 rounded-2xl p-6 flex flex-col gap-5" ref={(el) => (cardsRef.current[1] = el)}>
            <div className="imgLogo w-15 h-15 bg-gray-900 rounded-lg flex items-center justify-center">
              <img src={javascriptIcon} alt="" className="w-7 h-7 object-contain" />
            </div>
            <h2 className="text-lg md:text-2xl font-medium">Frontend Artistry</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">Crafting immersive user interfaces with React and Tailwind CSS, focusing on performance and atomic design patterns.</p>
          </div>
          <div className="card border border-gray-700 rounded-2xl p-6 flex flex-col gap-5" ref={(el) => (cardsRef.current[2] = el)}>
            <div className="imgLogo w-15 h-15 bg-gray-900 rounded-lg flex items-center justify-center">
              <img src={architectIcon} alt="" className="w-7 h-7 object-contain" />
            </div>
            <h2 className="text-lg md:text-2xl font-medium">System Design</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">Implementing distributed systems, caching strategies, and CI/CD pipelines for production-ready reliability</p>
          </div>
        </div>
    </section>
    </>
    
  )
}

export default Hero