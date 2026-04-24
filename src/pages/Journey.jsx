import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── JOURNEY DATA ──────────────────────────────────────────────────────────────
const journey = [
  {
    id: 1,
    step: "01",
    title: "System Engineering",
    color: "#38bdf8",           // sky
    colorClass: "text-sky-400",
    borderClass: "border-sky-400/40",
    bgClass: "bg-sky-400/10",
    dotClass: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]",
    lineClass: "from-sky-400/60",
    tags: ["Networking", "Azure AZ-900", "Cloud Fundamentals"],
    tagClass: "text-sky-400 bg-sky-400/10 border-sky-400/25",
    description:
      "Stepped into the IT field by building a solid foundation in system engineering. Explored networking fundamentals, cloud infrastructure, and earned the Microsoft Azure AZ-900 Cloud Fundamentals certification.",
    side: "left",
    mockType: "network",
  },
  {
    id: 2,
    step: "02",
    title: "Networking — CCNA",
    color: "#34d399",           // emerald
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-400/40",
    bgClass: "bg-emerald-400/10",
    dotClass: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]",
    lineClass: "from-emerald-400/60",
    tags: ["CCNA", "Cisco", "Routing & Switching", "TCP/IP"],
    tagClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    description:
      "Dived deep into Cisco networking concepts covering routing protocols, switching, VLANs, subnetting and network security. Studied CCNA-level material and built a strong grasp of how the internet works at its core.",
    side: "right",
    mockType: "terminal",
  },
  {
    id: 3,
    step: "03",
    title: "Java SE & OOP",
    color: "#f97316",           // orange
    colorClass: "text-orange-400",
    borderClass: "border-orange-400/40",
    bgClass: "bg-orange-400/10",
    dotClass: "bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.8)]",
    lineClass: "from-orange-400/60",
    tags: ["Java SE", "OOP", "Design Patterns", "Data Structures"],
    tagClass: "text-orange-400 bg-orange-400/10 border-orange-400/25",
    description:
      "Made the pivot from infrastructure to programming. Learned Java Standard Edition with a deep focus on Object-Oriented Programming — encapsulation, inheritance, polymorphism, and abstraction — building the mental model that drives all modern software.",
    side: "left",
    mockType: "code",
  },
  {
    id: 4,
    step: "04",
    title: "Web Development",
    color: "#818cf8",           // indigo
    colorClass: "text-indigo-400",
    borderClass: "border-indigo-400/40",
    bgClass: "bg-indigo-400/10",
    dotClass: "bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]",
    lineClass: "from-indigo-400/60",
    tags: ["HTML5", "CSS3", "JavaScript", "ABE UK Diploma"],
    tagClass: "text-indigo-400 bg-indigo-400/10 border-indigo-400/25",
    description:
      "Transitioned to the web and earned an ABE UK Diploma in Web Development. Mastered the full frontend trio — semantic HTML, modern CSS, and JavaScript ES6+ — building responsive, accessible interfaces from the ground up.",
    side: "right",
    mockType: "browser",
  },
  {
    id: 5,
    step: "05",
    title: "PHP & Laravel",
    color: "#f472b6",           // pink
    colorClass: "text-pink-400",
    borderClass: "border-pink-400/40",
    bgClass: "bg-pink-400/10",
    dotClass: "bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.8)]",
    lineClass: "from-pink-400/60",
    tags: ["PHP", "Laravel", "MySQL", "REST API", "Eloquent ORM"],
    tagClass: "text-pink-400 bg-pink-400/10 border-pink-400/25",
    description:
      "Moved into server-side development with PHP, then transitioned to elegant enterprise architecture using Laravel. Mastered MVC patterns, Eloquent ORM, RESTful API design, and complex database relationships for production-grade systems.",
    side: "left",
    mockType: "terminal",
  },
  {
    id: 6,
    step: "06",
    title: "DSA & System Design",
    color: "#a78bfa",           // violet — current
    colorClass: "text-violet-400",
    borderClass: "border-violet-400/40",
    bgClass: "bg-violet-400/10",
    dotClass: "bg-violet-400 shadow-[0_0_16px_rgba(167,139,250,1)]",
    lineClass: "from-violet-400/60",
    tags: ["Data Structures", "Algorithms", "System Design", "Currently Learning"],
    tagClass: "text-violet-400 bg-violet-400/10 border-violet-400/25",
    description:
      "Currently sharpening problem-solving and architectural thinking. Studying Data Structures & Algorithms to crack complex problems efficiently, alongside System Design principles to architect scalable, distributed real-world applications.",
    side: "right",
    mockType: "graph",
    current: true,
  },
];

