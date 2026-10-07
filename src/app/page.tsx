"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  Phone, 
  ArrowRight, 
  ChevronUp, 
  Menu, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  Film, 
  Grid,
  Send
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Logo Component
function BrandLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 90 90" fill="none" className="h-9 w-9 flex-shrink-0">
        <defs>
          <linearGradient id="dyGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#258ff3" />
            <stop offset="100%" stopColor="#0052cc" />
          </linearGradient>
          <filter id="navGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <polygon points="45,5 82,26 82,69 45,90 8,69 8,26" fill="#080b13" stroke="url(#dyGradNav)" strokeWidth="4" filter="url(#navGlow)" />
        <path d="M 45,5 L 45,90 M 8,26 L 82,69 M 8,69 L 82,26" stroke="#258ff3" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M 26,28 L 44,28 C 55,28 62,34 62,47 C 62,60 55,66 44,66 L 26,66 Z" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 33,31 L 45,48 L 45,67 M 45,48 L 57,31" fill="none" stroke="url(#dyGradNav)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="45" cy="5" r="4" fill="#38bdf8" />
        <circle cx="82" cy="26" r="4" fill="#258ff3" />
        <circle cx="82" cy="69" r="4" fill="#38bdf8" />
        <circle cx="8" cy="69" r="4" fill="#258ff3" />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 font-display text-lg sm:text-xl tracking-wider leading-none">
          <span className="text-white font-black">DY</span>
          <span className="text-blue font-black">AUTOMATION</span>
        </div>
        <span className="font-mono text-[7.5px] sm:text-[9px] text-muted tracking-[0.2em] mt-1 whitespace-nowrap uppercase">
          EVERY HOME WILL NOW BE SMART
        </span>
      </div>
    </div>
  );
}

// Media Assets Data
const REAL_IMAGES = [
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.41 AM.jpeg",
    title: "Smart Home Automation Hub & Circuit Integration",
    category: "Smart Home",
    desc: "Precision low-voltage wiring and micro-controller integration for intelligent residential lighting and load management."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.40 AM.jpeg",
    title: "Smart Switch & Touch Panel Assembly",
    category: "Smart Home",
    desc: "Custom smart wall touch modules engineered for seamless home automation interface."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.40 AM (1).jpeg",
    title: "Residential Lighting & Power Automation Panel",
    category: "Smart Home",
    desc: "Modular control enclosure providing touch & smartphone app control over living space lighting."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.41 AM (1).jpeg",
    title: "Industrial Electrical Distribution Enclosure",
    category: "Electrical",
    desc: "Heavy-duty breaker box wiring with line protection devices and calibrated phase distribution."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.42 AM.jpeg",
    title: "Smart Relay Module & Load Controller",
    category: "Smart Home",
    desc: "Multi-channel automation relay board for centralized home circuit switching."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.42 AM (1).jpeg",
    title: "Industrial PLC Main Control Panel",
    category: "Industrial PLC",
    desc: "High-density PLC wiring cabinet for automated process lines and machinery."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.43 AM.jpeg",
    title: "Automated Control Enclosure & Monitoring",
    category: "Industrial PLC",
    desc: "SCADA integrated control panel built with industrial safety standards and surge protection."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.43 AM (1).jpeg",
    title: "On-Site Installation & Field Wiring",
    category: "Commissioning",
    desc: "DY Automation engineers executing site wiring and terminal block connections."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.44 AM.jpeg",
    title: "Custom Smart Panel Internal Layout",
    category: "Smart Home",
    desc: "Neat, color-coded internal wiring harness for long-term reliability and easy maintenance."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.44 AM (1).jpeg",
    title: "Power Distribution Board Testing",
    category: "Electrical",
    desc: "Handover quality inspection and circuit continuous load check in progress."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.44 AM (2).jpeg",
    title: "Compact Smart Control Module",
    category: "Smart Home",
    desc: "Retrofit automation unit installed behind standard wall plates for smart home conversion."
  },
  {
    src: "/assets/newImages/WhatsApp Image 2026-10-05 at 11.55.45 AM.jpeg",
    title: "Complete Plant Control Panel Handover",
    category: "Commissioning",
    desc: "Fully commissioned control system running active plant machinery."
  }
];

