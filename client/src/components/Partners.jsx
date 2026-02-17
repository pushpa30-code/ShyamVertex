import React from 'react';
import { motion } from 'framer-motion';

// Import images
import ambitiousLogo from '../images/ambitious corporation logo.jpeg';
import axiomLogo from '../images/axiom hitech logo.png';
import badaBuilderLogo from '../images/bada builder logo.jpeg';

const Partners = () => {
    const partners = [
        { name: 'Ambitious Corporation', logo: ambitiousLogo },
        { name: 'Axiom Hitech', logo: axiomLogo },
        { name: 'Bada Builder', logo: badaBuilderLogo },
        { name: 'Gramfs', logo: null },
        { name: 'VVA Infras', logo: null },
    ];

    // Duplicate logic for seamless loop
    const marqueeItems = [...partners, ...partners, ...partners];

    return (
        <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-lg md:text-xl font-medium text-gray-500 tracking-wide">
                    Proudly Collaborating with Industry Leaders
                </p>
            </div>

            <div className="flex relative w-full mask-gradient">
                <motion.div
                    className="flex items-center gap-12 sm:gap-20 whitespace-nowrap"
                    initial={{ x: "-50%" }}
                    animate={{ x: "0%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {marqueeItems.map((partner, index) => (
                        <div
                            key={`${partner.name}-${index}`}
                            className="flex flex-col items-center justify-center min-w-[150px] opacity-80 hover:opacity-100 transition-opacity duration-300"
                        >
                            {partner.logo ? (
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-12 md:h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            ) : (
                                <span className="text-xl md:text-2xl font-bold text-gray-600 font-serif tracking-tight">
                                    {partner.name}
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate for smoother loop if needed, but managing x from -50% to 0% with double/triple content usually works for L->R or R->L depending on start/end */}
            </div>
        </section>
    );
};

export default Partners;
