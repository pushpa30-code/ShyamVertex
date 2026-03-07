import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

import handshakeVideo from '../images/Antigravity_Hero_Handshake_Animation.mp4';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
                    style={{
                        willChange: 'transform',
                        filter: 'brightness(0.5) contrast(1.1)'
                    }}
                >
                    <source src={handshakeVideo} type="video/mp4" />
                </video>
                {/* Dark Overlay Layers */}
                <div className="absolute inset-0 bg-dark/40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark"></div>
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-dark to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center relative pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-5xl mx-auto space-y-10"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="inline-block px-6 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm md:text-base font-medium backdrop-blur-md shadow-[0_0_20px_rgba(255,208,0,0.2)]"
                    >
                        <span className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            Future-Ready Digital Infrastructure
                        </span>
                    </motion.div>

                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white leading-[0.8] drop-shadow-2xl uppercase"
                        >
                            Sculpting the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient-x">
                                Digital Era
                            </span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-3xl font-bold text-white max-w-3xl mx-auto leading-tight drop-shadow-xl tracking-tight"
                    >
                        Go Vertex, <span className="text-primary italic">Go Beyond</span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg md:text-xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg mt-4"
                    >
                        We sculpt high-performance digital ecosystems, from avant-garde UI/UX to resilient cloud architectures.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                        <motion.a
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,208,0,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="px-8 py-4 bg-primary text-dark font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-lg group"
                        >
                            Get Started
                            <ArrowRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 208, 0, 0.15)" }}
                            whileTap={{ scale: 0.95 }}
                            href="#services"
                            className="px-8 py-4 border-2 border-slate-400 hover:border-primary text-white font-semibold rounded-full transition-all duration-300 backdrop-blur-md text-lg flex items-center justify-center gap-2"
                        >
                            Explore Services
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
