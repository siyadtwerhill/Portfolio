import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/program.png'

const Header = () => {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-5 py-2 rounded-xl border border-dashed border-blue-400 text-sm md:text-base transition 
     ${isActive ? 'text-blue-400 font-medium border-none' : 'hover:bg-blue-400/10'}`

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#040d24]/40 border-b border-gray-500">
      <nav className="flex justify-between items-center px-4 md:px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-6 h-6" />
          <h2 className="text-blue-400 text-lg md:text-xl font-normal">
            The Ethereal Architect
          </h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
          <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
          <li><NavLink to="/projects" className={linkClass}>Projects</NavLink></li>
          <li><NavLink to="/journey" className={linkClass}>Journey</NavLink></li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-blue-400 text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#030a1b] transition-all duration-300 
        ${open ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}
      >
        <ul className="flex flex-col items-center gap-4 py-6">
          <li>
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={linkClass} onClick={() => setOpen(false)}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/journey" className={linkClass} onClick={() => setOpen(false)}>
              Journey
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header