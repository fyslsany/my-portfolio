
import React, { useState, useEffect } from 'react';
import type { Testimonial } from '../types';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Jane Doe',
    company: 'CEO, QuantumLeap Inc.',
    avatarUrl: 'https://picsum.photos/seed/jane/100/100',
    quote: "Faysal's vision for our brand was transformative. He didn't just design a logo; he built an entire visual universe for us. Exceptional talent.",
    project: {
        title: "QuantumLeap Rebrand",
        role: "Lead Brand Strategist",
        transformation: "From a generic tech look to a futuristic, memorable brand identity that increased market recognition by 40%."
    }
  },
  {
    id: 2,
    name: 'John Smith',
    company: 'Founder, Nova Financial',
    avatarUrl: 'https://picsum.photos/seed/john/100/100',
    quote: 'The UI/UX for our new fintech app is breathtaking. Faysal combined stunning aesthetics with flawless usability. Our user engagement is through the roof.',
     project: {
        title: "Nova Financial App UI/UX",
        role: "Lead UI/UX Designer",
        transformation: "Developed an intuitive, neo-glassmorphism interface that reduced user onboarding time by 60% and increased daily active users."
    }
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, [current]);

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Client Spotlight</h2>
          <p className="text-lg text-gray-400 mt-2">Building partnerships through powerful design.</p>
           <div className="mt-4 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="relative glassmorphic rounded-xl border border-white/10 p-8 md:p-12 min-h-[450px]">
          <button onClick={prevSlide} className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-slate-800 p-2 rounded-full text-white hover:bg-purple-500 transition-colors z-20">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-slate-800 p-2 rounded-full text-white hover:bg-purple-500 transition-colors z-20">
            <ChevronRight size={24} />
          </button>
          
          <div key={testimonial.id} className="animate-fade-in">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center md:text-left md:w-2/3">
                    <Quote className="text-purple-400 w-12 h-12 mb-4 opacity-50"/>
                    <p className="text-xl lg:text-2xl italic text-gray-200">"{testimonial.quote}"</p>
                    <div className="mt-6 flex items-center justify-center md:justify-start">
                        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-purple-400" />
                        <div className="ml-4">
                            <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                            <p className="text-gray-400">{testimonial.company}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 mt-8 md:mt-0 p-6 bg-slate-900/50 rounded-lg border border-white/10">
                    <h5 className="font-bold text-cyan-400 text-lg">{testimonial.project.title}</h5>
                    <p className="mt-2 text-sm"><span className="font-semibold text-gray-300">Role:</span> {testimonial.project.role}</p>
                    <p className="mt-2 text-sm"><span className="font-semibold text-gray-300">Transformation:</span> {testimonial.project.transformation}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