const WORK_VIDEOS = [
  {
    id: "vid-1",
    src: "/assets/videos/WhatsApp Video 2026-10-05 at 7.32.48 PM.mp4",
    title: "Smart Home Automation Touch Panel Demo",
    category: "Smart Home",
    subtitle: "Interactive lighting & scene control powered by DY Automation smart modules.",
    duration: "Real Project Video"
  },
  {
    id: "vid-2",
    src: "/assets/videos/WhatsApp Video 2026-10-05 at 7.32.50 PM.mp4",
    title: "Industrial Control Panel Live Operational Test",
    category: "Industrial PLC",
    subtitle: "PLC relay sequence and automatic power switching live demonstration.",
    duration: "Live Testing Video"
  },
  {
    id: "vid-3",
    src: "/assets/videos/WhatsApp Video 2026-10-05 at 7.33.07 PM.mp4",
    title: "On-Site Wiring & Panel Commissioning",
    category: "Commissioning",
    subtitle: "Hands-on installation work performed by our expert engineers at client site.",
    duration: "Field Work Video"
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Gallery Filter State
  const [activeTab, setActiveTab] = useState<"ALL" | "VIDEOS" | "SMART_HOME" | "INDUSTRIAL">("ALL");

  // Lightbox Modal State
  const [activeMedia, setActiveMedia] = useState<{ type: "image" | "video"; src: string; title: string; desc?: string } | null>(null);

  // Video Playing States
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [mutedVideoId, setMutedVideoId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Custom cursor image state
  const [hoveredServiceIdx, setHoveredServiceIdx] = useState<number | null>(null);
  const cursorImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll listener for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP Hero Animations
    const tl = gsap.timeline();

    tl.to(".hero-image", {
      scale: 1,
      duration: 2,
      ease: "power3.out",
    }, 0)
    .fromTo(".hero-badge",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.3)
    .fromTo(".hero-heading .line",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }, 0.5)
    .fromTo(".hero-subtext",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 1.1)
    .fromTo(".hero-buttons",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 1.3)
    .fromTo(".hero-stats",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 1.5);

    // Cursor Follower for Desktop
    let xTo = gsap.quickTo(cursorImgRef.current, "x", { duration: 0.4, ease: "power3" });
    let yTo = gsap.quickTo(cursorImgRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const togglePlayVideo = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingVideoId === id) {
      video.pause();
      setPlayingVideoId(null);
    } else {
      // Pause other videos
      Object.keys(videoRefs.current).forEach((key) => {
        if (key !== id && videoRefs.current[key]) {
          videoRefs.current[key]?.pause();
        }
      });
      video.play().catch(() => {});
      setPlayingVideoId(id);
    }
  };

  const toggleMuteVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;
    video.muted = !video.muted;
    setMutedVideoId(video.muted ? id : null);
  };

  const services = [
    {
      num: "01",
      title: "SMART HOME AUTOMATION",
      desc: "Transforming standard living spaces with touch panels, wireless scene control, smart switches, and app automation.",
      image: REAL_IMAGES[0].src
    },
    {
      num: "02",
      title: "INDUSTRIAL AUTOMATION",
      desc: "Transitioning plant operations and high-volume machinery from manual sequences to reliable automated control.",
      image: REAL_IMAGES[5].src
    },
    {
      num: "03",
      title: "ELECTRICAL SOLUTIONS",
      desc: "Power distribution boards, HT-LT wiring, breaker panels, and safety systems engineered for maximum uptime.",
      image: REAL_IMAGES[3].src
    },
    {
      num: "04",
      title: "PLC & SCADA SYSTEMS",
      desc: "Programmable logic controllers and real-time supervisory screen monitoring tailored for factory precision.",
      image: REAL_IMAGES[6].src
    },
    {
      num: "05",
      title: "INSTALLATION & COMMISSIONING",
      desc: "Certified electrical engineers on-site from initial cable pull to full testing and client handover.",
      image: REAL_IMAGES[7].src
    }
  ];

  // Filtered gallery items
  const filteredImages = REAL_IMAGES.filter((img) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "VIDEOS") return false;
    if (activeTab === "SMART_HOME") return img.category === "Smart Home";
    if (activeTab === "INDUSTRIAL") return img.category === "Industrial PLC" || img.category === "Electrical" || img.category === "Commissioning";
    return true;
  });

  const showVideos = activeTab === "ALL" || activeTab === "VIDEOS" || activeTab === "SMART_HOME" || activeTab === "INDUSTRIAL";

  return (
    <main className="relative min-h-screen bg-primary text-white selection:bg-blue selection:text-white pb-16 lg:pb-0">
      
      {/* DESKTOP & MOBILE NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'glass-nav h-[74px] translate-y-0 opacity-100 shadow-2xl' : 'h-[90px] md:h-[100px] bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-[5vw] h-full flex items-center justify-between">
          
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="text-left focus:outline-none">
            <BrandLogo />
          </button>
          
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-9 font-mono text-[11px] tracking-[0.2em] mx-auto">
            <button onClick={() => scrollTo('home')} className="hover:text-blue transition-colors relative group py-2">
              HOME
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors relative group py-2">
              SERVICES
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('gallery')} className="hover:text-blue transition-colors relative group py-2 flex items-center gap-1.5">
              WORK GALLERY
              <span className="bg-blue/20 text-blue text-[9px] px-1.5 py-0.5 rounded font-bold">NEW</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('why-dy')} className="hover:text-blue transition-colors relative group py-2">
              WHY DY
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-blue transition-colors relative group py-2">
              CONTACT
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* Desktop Quick CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            <a href="tel:7735211087" className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] hover:text-blue transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue" />
              7735211087
            </a>
            <a 
              href="https://wa.me/917735211087?text=Hello%20DY%20Automation,%20I%20am%20interested%20in%20smart%20home/industrial%20automation." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border border-border-subtle hover:border-blue px-4 py-2 font-mono text-[10px] tracking-[0.2em] transition-colors uppercase flex items-center gap-1.5"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => scrollTo('contact')} 
              className="bg-blue hover:bg-blue-bright text-white px-6 py-2.5 font-mono text-[10px] tracking-[0.25em] transition-all uppercase shadow-lg shadow-blue/20"
            >
              ENQUIRE
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            className="lg:hidden text-white p-2.5 rounded-lg bg-card/80 border border-border-subtle active:scale-95 transition-transform" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6 text-blue" />
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN NAVIGATION DRAWER */}
      <div 
        className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-2xl flex flex-col justify-between p-6 transition-all duration-300"
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          visibility: mobileMenuOpen ? 'visible' : 'hidden'
        }}
      >
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <BrandLogo />
          <button 
            className="text-white p-3 rounded-full bg-card border border-border-subtle" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-6 h-6 text-blue" />
          </button>
        </div>

        <div className="flex flex-col items-start gap-6 font-display text-3xl sm:text-4xl tracking-wide py-8">
          <button onClick={() => scrollTo('home')} className="hover:text-blue transition-colors flex items-center gap-3 w-full text-left">
            <span className="font-mono text-xs text-blue">01.</span> HOME
          </button>
          <button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors flex items-center gap-3 w-full text-left">
            <span className="font-mono text-xs text-blue">02.</span> SERVICES
          </button>
          <button onClick={() => scrollTo('gallery')} className="hover:text-blue transition-colors flex items-center gap-3 w-full text-left">
            <span className="font-mono text-xs text-blue">03.</span> WORK GALLERY
            <span className="bg-blue/20 text-blue text-xs font-mono px-2 py-0.5 rounded uppercase">Videos</span>
          </button>
          <button onClick={() => scrollTo('why-dy')} className="hover:text-blue transition-colors flex items-center gap-3 w-full text-left">
            <span className="font-mono text-xs text-blue">04.</span> WHY DY
          </button>
          <button onClick={() => scrollTo('contact')} className="hover:text-blue transition-colors flex items-center gap-3 w-full text-left">
            <span className="font-mono text-xs text-blue">05.</span> CONTACT US
          </button>
        </div>

        <div className="flex flex-col gap-4 font-mono text-xs tracking-widest pt-6 border-t border-border-subtle">
          <a 
            href="tel:7735211087" 
            className="w-full bg-card border border-border-subtle py-3.5 px-4 rounded flex items-center justify-center gap-2 text-white font-bold"
          >
            <Phone className="w-4 h-4 text-blue" /> CALL 7735211087
          </a>
          <a 
            href="https://wa.me/917735211087?text=Hello%20DY%20Automation,%20I%20want%20to%20know%20more%20about%20smart%20home%20automation." 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-blue text-white py-3.5 px-4 rounded flex items-center justify-center gap-2 font-bold uppercase"
          >
            CHAT ON WHATSAPP
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative w-full min-h-[92vh] md:min-h-screen flex items-center pt-24 pb-16" ref={heroRef}>
        
        {/* Real Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src={REAL_IMAGES[0].src}
            alt="Real Smart Home & Industrial Panel Installation" 
            fill 
            className="object-cover hero-image scale-105"
            priority
          />
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-[5vw] relative z-10 py-12 md:py-24 flex flex-col justify-center">
          
          {/* Hero Badge */}
          <div className="hero-badge font-mono text-xs sm:text-sm tracking-[0.25em] text-blue mb-6 sm:mb-8 flex items-center gap-3 uppercase font-semibold">
            <span className="w-2.5 h-2.5 bg-blue rotate-45 inline-block shadow-lg shadow-blue/50"></span>
            DY AUTOMATION — BHUBANESWAR, ODISHA
          </div>
          
          {/* Main Headline (Requirement 3: Clear headliner saying every home will now be smart) */}
          <h1 className="hero-heading font-display text-[38px] sm:text-[68px] md:text-[92px] lg:text-[120px] leading-[0.92] tracking-tight uppercase mb-6 sm:mb-8">
            <div className="line overflow-hidden"><span className="block text-white">EVERY HOME</span></div>
            <div className="line overflow-hidden"><span className="block text-blue font-extrabold drop-shadow-lg">WILL NOW BE SMART<span className="text-white">.</span></span></div>
            <div className="line overflow-hidden">
              <span className="block text-stroke-subtle text-xl sm:text-3xl md:text-5xl lg:text-6xl mt-2 tracking-normal">
                AUTOMATION & ELECTRICAL ENGINEERING
              </span>
            </div>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext font-sans text-muted text-base sm:text-lg md:text-xl max-w-[700px] mb-8 sm:mb-10 leading-relaxed">
            Transforming modern living spaces and industrial sites across Odisha with intelligent touch panels, custom PLC controls, and engineered electrical solutions.
          </p>

          {/* Hero Action Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 font-mono text-xs md:text-sm tracking-widest uppercase mb-12 sm:mb-16">
            <button 
              onClick={() => scrollTo('gallery')} 
              className="w-full sm:w-auto bg-blue hover:bg-blue-bright text-white px-8 py-4 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> WATCH OUR WORK VIDEOS
            </button>
            <button 
              onClick={() => scrollTo('contact')} 
              className="w-full sm:w-auto border border-border-subtle hover:border-blue bg-card/60 backdrop-blur px-8 py-4 transition-colors flex items-center justify-center gap-2 group"
            >
              START AN ENQUIRY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue" />
            </button>
          </div>

          {/* Hero Trust Points */}
          <div className="hero-stats grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-border-subtle max-w-3xl font-mono text-xs tracking-wider">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue flex-shrink-0" />
              <span>SMART HOME PANELS</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue flex-shrink-0" />
              <span>PLC & SCADA EXPERTS</span>
            </div>
            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <Zap className="w-5 h-5 text-blue flex-shrink-0" />
              <span>BHUBANESWAR BASED</span>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE MARQUEE BANNER */}
      <div className="border-y border-border-subtle py-3.5 overflow-hidden flex bg-secondary">
        <div className="flex animate-marquee whitespace-nowrap font-mono text-[10px] sm:text-xs tracking-widest uppercase text-muted w-max">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-4 sm:mx-6 text-blue text-[8px]">◆</span> EVERY HOME WILL NOW BE SMART
              <span className="mx-4 sm:mx-6 text-blue text-[8px]">◆</span> SMART HOME AUTOMATION
              <span className="mx-4 sm:mx-6 text-blue text-[8px]">◆</span> PLC & SCADA SYSTEMS
              <span className="mx-4 sm:mx-6 text-blue text-[8px]">◆</span> HT-LT DISTRIBUTION
              <span className="mx-4 sm:mx-6 text-blue text-[8px]">◆</span> INSTALLATION & COMMISSIONING
              <span className="mx-4 sm:mx-6 text-blue text-[8px]">◆</span> ON-SITE FIELD WORK
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOM CURSOR FOLLOWER FOR SERVICES (Desktop only) */}
      <div 
        ref={cursorImgRef} 
        className="fixed top-0 left-0 w-[300px] h-[380px] z-50 pointer-events-none overflow-hidden transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 border border-border-blue rounded-lg shadow-2xl mix-blend-screen hidden lg:block"
        style={{ opacity: hoveredServiceIdx !== null ? 1 : 0 }}
      >
        {hoveredServiceIdx !== null && (
          <Image 
            src={services[hoveredServiceIdx].image} 
            alt="Service preview" 
            fill 
            className="object-cover"
          />
        )}
      </div>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 sm:py-28 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-[5vw]">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="font-mono text-xs tracking-widest text-blue mb-3 flex items-center gap-3 uppercase">
                <span className="w-2 h-2 bg-blue rotate-45 inline-block"></span>
                SEC. 01 — OUR CORE VERTICALS
              </div>
              <h2 className="font-display text-3xl sm:text-5xl uppercase">ENGINEERED SERVICES</h2>
            </div>
            <p className="font-sans text-muted text-sm sm:text-base max-w-md">
              From individual smart home touch panels to complete industrial factory automation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px] sm:auto-rows-[270px]">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className={`group relative bg-card hover:bg-card-light border border-border-subtle hover:border-border-blue transition-all duration-500 p-6 sm:p-8 flex flex-col cursor-pointer rounded-sm ${idx === 0 ? 'row-span-2 md:col-span-2 p-0 overflow-hidden min-h-[420px]' : ''}`}
                onMouseEnter={() => idx !== 0 && setHoveredServiceIdx(idx)}
                onMouseLeave={() => idx !== 0 && setHoveredServiceIdx(null)}
                onClick={() => setActiveMedia({ type: "image", src: service.image, title: service.title, desc: service.desc })}
              >
                {idx === 0 ? (
                  <>
                    <div className="relative h-[65%] w-full overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors"></div>
                      <div className="absolute top-4 left-4 bg-blue/90 text-white font-mono text-[10px] tracking-widest px-3 py-1 uppercase rounded-full">
                        ★ FLAGSHIP OFFERING
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 h-[35%] flex flex-col justify-end bg-card">
                      <div className="absolute top-6 right-6 font-mono text-xs text-blue">[{service.num}]</div>
                      <h3 className="font-display text-2xl sm:text-4xl uppercase mb-2 group-hover:text-blue transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted font-sans text-xs sm:text-sm">{service.desc}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-6 right-6 font-mono text-xs text-blue group-hover:text-white transition-colors duration-300">
                      [{service.num}]
                    </div>
                    <div className="mt-auto">
                      <h3 className="font-display text-xl sm:text-2xl uppercase mb-3 group-hover:text-blue transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted font-sans text-xs sm:text-sm group-hover:text-white transition-colors duration-300 relative z-10">
                        {service.desc}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK GALLERY SECTION (Requirement 2: Use videos & photos in our work gallery section) */}
      <section id="gallery" className="py-20 sm:py-28 md:py-32 bg-secondary border-t border-border-subtle relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-[5vw]">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="font-mono text-xs tracking-widest text-blue mb-3 flex items-center gap-3 uppercase font-semibold">
                <span className="w-2.5 h-2.5 bg-blue rotate-45 inline-block"></span>
                SEC. 02 — OUR WORK GALLERY
              </div>
              <h2 className="font-display text-3xl sm:text-5xl uppercase">
                REAL VIDEOS &amp; SITE INSTALLATIONS
              </h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 font-mono text-xs tracking-wider">
              <button
                onClick={() => setActiveTab("ALL")}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${activeTab === "ALL" ? 'bg-blue text-white border-blue shadow-lg shadow-blue/20' : 'border-border-subtle bg-card text-muted hover:text-white'}`}
              >
                ALL ({REAL_IMAGES.length + WORK_VIDEOS.length})
              </button>
              <button
                onClick={() => setActiveTab("VIDEOS")}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "VIDEOS" ? 'bg-blue text-white border-blue shadow-lg shadow-blue/20' : 'border-border-subtle bg-card text-muted hover:text-white'}`}
              >
                <Film className="w-3.5 h-3.5" /> VIDEOS ({WORK_VIDEOS.length})
              </button>
              <button
                onClick={() => setActiveTab("SMART_HOME")}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${activeTab === "SMART_HOME" ? 'bg-blue text-white border-blue shadow-lg shadow-blue/20' : 'border-border-subtle bg-card text-muted hover:text-white'}`}
              >
                SMART HOMES
              </button>
              <button
                onClick={() => setActiveTab("INDUSTRIAL")}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${activeTab === "INDUSTRIAL" ? 'bg-blue text-white border-blue shadow-lg shadow-blue/20' : 'border-border-subtle bg-card text-muted hover:text-white'}`}
              >
                INDUSTRIAL &amp; PLC
              </button>
            </div>
          </div>

          {/* VIDEO SHOWCASE CARDS (If showing videos) */}
          {showVideos && (
            <div className="mb-14">
              <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-blue mb-6 uppercase">
                <Film className="w-4 h-4 text-blue" />
                <span>FEATURED VIDEO DEMONSTRATIONS (3 REAL VIDEOS)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {WORK_VIDEOS.map((vid) => (
                  <div 
                    key={vid.id}
                    className="group bg-card border border-border-subtle hover:border-blue transition-all duration-300 rounded-lg overflow-hidden flex flex-col shadow-xl"
                  >
                    {/* Video Player Box */}
                    <div className="relative aspect-video w-full bg-black overflow-hidden group">
                      <video
                        ref={(el) => { videoRefs.current[vid.id] = el; }}
                        src={vid.src}
                        className="w-full h-full object-cover"
                        playsInline
                        loop
                        preload="metadata"
                      />

                      {/* Video Overlay Controls */}
                      <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors flex items-center justify-center">
                        <button
                          onClick={() => togglePlayVideo(vid.id)}
                          className="w-14 h-14 rounded-full bg-blue/90 hover:bg-blue text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 active:scale-95 cursor-pointer z-10"
                          aria-label={playingVideoId === vid.id ? "Pause Video" : "Play Video"}
                        >
                          {playingVideoId === vid.id ? (
                            <Pause className="w-6 h-6 fill-white" />
                          ) : (
                            <Play className="w-6 h-6 fill-white ml-1" />
                          )}
                        </button>
                      </div>

                      {/* Video Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-blue text-white font-mono text-[9px] tracking-wider px-2.5 py-1 uppercase rounded font-bold">
                          {vid.category}
                        </span>
                      </div>

                      {/* Bottom Control Bar */}
                      <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                        <button
                          onClick={(e) => toggleMuteVideo(vid.id, e)}
                          className="p-2 rounded bg-black/60 hover:bg-black/80 text-white backdrop-blur transition-colors cursor-pointer"
                          aria-label="Toggle Sound"
                        >
                          {mutedVideoId === vid.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setActiveMedia({ type: "video", src: vid.src, title: vid.title, desc: vid.subtitle })}
                          className="p-2 rounded bg-black/60 hover:bg-black/80 text-white backdrop-blur transition-colors cursor-pointer"
                          aria-label="Expand Fullscreen Modal"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl uppercase mb-2 group-hover:text-blue transition-colors">
                          {vid.title}
                        </h3>
                        <p className="text-muted font-sans text-xs leading-relaxed">
                          {vid.subtitle}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border-subtle flex justify-between items-center font-mono text-[10px] text-muted">
                        <span className="text-blue font-semibold">▶ PLAY IN GALLERY</span>
                        <button 
                          onClick={() => setActiveMedia({ type: "video", src: vid.src, title: vid.title, desc: vid.subtitle })}
                          className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          FULLSCREEN <Maximize2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REAL PHOTO GALLERY GRID (Requirement 1: Use images in newImages) */}
          {activeTab !== "VIDEOS" && (
            <div>
              <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-blue mb-6 uppercase">
                <Grid className="w-4 h-4 text-blue" />
                <span>ON-SITE INSTALLATION &amp; SMART PANEL PHOTOS ({filteredImages.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="group relative aspect-[4/3] bg-card border border-border-subtle hover:border-blue overflow-hidden cursor-pointer rounded transition-all duration-300"
                    onClick={() => setActiveMedia({ type: "image", src: img.src, title: img.title, desc: img.desc })}
                  >
                    <Image 
                      src={img.src} 
                      alt={img.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <span className="self-end bg-black/60 backdrop-blur text-white font-mono text-[9px] px-2 py-0.5 rounded border border-border-subtle">
                        {img.category}
                      </span>
                      <div>
                        <h4 className="font-display text-sm sm:text-base uppercase text-white line-clamp-1 group-hover:text-blue transition-colors">
                          {img.title}
                        </h4>
                        <div className="flex items-center gap-1 font-mono text-[10px] text-blue mt-1">
                          <Eye className="w-3 h-3" /> TAP TO EXPAND
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* WHY DY SECTION */}
      <section id="why-dy" className="py-20 sm:py-28 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-[5vw]">
          <div className="font-mono text-xs tracking-widest text-blue mb-12 sm:mb-16 flex items-center gap-3 uppercase font-semibold">
            <span className="w-2.5 h-2.5 bg-blue rotate-45 inline-block"></span>
            SEC. 03 — WHY CHOOSE DY AUTOMATION
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl uppercase leading-tight mb-6">
                ONE RESPONSIBLE TEAM FOR YOUR ENTIRE SMART SCOPE.
              </h2>
              <p className="text-muted font-sans text-base sm:text-lg leading-relaxed mb-8">
                Whether retrofitting a residence with intuitive smart light controls or engineering a plant-wide PLC panel, DY Automation delivers end-to-end execution without third-party handoffs.
              </p>

              <div className="relative aspect-[4/3] w-full overflow-hidden border border-border-subtle rounded-lg shadow-2xl">
                <Image 
                  src={REAL_IMAGES[9].src} 
                  alt="DY Automation Engineer Testing Electrical Board" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-blue/10 mix-blend-overlay"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur p-4 border border-border-subtle rounded font-mono text-xs">
                  <span className="text-blue font-bold">LIVE FIELD TESTING:</span> 100% load & continuity inspection before panel dispatch.
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 sm:gap-10">
              {[
                {
                  num: "01",
                  title: "EVERY HOME SMART PHILOSOPHY",
                  desc: "We design home automation to be practical, reliable, and accessible — giving homeowners full app & touch control over lighting, appliances, and power."
                },
                {
                  num: "02",
                  title: "LOCAL ODISHA ENGINEERING TEAM",
                  desc: "Based at Rasulgarh, Bhubaneswar, our technicians arrive fast on site across Odisha for fast installation, testing, and 24/7 post-commissioning support."
                },
                {
                  num: "03",
                  title: "ENGINEER-LED DIRECT DELIVERY",
                  desc: "The engineers who design your PLC logic or smart home layout are on site for installation. Zero miscommunication between sales and execution."
                }
              ].map((feature, idx) => (
                <div key={idx} className="border-b border-border-subtle pb-8 last:border-0">
                  <div className="font-mono text-xs text-blue mb-2 tracking-widest font-bold">[{feature.num}] // DIFFERENTIATOR</div>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase mb-3">{feature.title}</h3>
                  <p className="text-muted leading-relaxed font-sans text-sm sm:text-base">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION & ENQUIRY FORM */}
      <section id="contact" className="py-24 sm:py-32 md:py-40 border-t border-border-subtle relative overflow-hidden bg-secondary">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-blue/5 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-[5vw] relative z-10 text-center max-w-4xl">
          
          <div className="font-mono text-xs sm:text-sm tracking-widest text-blue mb-6 uppercase font-bold">
            GET YOUR FREE CONSULTATION &amp; ESTIMATE
          </div>
          
          <h2 className="font-display text-3xl sm:text-6xl uppercase mb-4">
            MAKE YOUR HOME OR PLANT SMART TODAY.
          </h2>
          
          <p className="font-sans text-muted text-base sm:text-lg max-w-2xl mx-auto mb-12">
            Speak directly with our automation engineers in Bhubaneswar to plan your smart home or industrial electrical setup.
          </p>
          
          <form 
            className="text-left grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 sm:p-10 border border-border-subtle rounded-lg shadow-2xl relative" 
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert("Thank you! Your enquiry has been sent. DY Automation team will call you shortly."); 
            }}
          >
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-display text-2xl uppercase mb-2">Send An Enquiry</h3>
              <p className="text-muted font-sans text-xs">Fill out the quick form below for prompt callback.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Your Name *</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Rajesh Mohanty"
                className="bg-primary border border-border-subtle rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-blue transition-colors text-white" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Phone Number *</label>
              <input 
                required 
                type="tel" 
                placeholder="e.g. 7735211087"
                className="bg-primary border border-border-subtle rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-blue transition-colors text-white" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Service Required *</label>
              <select 
                required 
                className="bg-primary border border-border-subtle rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-blue transition-colors text-white"
              >
                <option value="">Select Service Needed...</option>
                <option value="Smart Home Automation">Smart Home Automation</option>
                <option value="Industrial Automation">Industrial Automation</option>
                <option value="Electrical Solutions">Electrical Solutions & Power Board</option>
                <option value="PLC & SCADA">PLC & SCADA Systems</option>
                <option value="Installation">Installation & Commissioning</option>
                <option value="Maintenance">Maintenance & Support</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">City / Location</label>
              <input 
                type="text" 
                placeholder="e.g. Bhubaneswar / Cuttack"
                className="bg-primary border border-border-subtle rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-blue transition-colors text-white" 
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Project Requirement Details</label>
              <textarea 
                rows={3} 
                placeholder="Describe your home or factory requirement..."
                className="bg-primary border border-border-subtle rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-blue transition-colors resize-none text-white"
              ></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 mt-2">
              <button 
                type="submit" 
                className="w-full bg-blue hover:bg-blue-bright text-white px-8 py-4 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue/20 cursor-pointer rounded"
              >
                SUBMIT ENQUIRY <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Quick Direct Contacts */}
          <div className="flex flex-wrap justify-center gap-4 font-mono text-xs tracking-widest uppercase mt-10">
            <a 
              href="tel:7735211087" 
              className="bg-card border border-border-subtle hover:border-blue px-6 py-3.5 rounded transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue" /> CALL: 7735211087
            </a>
            <a 
              href="tel:8983111087" 
              className="bg-card border border-border-subtle hover:border-blue px-6 py-3.5 rounded transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue" /> CALL: 8983111087
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-16 sm:pt-24 border-t border-border-subtle overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Col 1 */}
            <div className="flex flex-col gap-4">
              <BrandLogo />
              <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-sm mt-2">
                DY Automation provides engineer-led home automation, industrial electrical panels, PLC/SCADA programming, and commissioning across Odisha.
              </p>
              <div className="font-mono text-xs tracking-widest text-blue mt-4 uppercase font-bold">
                — EVERY HOME WILL NOW BE SMART —
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-mono text-xs tracking-widest text-muted mb-6 uppercase font-semibold">NAVIGATION &amp; SERVICES</h4>
              <ul className="flex flex-col gap-3 font-sans text-sm">
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors text-muted hover:text-white">Smart Home Automation</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors text-muted hover:text-white">Industrial PLC & SCADA Systems</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors text-muted hover:text-white">Electrical Power Distribution</button></li>
                <li><button onClick={() => scrollTo('gallery')} className="hover:text-blue transition-colors text-muted hover:text-white">Real Work Gallery & Videos</button></li>
                <li><button onClick={() => scrollTo('why-dy')} className="hover:text-blue transition-colors text-muted hover:text-white">Why DY Automation</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-mono text-xs tracking-widest text-muted mb-6 uppercase font-semibold">HEAD OFFICE &amp; CONTACT</h4>
              <ul className="flex flex-col gap-3 font-sans text-sm text-muted">
                <li>
                  <a href="tel:7735211087" className="hover:text-blue transition-colors text-white font-semibold flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue" /> +91 7735211087
                  </a>
                </li>
                <li>
                  <a href="tel:8983111087" className="hover:text-blue transition-colors text-white font-semibold flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue" /> +91 8983111087
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/917735211087" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue hover:underline font-semibold block mt-1"
                  >
                    Chat on WhatsApp →
                  </a>
                </li>
                <li className="mt-3 text-xs leading-relaxed border-t border-border-subtle pt-3">
                  Rasulgarh, Esplanade, 6th Floor,<br/>
                  Bhubaneswar, Odisha – 751010
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Typography Graphic */}
        <div className="w-full relative h-[10vw] min-h-[60px] flex items-end justify-center overflow-hidden pointer-events-none mb-2">
          <div 
            className="font-display text-[12vw] leading-[0.75] text-transparent whitespace-nowrap opacity-15 pointer-events-none select-none w-full text-center tracking-tight"
            style={{ WebkitTextStroke: '1px var(--color-text-secondary)' }}
          >
            DY AUTOMATION
          </div>
        </div>

        <div className="border-t border-border-subtle bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 md:px-[5vw] py-5 flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[10px] tracking-widest text-muted uppercase text-center md:text-left">
            <div>© 2026 DY AUTOMATION. ALL RIGHTS RESERVED.</div>
            <div className="text-blue">EVERY HOME WILL NOW BE SMART</div>
            <div>BHUBANESWAR, ODISHA</div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM QUICK ACTION BAR (Requirement 5: Mobile First responsiveness & instant leads) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-xl border-t border-border-subtle p-2.5 flex items-center gap-2 shadow-2xl">
        <a 
          href="tel:7735211087" 
          className="flex-1 bg-card hover:bg-card-light border border-border-subtle text-white font-mono text-xs py-3 px-2 rounded flex items-center justify-center gap-1.5 font-bold"
        >
          <Phone className="w-3.5 h-3.5 text-blue" /> CALL NOW
        </a>
        <a 
          href="https://wa.me/917735211087?text=Hello%20DY%20Automation,%20I%20want%20a%20quote%20for%20smart%20home/industrial%20automation." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-blue hover:bg-blue-bright text-white font-mono text-xs py-3 px-2 rounded flex items-center justify-center gap-1.5 font-bold uppercase shadow-lg shadow-blue/30"
        >
          WHATSAPP
        </a>
      </div>

      {/* LIGHTBOX MEDIA MODAL (FOR FULLSCREEN VIDEO & PHOTO VIEWING) */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 transition-all"
          onClick={() => setActiveMedia(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white p-3 rounded-full bg-card/80 border border-border-subtle hover:border-blue transition-colors z-50 cursor-pointer"
            onClick={() => setActiveMedia(null)}
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6 text-blue" />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activeMedia.type === "video" ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-border-blue bg-black shadow-2xl">
                <video 
                  src={activeMedia.src} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-lg overflow-hidden border border-border-subtle">
                <Image 
                  src={activeMedia.src} 
                  alt={activeMedia.title} 
                  fill 
                  className="object-contain"
                />
              </div>
            )}

            <div className="mt-4 text-center max-w-2xl px-4">
              <h3 className="font-display text-xl sm:text-3xl uppercase text-white mb-2">
                {activeMedia.title}
              </h3>
              {activeMedia.desc && (
                <p className="font-sans text-muted text-xs sm:text-sm">
                  {activeMedia.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SCROLL TO TOP BUTTON */}
      <button 
        onClick={() => scrollTo('home')}
        className={`hidden sm:flex fixed bottom-6 right-6 z-40 p-3.5 bg-card/90 backdrop-blur border border-border-subtle hover:border-blue transition-all duration-300 rounded text-white ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-blue" />
      </button>

    </main>
  );
}
