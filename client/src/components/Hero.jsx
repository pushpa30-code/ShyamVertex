import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import handshakeImg from '../images/handshake.jpeg';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center bg-[#f0fdfa] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="w-full h-full"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 1, -1, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                    }}
                >
                    <img
                        src={handshakeImg}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                        <motion.span
                            className="text-secondary drop-shadow-md inline-block"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            ShyamVertex
                        </motion.span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-4xl font-light mb-8 text-gray-200"
                    >
                        Go Vertex, <span className="text-secondary font-medium">Go Beyond</span>
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-base md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Empowering businesses with cutting-edge IT solutions, from UI/UX design to cloud infrastructure.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05, backgroundColor: "#fcd34d", color: "#115e59" }}
                            href="#contact"
                            className="px-6 py-3 md:px-8 md:py-4 bg-secondary text-primary font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 text-sm md:text-base"
                        >
                            Get Started <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(252, 211, 77, 0.1)" }}
                            href="#services"
                            className="px-6 py-3 md:px-8 md:py-4 border border-secondary/50 text-secondary font-semibold rounded-full hover:bg-secondary/10 transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
                        >
                            Explore Services
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
