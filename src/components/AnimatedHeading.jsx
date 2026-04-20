import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedHeading = ({
  text = "",
  highlight = "",
  className = "",
  stagger = 0.08,
  duration = 0.7,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ah-letter", {
        y: 50,
        opacity: 0,
        duration,
        stagger,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, [text, stagger, duration]);

  return (
    <h1
      ref={ref}
      className={`text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] ${className}`}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block mr-2">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className={`ah-letter inline-block ${
                word === highlight
                  ? "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;