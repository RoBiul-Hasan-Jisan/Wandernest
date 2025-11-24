import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigation } from "react-router-dom";
import { RiMapPinLine, RiCompass3Line } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { BarChart3, Settings, LogOut, Menu, X } from "lucide-react";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-slate-700/50" 
          : "bg-gradient-to-b from-slate-900/90 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Logo Section */}
        <a
          href="/"
          className="flex items-center transition-all duration-300 hover:scale-105 group"
        >
          <img src="/logo.png" alt="AI Travel Guide" className="h-12 drop-shadow-lg" />
          
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-all duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 text-slate-200 hover:text-cyan-300 transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Navigation and User Section */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-cyan-500/30 bg-slate-800/40 text-slate-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 px-6 py-2 font-semibold"
              >
                <MdOutlineExplore className="h-4 w-4" />
                <span>Create Trip</span>
              </Button>
            </a>
            {/* FIXED: Changed href from /create-trip to /my-trips */}
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-blue-500/30 bg-slate-800/40 text-slate-200 hover:bg-blue-500/20 hover:border-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 px-6 py-2 font-semibold"
              >
                <RiMapPinLine className="h-4 w-4" />
                <span>My Trips</span>
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-700/50 py-6 px-6 absolute top-full left-0 right-0 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-5 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-semibold text-slate-200 hover:text-cyan-300 py-3 px-4 rounded-xl hover:bg-slate-800/50 transition-all duration-300 border-l-2 border-transparent hover:border-cyan-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col space-y-4 border-t border-slate-700/50 pt-6">
            <a href="/create-trip" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full justify-center rounded-xl border-2 border-cyan-500/30 bg-slate-800/40 text-slate-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-3 py-4 font-semibold"
              >
                <MdOutlineExplore className="h-5 w-5" />
                <span className="text-base">Create Trip</span>
              </Button>
            </a>
            <a href="/my-trips" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full justify-center rounded-xl border-2 border-blue-500/30 bg-slate-800/40 text-slate-200 hover:bg-blue-500/20 hover:border-blue-400 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 py-4 font-semibold"
              >
                <RiMapPinLine className="h-5 w-5" />
                <span className="text-base">My Trips</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;