import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// ── CONTACT DATA ─────────────────────────────────────────────────────────────
const contacts = [
  {
    id: "email",
    label: "Email",
    value: "yemyintswe944@gmail.com",
    href: "mailto:yemyintswe944@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    color: "#4f6ef7",
    bg: "rgba(79,110,247,0.1)",
    border: "rgba(79,110,247,0.2)",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+959 799 442 744",
    href: "+959 799 442 744",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.1)",
    border: "rgba(56,189,248,0.2)",
  },
  
  {
    id: "github",
    label: "GitHub",
    value: "https://github.com/siyadtwerhill",
    href: "https://github.com/siyadtwerhill",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>
    ),
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
const Contact = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [focused, setFocused] = useState(null);

  // ── ON-LOAD HERO ANIMATIONS ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".contact-badge",   { y: -20, opacity: 0, duration: 0.6 })
        .from(".contact-word",    { y: 50, opacity: 0, duration: 0.7, stagger: 0.09 }, "-=0.2")
        .from(".contact-sub",     { y: 24, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".contact-divider", { scaleX: 0, opacity: 0, duration: 0.8, transformOrigin: "left" }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── SCROLL TRIGGER ANIMATIONS ──────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // contact cards stagger in
      gsap.from(".contact-card", {
        scrollTrigger: { trigger: ".contact-card", start: "top 88%" },
        y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      });

      // form slides up
      gsap.from(".form-wrap", {
        scrollTrigger: { trigger: ".form-wrap", start: "top 88%" },
        y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
      });

      // form fields stagger
      gsap.from(".form-field", {
        scrollTrigger: { trigger: ".form-field", start: "top 90%" },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  // ── HOVER INTERACTIONS ─────────────────────────────────────────────────────
  const onCardEnter = (e) => gsap.to(e.currentTarget, { y: -6, duration: 0.3, ease: "power2.out" });
  const onCardLeave = (e) => gsap.to(e.currentTarget, { y: 0,  duration: 0.4, ease: "power2.inOut" });

  const onBtnEnter = (e) => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2, ease: "power2.out" });
  const onBtnLeave = (e) => gsap.to(e.currentTarget, { scale: 1,    duration: 0.25, ease: "power2.inOut" });

  // ── FORM SUBMIT ────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    gsap.to(".submit-btn", { scale: 0.97, duration: 0.15, yoyo: true, repeat: 1 });

    emailjs.send(
      "service_bjnab2w",
      "template_f5wlrdz",
      {
        to_email: "siyadtwerhill@gmail.com",
        from_name: form.name,
        from_email: form.email,
        subject: form.subject || "New Message",
        message: form.message,
      },
      "zjk-v-VzdrEkuQNS9"
    )
    .then(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });

      gsap.from(".success-msg", { y: 16, opacity: 0, duration: 0.5 });
    })
    .catch((error) => {
      console.error(error);
      setStatus("error");
    });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="text-white min-h-screen" >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 13px 16px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          resize: none;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.25); }
        .contact-input:focus {
          border-color: rgba(79,110,247,0.6);
          background: rgba(79,110,247,0.06);
        }
        .contact-input:hover:not(:focus) {
          border-color: rgba(255,255,255,0.15);
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #4f6ef7, #7c3aed);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 0 28px rgba(79,110,247,0.35);
          transition: box-shadow 0.3s, opacity 0.3s;
        }
        .submit-btn:hover { box-shadow: 0 0 42px rgba(79,110,247,0.55); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .contact-card-link {
          text-decoration: none;
          display: block;
        }
        .contact-word { display: inline-block; }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .cards-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative px-8 md:px-20 lg:px-32 pt-24 pb-16 overflow-hidden"
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Badge */}
          <div className="contact-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-700 bg-gray-800/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">
              Available for work
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            {"Let's".split("").map((c, i) => (
              <span key={i} className="contact-word">{c}</span>
            ))}
            <span className="contact-word">&nbsp;</span>
            <span
              className="contact-word"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #818cf8, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              build
            </span>
            <br />
            <span className="contact-word">something</span>
            <span className="contact-word">&nbsp;</span>
            <span className="contact-word">great.</span>
          </h1>

          {/* Subheading */}
          <p className="contact-sub text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
            Have a project in mind or just want to say hi? My inbox is always open —
            I'll get back to you within 24 hours.
          </p>

          {/* Divider */}
          <div
            className="contact-divider h-px w-full mb-0"
            style={{ background: "linear-gradient(90deg, rgba(79,110,247,0.5), transparent)" }}
          />
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <section className="relative px-8 md:px-20 lg:px-32 pb-24">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "start" }}
          >

            {/* LEFT — Contact cards */}
            <div ref={cardsRef}>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-6">
                Reach me on
              </p>
              <div
                className="cards-grid"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
              >
                {contacts.map((c) => (
                  <a
                    key={c.id}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="contact-card contact-card-link"
                    onMouseEnter={onCardEnter}
                    onMouseLeave={onCardLeave}
                    style={{
                      background: "rgba(17,28,51,0.6)",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${c.border}`,
                      borderRadius: 18,
                      padding: "20px 18px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      cursor: "pointer",
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: c.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: c.color,
                      }}
                    >
                      {c.icon}
                    </div>

                    {/* Label + value */}
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 4 }}>
                        {c.label}
                      </div>
                      <div style={{ fontSize: 13, color: c.color, fontWeight: 600, wordBreak: "break-all" }}>
                        {c.value}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability note */}
              <div
                style={{
                  marginTop: 24,
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(52,211,153,0.06)",
                  border: "1px solid rgba(52,211,153,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", flexShrink: 0, boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} />
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>
                  Currently <span style={{ color: "#34d399", fontWeight: 700 }}>open for freelance</span> and full-time opportunities.
                  Response time is usually within a day.
                </p>
              </div>
            </div>

            {/* RIGHT — Contact form */}
            <div ref={formRef}>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-6">
                Send a message
              </p>

              <div
                className="form-wrap"
                style={{
                  background: "rgba(17,28,51,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 24,
                  padding: "32px 28px",
                }}
              >
                {status === "sent" ? (
                  <div
                    className="success-msg"
                    style={{ textAlign: "center", padding: "40px 0" }}
                  >
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: "rgba(52,211,153,0.12)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px",
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Message sent!</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
                      Thanks for reaching out. I'll get back to you soon.
                    </p>
                    <button
                      style={{ marginTop: 24, background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 20px", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
                      onClick={() => setStatus("idle")}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Name + Email row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div className="form-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
                          Name <span style={{ color: "#f87171" }}>*</span>
                        </label>
                        <input
                          className="contact-input"
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          required
                        />
                      </div>
                      <div className="form-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
                          Email <span style={{ color: "#f87171" }}>*</span>
                        </label>
                        <input
                          className="contact-input"
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          required
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="form-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
                        Subject
                      </label>
                      <input
                        className="contact-input"
                        type="text"
                        name="subject"
                        placeholder="Project inquiry, collaboration..."
                        value={form.subject}
                        onChange={handleChange}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>

                    {/* Message */}
                    <div className="form-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
                        Message <span style={{ color: "#f87171" }}>*</span>
                      </label>
                      <textarea
                        className="contact-input"
                        name="message"
                        rows={5}
                        placeholder="Tell me about your project or just say hello..."
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    </div>

                    {/* Character count */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                        {form.message.length} characters
                      </span>
                    </div>

                    {/* Submit */}
                    <div className="form-field">
                      <button
                        type="submit"
                        className="submit-btn"
                        disabled={status === "sending"}
                        onMouseEnter={onBtnEnter}
                        onMouseLeave={onBtnLeave}
                      >
                        {status === "sending" ? (
                          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                              <path d="M21 12a9 9 0 00-9-9"/>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                            Send Message
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                            </svg>
                          </span>
                        )}
                      </button>
                    </div>

                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 4 }}>
                      I respect your privacy. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Spin keyframe for loading spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Contact;