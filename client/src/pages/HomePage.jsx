import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Services from '../components/Services';
import About from '../components/About';
import Careers from '../components/Careers';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

const HomePage = () => {
    return (
        <div className="w-full">
            {/* Placeholder for sections until they are created */}
            <Hero />
            <Partners />
            <About />
            <Services />
            <Careers />
            <Testimonials />
            <Blog />
            <FAQ />
            <Contact />
        </div>
    );
};

export default HomePage;
