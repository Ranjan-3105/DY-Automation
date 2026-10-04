"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, ArrowRight, ChevronUp, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP Animations
    const tl = gsap.timeline();
    
    tl.to(".hero-image", {
      scale: 1,
      duration: 2,
      ease: "power3.out",
    }, 0)
    .fromTo(".hero-label", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5)
    .fromTo(".hero-heading .line",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }, 0.7)
    .fromTo(".hero-subtext",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 1.2)
    .fromTo(".hero-buttons",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 1.4);

    // Cursor Follower for Services
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

  const services = [
    {
      num: "01",
      title: "INDUSTRIAL AUTOMATION",
      desc: "Machines and processes moved from manual sequence to automated control.",
      image: "/assets/images/robotics.png"
    },
    {
      num: "02",
      title: "ELECTRICAL SOLUTIONS",
      desc: "Power distribution and control wiring engineered for safety and uptime.",
      image: "/assets/images/electrical.png"
    },
    {
      num: "03",
      title: "PLC & SCADA SYSTEMS",
      desc: "Programmable control and supervisory visibility, from panel to screen.",
      image: "/assets/images/monitoring.png"
    },
    {
      num: "04",
      title: "INSTALLATION & COMMISSIONING",
      desc: "Engineers on site, from first fixing to full handover.",
      image: "/assets/images/engineer.png"
    },
    {
      num: "05",
      title: "MAINTENANCE & SUPPORT",
      desc: "Support that keeps the line running long after handover.",
      image: "/assets/images/hero.png"
    }
  ];

  const projects = [
    {
      num: "01",
      cat: "INDUSTRIAL AUTOMATION",
      title: "AUTOMATED PRODUCTION LINE",
      img: "/assets/images/robotics.png"
    },
    {
      num: "02",
      cat: "ELECTRICAL SYSTEMS",
      title: "CONTROL & DISTRIBUTION",
      img: "/assets/images/electrical.png"
    },
    {
      num: "03",
      cat: "CONTROL SYSTEMS",
      title: "INDUSTRIAL MONITORING",
      img: "/assets/images/monitoring.png"
    }
  ];

  return (
    <main className="relative min-h-screen">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'glass-nav h-[74px] translate-y-0 opacity-100' : 'h-[100px] bg-transparent lg:-translate-y-full lg:opacity-0 lg:pointer-events-none'}`}>
        <div className="container mx-auto px-6 md:px-[5vw] h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-wider leading-none">DY AUTOMATION</span>
              <span className="font-mono text-[7px] sm:text-[9px] text-muted tracking-widest mt-1 whitespace-nowrap">AUTOMATION • ELECTRICAL • INDUSTRIAL</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 font-mono text-[10px] xl:text-[11px] tracking-[0.2em] mx-auto">
            <button onClick={() => scrollTo('home')} className="hover:text-blue transition-colors relative group">
              HOME
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-[40px]"></span>
            </button>
            <button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors relative group">
              SERVICES
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-[40px]"></span>
            </button>
            <button onClick={() => scrollTo('projects')} className="hover:text-blue transition-colors relative group">
              PROJECTS
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-[40px]"></span>
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-blue transition-colors relative group">
              CONTACT
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-[40px]"></span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a href="tel:7735211087" className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] hover:text-blue transition-colors">
              <Phone className="w-3.5 h-3.5" />
              7735211087
            </a>
            <a href="https://wa.me/917735211087?text=Hello%20DY%20Automation,%20I%20would%20like%20to%20discuss%20an%20automation/electrical%20project." target="_blank" rel="noopener noreferrer" className="border border-border-subtle px-5 py-2.5 font-mono text-[10px] tracking-[0.25em] hover:border-border-blue transition-colors uppercase">
              WhatsApp
            </a>
            <button onClick={() => scrollTo('contact')} className="bg-blue hover:bg-blue-bright text-white px-7 py-2.5 font-mono text-[10px] tracking-[0.25em] transition-colors uppercase">
              ENQUIRE
            </button>
          </div>

          <button className="lg:hidden text-white p-2 relative z-50 pointer-events-auto cursor-pointer" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div 
        className="fixed inset-0 z-[100] bg-primary flex flex-col justify-center items-center transition-all duration-300"
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          visibility: mobileMenuOpen ? 'visible' : 'hidden'
        }}
      >
        <button className="absolute top-8 right-6 text-white p-4" onClick={() => setMobileMenuOpen(false)}>
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col items-center gap-8 font-display text-3xl sm:text-4xl tracking-wider">
          <button onClick={() => scrollTo('home')} className="hover:text-blue transition-colors">HOME</button>
          <button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors">SERVICES</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-blue transition-colors">PROJECTS</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-blue transition-colors">CONTACT</button>
        </div>
        <div className="mt-12 flex flex-col items-center gap-6 font-mono text-sm tracking-widest">
          <a href="tel:7735211087" className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> CALL 7735211087
          </a>
          <a href="https://wa.me/917735211087?text=Hello%20DY%20Automation,%20I%20would%20like%20to%20discuss%20an%20automation/electrical%20project." className="border border-border-subtle px-6 py-3 uppercase">WHATSAPP</a>
          <button onClick={() => scrollTo('contact')} className="bg-blue text-white px-6 py-3 uppercase">ENQUIRE</button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative w-full min-h-screen flex items-center" ref={heroRef}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src="/assets/images/hero.png" 
            alt="Industrial Automation" 
            fill 
            className="object-cover hero-image scale-105"
            priority
          />
          <div className="absolute inset-0 bg-navy/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 md:px-[5vw] relative z-10 py-32 flex flex-col justify-center">
          <div className="hero-label font-mono text-xs md:text-sm tracking-widest text-blue mb-8 flex items-center gap-3 uppercase">
            <span className="w-2 h-2 bg-blue rotate-45 inline-block"></span>
            DY AUTOMATION — BHUBANESWAR, ODISHA
          </div>
          
          <h1 className="hero-heading font-display text-[52px] md:text-[90px] lg:text-[130px] leading-[0.9] tracking-normal uppercase mb-8">
            <div className="line overflow-hidden"><span className="block text-white">SMARTER AUTOMATION</span></div>
            <div className="line overflow-hidden"><span className="block text-white">FOR A <span className="text-stroke-subtle">BETTER</span></span></div>
            <div className="line overflow-hidden flex items-end"><span className="block text-white">TOMORROW<span className="text-blue">.</span></span></div>
          </h1>

          <p className="hero-subtext font-sans text-muted text-base md:text-xl max-w-[650px] mb-12">
            Automation · Electrical · Industrial Solutions — one engineer-led team from the control panel to the plant floor.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row flex-wrap gap-4 font-mono text-xs md:text-sm tracking-widest uppercase">
            <button onClick={() => scrollTo('contact')} className="w-full sm:w-auto bg-blue hover:bg-blue-bright text-white px-8 py-4 transition-colors flex items-center justify-center gap-2 group">
              START AN ENQUIRY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="tel:7735211087" className="w-full sm:w-auto border border-border-subtle hover:border-border-blue px-8 py-4 transition-colors flex items-center justify-center gap-2">
              CALL 7735211087
            </a>
          </div>
        </div>
      </section>

      {/* SERVICE MARQUEE */}
      <div className="border-y border-border-subtle py-4 overflow-hidden flex bg-primary">
        <div className="flex animate-marquee whitespace-nowrap font-mono text-[10px] sm:text-xs md:text-sm tracking-widest uppercase text-muted hover:[animation-play-state:paused] w-max">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-6 text-blue text-[8px]">◆</span> PLC / SCADA SYSTEMS
              <span className="mx-6 text-blue text-[8px]">◆</span> HT-LT DISTRIBUTION
              <span className="mx-6 text-blue text-[8px]">◆</span> INSTALLATION & COMMISSIONING
              <span className="mx-6 text-blue text-[8px]">◆</span> MAINTENANCE & SUPPORT
              <span className="mx-6 text-blue text-[8px]">◆</span> INDUSTRIAL AUTOMATION
              <span className="mx-6 text-blue text-[8px]">◆</span> ELECTRICAL SOLUTIONS
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOM CURSOR FOLLOWER FOR SERVICES */}
      <div 
        ref={cursorImgRef} 
        className="fixed top-0 left-0 w-[300px] h-[400px] z-50 pointer-events-none overflow-hidden transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 border border-border-subtle mix-blend-screen hidden lg:block"
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
      <section id="services" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-[5vw]">
          <div className="font-mono text-xs tracking-widest text-blue mb-12 flex items-center gap-3 uppercase">
            <span className="w-2 h-2 bg-blue rotate-45 inline-block"></span>
            SEC. 01 — WHAT WE DO
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className={`group relative bg-card hover:bg-card-light border border-border-subtle hover:border-border-blue transition-all duration-500 p-8 flex flex-col cursor-pointer ${idx === 0 ? 'row-span-2 md:col-span-2 p-0 overflow-hidden' : ''}`}
                onMouseEnter={() => idx !== 0 && setHoveredServiceIdx(idx)}
                onMouseLeave={() => idx !== 0 && setHoveredServiceIdx(null)}
              >
                {idx === 0 ? (
                  <>
                    <div className="relative h-[60%] w-full overflow-hidden">
                      <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors"></div>
                    </div>
                    <div className="p-8 h-[40%] flex flex-col justify-end">
                      <div className="absolute top-8 right-8 font-mono text-xs text-blue">[{service.num}]</div>
                      <h3 className="font-display text-3xl md:text-5xl uppercase mb-4 transition-transform duration-500 group-hover:translate-x-2">{service.title}</h3>
                      <p className="text-muted font-sans">{service.desc}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-8 right-8 font-mono text-xs text-blue group-hover:text-white transition-colors duration-300">[{service.num}]</div>
                    <div className="mt-auto">
                      <h3 className="font-display text-2xl uppercase mb-3 transition-transform duration-500 group-hover:translate-x-2">{service.title}</h3>
                      <p className="text-muted font-sans text-sm group-hover:text-white transition-colors duration-300 relative z-10">{service.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DY SECTION */}
      <section className="py-24 md:py-32 bg-secondary border-t border-border-subtle">
        <div className="container mx-auto px-6 md:px-[5vw]">
          <div className="font-mono text-xs tracking-widest text-blue mb-16 flex items-center gap-3 uppercase">
            <span className="w-2 h-2 bg-blue rotate-45 inline-block"></span>
            SEC. 02 — WHY DY
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-xl md:text-3xl font-sans leading-relaxed mb-12">
                One accountable partner for the whole electrical and automation scope — from the first survey to the maintenance round that follows a year later.
              </p>
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-border-subtle">
                <Image 
                  src="/assets/images/engineer.png" 
                  alt="Engineer working" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-blue/10 mix-blend-overlay"></div>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              {[
                {
                  num: "01",
                  title: "TURNKEY, UNDER ONE ROOF",
                  desc: "Automation, electrical, PLC & SCADA, installation and maintenance — five verticals, one contract, one team that owns the outcome end to end."
                },
                {
                  num: "02",
                  title: "LOCAL TO ODISHA INDUSTRY",
                  desc: "Based at Rasulgarh, Bhubaneswar, our crews reach plant sites across the state fast — and stay reachable long after commissioning."
                },
                {
                  num: "03",
                  title: "ENGINEER-LED DELIVERY",
                  desc: "The people who program the PLC are on site for the loop check. No hand-off between sales team and site team."
                }
              ].map((feature, idx) => (
                <div key={idx} className="border-b border-border-subtle pb-12 last:border-0">
                  <div className="font-mono text-sm text-blue mb-4 tracking-widest">{feature.num} //</div>
                  <h3 className="font-display text-3xl uppercase mb-4">{feature.title}</h3>
                  <p className="text-muted leading-relaxed font-sans">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-[5vw]">
          <div className="flex justify-between items-end mb-24 md:mb-40">
            <div className="font-mono text-xs tracking-widest text-blue flex items-center gap-3 uppercase">
              <span className="w-2 h-2 bg-blue rotate-45 inline-block"></span>
              SEC. 03 — WORK IN THE FIELD
            </div>
            <button className="font-mono text-xs tracking-widest uppercase hover:text-blue transition-colors flex items-center gap-2">
              ALL PROJECTS <ArrowRight className="w-4 h-4 -rotate-45" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="group relative aspect-[4/5] border border-border-subtle overflow-hidden cursor-pointer bg-card">
                <Image 
                  src={project.img} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/70 transition-colors duration-500"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="font-mono text-sm text-blue">[{project.num}]</div>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-muted mb-2 uppercase">{project.cat}</div>
                    <h3 className="font-display text-2xl uppercase leading-tight">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION & CONTACT FORM */}
      <section id="contact" className="py-32 md:py-48 border-t border-border-subtle relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-[5vw] relative z-10 text-center max-w-4xl">
          <div className="font-mono text-sm tracking-widest text-blue mb-16 uppercase">YOUR AUTOMATION PARTNER</div>
          
          <form className="mt-16 mb-24 max-w-2xl mx-auto text-left grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-8 md:p-12 border border-border-subtle relative group" onSubmit={(e) => { e.preventDefault(); alert("Enquiry Sent Successfully"); }}>
            <div className="absolute inset-0 border border-blue opacity-0 group-focus-within:opacity-30 transition-opacity pointer-events-none"></div>
            
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-display text-3xl uppercase mb-8">Start an Enquiry</h3>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Name *</label>
              <input required type="text" className="bg-primary border border-border-subtle px-4 py-3 font-sans text-sm focus:outline-none focus:border-border-blue transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Company</label>
              <input type="text" className="bg-primary border border-border-subtle px-4 py-3 font-sans text-sm focus:outline-none focus:border-border-blue transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Phone *</label>
              <input required type="tel" className="bg-primary border border-border-subtle px-4 py-3 font-sans text-sm focus:outline-none focus:border-border-blue transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Service Required *</label>
              <select required className="bg-primary border border-border-subtle px-4 py-3 font-sans text-sm focus:outline-none focus:border-border-blue transition-colors text-white">
                <option value="">Select Service...</option>
                <option value="Industrial Automation">Industrial Automation</option>
                <option value="Electrical Solutions">Electrical Solutions</option>
                <option value="PLC & SCADA">PLC & SCADA Systems</option>
                <option value="Installation">Installation & Commissioning</option>
                <option value="Maintenance">Maintenance & Support</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Project Details</label>
              <textarea rows={4} className="bg-primary border border-border-subtle px-4 py-3 font-sans text-sm focus:outline-none focus:border-border-blue transition-colors resize-none"></textarea>
            </div>
            <div className="col-span-1 md:col-span-2 mt-4">
              <button type="submit" className="w-full bg-blue hover:bg-blue-bright text-white px-8 py-4 font-mono text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 group">
                SEND ENQUIRY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-sm tracking-widest uppercase mt-12">
            <a href="tel:7735211087" className="border border-border-subtle hover:border-border-blue px-8 py-4 transition-colors flex items-center gap-3">
              <Phone className="w-4 h-4" /> 7735211087
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary pt-24 border-t border-border-subtle overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-display text-2xl tracking-wider leading-none block">DY AUTOMATION</span>
                <span className="font-mono text-[10px] text-muted tracking-widest mt-2 block">AUTOMATION • ELECTRICAL • INDUSTRIAL</span>
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-sm mt-4">
                Automation · Electrical · Industrial Solutions. Smarter automation for a better tomorrow — engineered from Rasulgarh, Bhubaneswar for plants across Odisha.
              </p>
              <div className="font-mono text-xs tracking-widest text-blue mt-8 uppercase">— YOUR AUTOMATION PARTNER —</div>
            </div>

            <div>
              <h4 className="font-mono text-xs tracking-widest text-muted mb-8 uppercase">SERVICES</h4>
              <ul className="flex flex-col gap-4 font-sans text-sm">
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors flex items-center gap-1 group">Industrial Automation <ArrowRight className="w-3 h-3 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors">Electrical Solutions</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors">PLC & SCADA Systems</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors">Installation & Commissioning</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-blue transition-colors">Maintenance & Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs tracking-widest text-muted mb-8 uppercase">CONTACT</h4>
              <ul className="flex flex-col gap-4 font-sans text-sm">
                <li><a href="tel:7735211087" className="hover:text-blue transition-colors block">7735211087</a></li>
                <li><a href="tel:8983111087" className="hover:text-blue transition-colors block">8983111087</a></li>
                <li><a href="https://wa.me/917735211087" target="_blank" rel="noopener noreferrer" className="hover:text-blue transition-colors block mt-2 text-blue">Chat on WhatsApp</a></li>
                <li className="mt-6 text-muted max-w-[200px] leading-relaxed">
                  Rasulgarh, Esplanade, 6th Floor,<br/>
                  Bhubaneswar, Odisha – 751010
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full relative h-[14vw] min-h-[80px] flex items-end justify-center overflow-hidden pointer-events-none mb-4">
          <div className="font-display text-[13.5vw] leading-[0.75] text-transparent whitespace-nowrap opacity-20 pointer-events-none select-none w-full text-center tracking-tight" style={{ WebkitTextStroke: '1px var(--color-text-secondary)' }}>
            DY AUTOMATION
          </div>
        </div>

        <div className="border-t border-border-subtle">
          <div className="container mx-auto px-6 md:px-[5vw] py-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-widest text-muted uppercase">
            <div>© 2026 DY AUTOMATION</div>
            <div className="text-center">AUTOMATION · ELECTRICAL · INDUSTRIAL SOLUTIONS</div>
            <div>BHUBANESWAR, ODISHA — 751010</div>
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <button 
        onClick={() => scrollTo('home')}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-primary/80 backdrop-blur border border-border-subtle hover:border-blue transition-all duration-300 text-white ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

    </main>
  );
}
