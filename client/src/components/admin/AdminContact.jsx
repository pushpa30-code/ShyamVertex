import React, { useState, useEffect } from 'react';
import { Save, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../../config';

const AdminContact = () => {
    const [contact, setContact] = useState({
        email: '',
        phone_1: '',
        phone_2: '',
        address: '',
        instagram: '',
        linkedin: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const fetchContactInfo = async () => {
        try {
            const res = await fetch(`${API_URL}/api/contact-info`);
            const data = await res.json();
            setContact(prev => ({ ...prev, ...data }));
        } catch (err) {
            console.error('Error fetching contact info:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setStatus('');
        try {
            const res = await fetch(`${API_URL}/api/contact-info`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
            if (res.ok) {
                setStatus('Settings saved successfully');
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Error saving settings');
            }
        } catch (err) {
            console.error('Error saving contact info:', err);
            setStatus('Connection error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex justify-between items-center">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Contact <span className="text-blue-600">Settings</span></h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update global contact information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8 p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                        <input
                            type="email"
                            className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold"
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number 1</label>
                        <input
                            type="text"
                            className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold"
                            value={contact.phone_1}
                            onChange={(e) => setContact({ ...contact, phone_1: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number 2</label>
                        <input
                            type="text"
                            className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold"
                            value={contact.phone_2}
                            onChange={(e) => setContact({ ...contact, phone_2: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3 col-span-full">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Office Address</label>
                        <textarea
                            className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium h-24 resize-none"
                            value={contact.address}
                            onChange={(e) => setContact({ ...contact, address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instagram Profile</label>
                        <input
                            type="text"
                            className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold"
                            value={contact.instagram}
                            onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">LinkedIn Profile</label>
                        <input
                            type="text"
                            className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold"
                            value={contact.linkedin}
                            onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                    <p className="text-xs font-black text-blue-700 px-4 uppercase tracking-widest">{status}</p>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                    >
                        {saving ? 'Syncing...' : 'Save Configuration'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminContact;