// ── MOCK VISUALS ──────────────────────────────────────────────────────────────
const MockNetwork = () => (
  <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
    style={{ background: "linear-gradient(135deg,#0a1628,#0f1e3a)" }}>
    {[[50,50],[20,25],[80,25],[20,75],[80,75],[50,15],[50,85]].map(([x,y],i)=>(
      <div key={i} className="absolute w-2 h-2 rounded-full bg-sky-400/70"
        style={{ left:`${x}%`, top:`${y}%`, transform:"translate(-50%,-50%)",
          boxShadow:"0 0 8px rgba(56,189,248,0.6)" }} />
    ))}
    {[[50,50,20,25],[50,50,80,25],[50,50,20,75],[50,50,80,75],
      [20,25,80,25],[20,75,80,75],[50,50,50,15],[50,50,50,85]].map(([x1,y1,x2,y2],i)=>(
      <svg key={i} className="absolute inset-0 w-full h-full" style={{pointerEvents:"none"}}>
        <line x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
          stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
      </svg>
    ))}
    <div className="text-sky-400/20 text-xs font-mono absolute bottom-3 right-3">192.168.1.0/24</div>
  </div>
);

const MockTerminal = ({ color = "#34d399" }) => (
  <div className="w-full h-full flex flex-col p-4 font-mono text-xs overflow-hidden"
    style={{ background:"linear-gradient(135deg,#0a1628,#0c1a2e)" }}>
    <div className="flex gap-1.5 mb-3">
      {["#f87171","#fbbf24","#34d399"].map(c=>(
        <div key={c} className="w-2 h-2 rounded-full opacity-70" style={{background:c}} />
      ))}
    </div>
    {["$ ssh router@192.168.1.1","Connected to Cisco IOS","Router> enable","Router# conf t",
      "Router(config)# int fa0/0","Router(config-if)# ip addr 10.0.0.1 255.255.255.0"].map((line,i)=>(
      <div key={i} className="mb-1 opacity-60" style={{color}}>{line}</div>
    ))}
    <div className="flex items-center gap-1 mt-1">
      <span style={{color}} className="opacity-60">Router(config-if)#</span>
      <div className="w-2 h-3 animate-pulse" style={{background:color,opacity:0.8}} />
    </div>
  </div>
);

const MockCode = () => (
  <div className="w-full h-full flex flex-col p-4 font-mono text-[11px] overflow-hidden"
    style={{ background:"linear-gradient(135deg,#0a1628,#0c1a2e)" }}>
    <div className="flex gap-1.5 mb-3">
      {["#f87171","#fbbf24","#34d399"].map(c=>(
        <div key={c} className="w-2 h-2 rounded-full opacity-70" style={{background:c}} />
      ))}
    </div>
    <div className="space-y-1">
      <div><span className="text-violet-400">public class</span> <span className="text-sky-400">Animal</span> {"{"}</div>
      <div className="pl-4"><span className="text-violet-400">private</span> <span className="text-emerald-400">String</span> name;</div>
      <div className="pl-4 text-gray-500">// Constructor</div>
      <div className="pl-4"><span className="text-violet-400">public</span> <span className="text-sky-400">Animal</span>(<span className="text-emerald-400">String</span> name) {"{"}</div>
      <div className="pl-8"><span className="text-orange-400">this</span>.name = name;</div>
      <div className="pl-4">{"}"}</div>
      <div className="pl-4"><span className="text-violet-400">public void</span> <span className="text-yellow-400">speak</span>() {"{"}</div>
      <div className="pl-8 text-gray-500">// Override me</div>
      <div className="pl-4">{"}"}</div>
      <div>{"}"}</div>
    </div>
  </div>
);

const MockBrowser = () => (
  <div className="w-full h-full flex flex-col overflow-hidden"
    style={{ background:"linear-gradient(135deg,#0a1628,#0f1e3a)" }}>
    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/5">
      {["#f87171","#fbbf24","#34d399"].map(c=>(
        <div key={c} className="w-2 h-2 rounded-full opacity-70" style={{background:c}} />
      ))}
      <div className="flex-1 h-5 rounded bg-white/5 mx-2 flex items-center px-2">
        <span className="text-[9px] text-white/30">https://myportfolio.dev</span>
      </div>
    </div>
    <div className="flex-1 p-3 flex flex-col gap-2">
      <div className="h-6 w-3/4 rounded bg-indigo-400/20" />
      <div className="h-3 w-full rounded bg-white/5" />
      <div className="h-3 w-5/6 rounded bg-white/5" />
      <div className="flex gap-2 mt-1">
        <div className="h-6 w-20 rounded bg-indigo-400/25 border border-indigo-400/30" />
        <div className="h-6 w-16 rounded bg-white/5 border border-white/10" />
      </div>
      <div className="grid grid-cols-3 gap-1.5 mt-2">
        {[1,2,3].map(i=>(
          <div key={i} className="h-12 rounded bg-white/4 border border-white/5" />
        ))}
      </div>
    </div>
  </div>
);

