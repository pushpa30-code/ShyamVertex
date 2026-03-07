import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MapPin, User, Mail, Phone, Loader2 } from 'lucide-react';
import API_URL from '../config';

const RequestInviteForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(`${API_URL}/api/request-invite`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({ name: '', email: '', phone: '', location: '' });
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic mb-2">
                            Demo <span className="text-primary not-italic">Request</span>
                        </h2>
                        <p className="text-white/40 text-sm font-medium">Experience the future of enterprise operations.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                            <input
                                required
                                type="text"
                                placeholder="FULL NAME"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-bold tracking-wider text-sm"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                            <input
                                required
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-bold tracking-wider text-sm"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                            <input
                                required
                                type="tel"
                                placeholder="MOBILE NUMBER"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-bold tracking-wider text-sm"
                            />
                        </div>

                        <div className="relative">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                            <input
                                required
                                type="text"
                                placeholder="LOCATION (WHERE ARE YOU FROM?)"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-bold tracking-wider text-sm"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-5 bg-primary text-black font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : status === 'success' ? (
                                "ACCESS GRANTED"
                            ) : (
                                <>
                                    Confirm Request <Send size={18} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {status === 'error' && (
                        <p className="text-red-500 text-center text-xs mt-4 font-bold uppercase tracking-widest">
                            Technical failure. Please try again.
                        </p>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RequestInviteForm;
