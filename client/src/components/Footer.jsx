import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../config';

const Footer = () => {
    const canvasRef = React.useRef(null);
    const [contact, setContact] = React.useState({
        email: 'support@shyamvertex.com',
        phone_1: '+91 87993-03431',
        phone_2: '+91 91364-62029',
        address: 'Vadodara, Gujarat-390019',
        instagram: 'https://www.instagram.com/shyamvertex_',
        linkedin: 'https://www.linkedin.com/in/shyam-vertex-750b473b0'
    });

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 500;
        };

        const draw = (time) => {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // 1. Grid Scanning Effect
            ctx.strokeStyle = 'rgba(0, 100, 255, 0.05)';
            ctx.lineWidth = 1;

            // Horizontal lines
            for (let i = 0; i < canvas.height; i += 40) {
                const offset = (time / 50 + i) % canvas.height;
                ctx.beginPath();
                ctx.moveTo(0, offset);
                ctx.lineTo(canvas.width, offset);
                ctx.stroke();
            }

            // Vertical lines
            for (let i = 0; i < canvas.width; i += 80) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }

            // 2. Data Flow/Circuit Pulses
            const pulseCount = 8;
            for (let i = 0; i < pulseCount; i++) {
                const angle = (time / 2000 + (i * Math.PI * 2) / pulseCount) % (Math.PI * 2);
                const radius = 150 + Math.sin(time / 500) * 20;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                const grad = ctx.createRadialGradient(x, y, 0, x, y, 40);
                grad.addColorStop(0, 'rgba(0, 150, 255, 0.15)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, 40, 0, Math.PI * 2);
                ctx.fill();

                // Small core point
                ctx.fillStyle = 'rgba(0, 200, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. Central "Neural Core" Pulse
            const coreRadius = 80 + Math.sin(time / 300) * 10;
            const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 2);
            coreGrad.addColorStop(0, 'rgba(0, 80, 255, 0.1)');
            coreGrad.addColorStop(0.5, 'rgba(0, 40, 255, 0.05)');
            coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Circular "Scanning" Rings
            ctx.lineWidth = 1;
            for (let i = 1; i <= 3; i++) {
                const ringRadius = (coreRadius * i * 0.8 + time / 10) % 300;
                const ringOpacity = 1 - (ringRadius / 300);
                ctx.strokeStyle = `rgba(0, 150, 255, ${ringOpacity * 0.15})`;
                ctx.beginPath();
                ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw(0);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    React.useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch(`${API_URL}/api/contact-info`);
                const data = await res.json();
                if (data && data.email) {
                    setContact(prev => ({ ...prev, ...data }));
                }
            } catch (err) {
                console.error('Error fetching contact:', err);
            }
        };
        fetchContact();
    }, []);

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <footer className="relative bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/5 min-h-[500px]">
            {/* Robot/Tech Animation Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none opacity-60"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-12"
                >
                    {/* Company Info */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                            Shyam<span className="text-primary">Vertex</span>
                        </h3>
                        <p className="text-white/60 mb-6 font-normal leading-relaxed text-sm">
                            Go Vertex, <span className="text-primary font-medium">Go Beyond</span>. Delivering cutting-edge IT solutions for a digital world.
                        </p>
                        <div className="flex space-x-5">
                            <motion.a
                                whileHover={{ scale: 1.1, color: "#FFD000" }}
                                href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1, color: "#FFD000" }}
                                href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Services', 'Careers', 'Help', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <a href={link === 'Home' ? '/' : link === 'Careers' ? '/career' : `#${link.toLowerCase().replace(' ', '')}`} className="text-white/50 hover:text-primary transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Services</h4>
                        <ul className="space-y-3 text-sm text-white/50">
                            {['UI/UX Design', 'Web Development', 'App Development', 'Cloud Services', 'IT Consultancy'].map((service) => (
                                <li key={service} className="hover:text-white transition-colors cursor-default">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Contact Us</h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex items-start">
                                <Mail className="h-4 w-4 text-primary mr-3 mt-1" />
                                <a href={`mailto:${contact.email}`} className="text-white/50 hover:text-white transition-colors">
                                    {contact.email}
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="h-4 w-4 text-primary mr-3 mt-1" />
                                <span className="text-white/50 flex flex-col gap-1">
                                    <a href={`tel:${contact.phone_1}`} className="hover:text-white transition-colors">{contact.phone_1}</a>
                                    {contact.phone_2 && <a href={`tel:${contact.phone_2}`} className="hover:text-white transition-colors">{contact.phone_2}</a>}
                                </span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="h-4 w-4 text-primary mr-3 mt-1" />
                                <span className="text-white/50 leading-tight">
                                    {contact.address}
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="border-t border-white/10 mt-16 pt-8 text-center flex flex-col items-center justify-center gap-2"
                >
                    <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <p>Systems Online & Operational</p>
                    </div>
                    <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Shyam Vertex Pvt Ltd. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