const MockGraph = () => (
  <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
    style={{ background:"linear-gradient(135deg,#0f0a1e,#1a0f2e)" }}>
    {/* nodes */}
    {[[50,50],[25,30],[75,30],[15,60],[85,60],[40,75],[60,75],[50,15]].map(([x,y],i)=>(
      <div key={i} className="absolute rounded-full"
        style={{ left:`${x}%`, top:`${y}%`, transform:"translate(-50%,-50%)",
          width: i===0?10:6, height: i===0?10:6,
          background:`rgba(167,139,250,${i===0?1:0.6})`,
          boxShadow:`0 0 ${i===0?16:8}px rgba(167,139,250,${i===0?0.9:0.5})` }} />
    ))}
    {/* edges */}
    <svg className="absolute inset-0 w-full h-full" style={{pointerEvents:"none"}}>
      {[[50,50,25,30],[50,50,75,30],[50,50,15,60],[50,50,85,60],
        [50,50,40,75],[50,50,60,75],[50,50,50,15],[25,30,15,60],[75,30,85,60]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
          stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
      ))}
    </svg>
    <div className="absolute bottom-3 right-3 text-violet-400/30 text-[9px] font-mono">O(log n)</div>
  </div>
);

const mockMap = {
  network: <MockNetwork />,
  terminal: <MockTerminal />,
  code: <MockCode />,
  browser: <MockBrowser />,
  graph: <MockGraph />,
};

// ── TIMELINE ITEM ─────────────────────────────────────────────────────────────
const TimelineItem = ({ item, index }) => {
  const isLeft = item.side === "left";

  return (
    <div className="timeline-item grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] gap-0 items-start">

      {/* LEFT SIDE */}
      <div className={`
        flex flex-col gap-3 pb-8 md:pb-0
        ${isLeft
          ? "md:pr-10 md:text-right md:items-end"
          : "md:order-3 md:pl-10 md:text-left md:items-start"}
      `}>
        {/* Step number */}
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${item.colorClass} opacity-60`}>
          Step {item.step}
        </span>

        {/* Title */}
        <h3 className={`text-lg md:text-xl font-bold ${item.colorClass}`}>
          {item.title}
          {item.current && (
            <span className="ml-2 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-violet-400 bg-violet-400/15 border border-violet-400/30 px-2 py-0.5 rounded-full align-middle">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Now
            </span>
          )}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xs">
          {item.description}
        </p>

        {/* Tags */}
        <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : "justify-start"}`}>
          {item.tags.map(tag => (
            <span key={tag}
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.tagClass}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Mock visual — mobile only shows here */}
        <div className={`
          block md:hidden w-full h-40 rounded-xl overflow-hidden border ${item.borderClass} mt-2
        `}>
          {mockMap[item.mockType]}
        </div>
      </div>

      {/* CENTER — dot + line */}
      <div className="hidden md:flex flex-col items-center order-2">
        {/* dot */}
        <div className={`
          w-4 h-4 rounded-full flex-shrink-0 z-10 mt-1
          border-2 border-[#050a18]
          ${item.dotClass}
        `} />
        {/* line down */}
        <div className={`flex-1 w-px bg-gradient-to-b ${item.lineClass} to-transparent min-h-16`} />
      </div>

      {/* RIGHT SIDE — image panel */}
      <div className={`
        hidden md:block
        ${isLeft ? "order-3 pl-10" : "order-1 pr-10"}
      `}>
        <div className={`
          w-full h-44 rounded-2xl overflow-hidden border ${item.borderClass}
          opacity-80 hover:opacity-100 transition-opacity duration-300
        `}>
          {mockMap[item.mockType]}
        </div>
      </div>

    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const Journey = () => {
  const heroRef = useRef(null);

  // Hero on-load
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".journey-badge", { y: -18, opacity: 0, duration: 0.55 })
        .from(".journey-word",  { y: 50,  opacity: 0, duration: 0.7, stagger: 0.09 }, "-=0.2")
        .from(".journey-desc",  { y: 24,  opacity: 0, duration: 0.6 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Scroll trigger each timeline item
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".timeline-item").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reset" },
          y: 50, opacity: 0, duration: 0.75, ease: "power3.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="text-white min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="px-5 sm:px-10 md:px-16 lg:px-24 pt-24 pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto">

          {/* Badge */}
          <div className="journey-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-700 bg-gray-800/30 mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">
              Evolutionary Path
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-5">
            <span className="journey-word inline-block text-white">The</span>{" "}
            <span className="journey-word inline-block text-white">Learning</span>{" "}
            <span className="journey-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Journey.
            </span>
          </h1>

          {/* Description */}
          <p className="journey-desc text-sm md:text-base text-gray-400 leading-relaxed max-w-lg">
            A chronicle of technical mastery — from the fundamentals of system engineering
            and networking to the sophisticated architectures of modern web frameworks and
            scalable system design.
          </p>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-16 lg:px-24 pb-32">
        <div className="max-w-5xl mx-auto">

          {/* Vertical line background (desktop) */}
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

            <div className="flex flex-col gap-10 md:gap-16">
              {journey.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </div>

            {/* End cap */}
            <div className="hidden md:flex flex-col items-center mt-4">
              <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
              <p className="text-[10px] text-white/25 uppercase tracking-widest mt-3 font-medium">
                The journey continues...
              </p>
            </div>
            <div className="flex md:hidden justify-center mt-6">
              <p className="text-[10px] text-white/25 uppercase tracking-widest font-medium">
                The journey continues...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journey;