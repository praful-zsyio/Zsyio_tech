import React, { useRef } from 'react'
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
const comp = useRef(null);

useGSAP(() => {
    let ctx = gsap.context(() => {
    const t1 = gsap.timeline({
        delay:0.5
    });
    t1.from(["#hero-title", "#hero-subtitle"], {
        opacity: 0,
        y: 30,
        stagger: 0.3,
        delay: 0.2
    });
    t1.from(".hero-button", {
        opacity: 0,
        y: 30,
        stagger: 0.3,
    })
    }, comp);

    return () => ctx.revert();
}, []);

  return (
      <div className='flex grow items-center justify-center text-white' ref={comp}>
        <div id="welcome" className='w-full flex flex-col justify-center text-center text-base p-8'>
          <h1 id="hero-title" className='md:text-6xl text-xl font-serif font-bold text-text' style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Igniting Innovations on Websites, Apps and Softwares Built for Tomorrow
          </h1>
          <h2 id="hero-subtitle" className='md:text-3xl text-lg font-serif mt-4 text-subtext1' style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            Transforming Your Ideas into Intelligent, Market-Leading Solutions.
          </h2>
          {/* Buttons now stack on mobile and are side-by-side on larger screens */}
          <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mt-8 hero-button'>
            <Link to="/contact" className='btn cursor-pointer bg-blue text-base px-6 py-3 rounded-xl text-lg font-semibold shadow-soft hover:bg-white/20 border transform hover:scale-105 transition-all duration-300'>
              Get Started
            </Link>
            <Link to="/projects" className='btn cursor-pointer bg-blue text-base px-6 py-3 rounded-xl font-semibold shadow-soft hover:bg-white/20 border transform hover:scale-105 transition-all duration-300'>
              Our Work
            </Link>
          </div>
        </div>
      </div>
  )
}

export default HeroSection