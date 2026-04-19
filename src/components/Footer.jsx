import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full min-h-[20vh] bg-[#020617] flex flex-col md:flex-row items-center py-0 text-white px-8 md:px-6 py-6 lg:px-6 justify-between overflow-hidden">
      <div className="right-side space-y-2">
        <h2 className="text-lg md:text-xl text-blue-400 font-medium text-center md:text-left">Portfolio Architecture</h2>
        <p className="text-gray-400 text-sm md:text-base text-center md:text-left font-light leading-relaxed">© 2024 Ethereal Architect. Built with Laravel & React.</p>
      </div>
      <div className="left-side flex gap-4 mt-4 md:mt-0 justify-center md:justify-start">
        <a href="" className="text-gray-400 text-sm md:text-base font-light leading-relaxed hover:text-blue-400 transition-all duration-300">GitHub</a>
        <a href="" className="text-gray-400 text-sm md:text-base font-light leading-relaxed hover:text-blue-400 transition-all duration-300">LinkedIn</a>
        <a href="" className="text-gray-400 text-sm md:text-base font-light leading-relaxed hover:text-blue-400 transition-all duration-300">Instagram</a>
        <a href="" className="text-gray-400 text-sm md:text-base font-light leading-relaxed hover:text-blue-400 transition-all duration-300">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer