import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Code, Smartphone, Layout, Cloud, Database, Monitor, Server, Globe, Cpu, Brain, Sparkles, Bot, Shield, Terminal } from 'lucide-react';
import API_URL from '../../config';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newService, setNewService] = useState({ title: '', description: '', icon: 'Code' });

    const [editingId, setEditingId] = useState(null);

    const ICONS = ['Code', 'Smartphone', 'Layout', 'Cloud', 'Database', 'Monitor', 'Server', 'Globe', 'Cpu', 'Brain', 'Sparkles', 'Bot', 'Shield', 'Terminal'];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch(`${API_URL}/api/services`);
            const data = await res.json();
            if (Array.isArray(data)) setServices(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await fetch(`${API_URL}/api/services/${id}`, { method: 'DELETE' });
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (service) => {
        setNewService({ title: service.title, description: service.description, icon: service.icon });
        setEditingId(service.id);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId ? `${API_URL}/api/services/${editingId}` : `${API_URL}/api/services`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService)
            });
            if (res.ok) {
                setNewService({ title: '', description: '', icon: 'Code' });
                setEditingId(null);
                setShowForm(false);
                fetchServices();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const renderIcon = (iconName, size = 24) => {
        const iconMap = {
            'Code': <Code size={size} />,
            'Smartphone': <Smartphone size={size} />,
            'Layout': <Layout size={size} />,
            'Cloud': <Cloud size={size} />,
            'Database': <Database size={size} />,
            'Monitor': <Monitor size={size} />,
            'Server': <Server size={size} />,
            'Globe': <Globe size={size} />,
            'Cpu': <Cpu size={size} />,
            'Brain': <Brain size={size} />,
            'Sparkles': <Sparkles size={size} />,
            'Bot': <Bot size={size} />,
            'Shield': <Shield size={size} />,
            'Terminal': <Terminal size={size} />
        };
        return iconMap[iconName] || <Code size={size} />;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Services <span className="text-blue-600">Hub</span></h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your core offerings</p>
                </div>
                <button
                    onClick={() => { setShowForm(!showForm); if (showForm) setEditingId(null); }}
                    className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                >
                    <Plus size={18} /> {showForm ? 'Cancel' : 'Add Service'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                    <div className="grid gap-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Web Development"
                                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold"
                                    value={newService.title}
                                    onChange={e => setNewService({ ...newService, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Icon</label>
                                <select
                                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold uppercase cursor-pointer"
                                    value={newService.icon}
                                    onChange={e => setNewService({ ...newService, icon: e.target.value })}
                                >
                                    {ICONS.map(icon => <option key={icon} value={icon} className="bg-white text-slate-900">{icon}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                            <textarea
                                placeholder="Describe this service..."
                                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium h-32 resize-none"
                                value={newService.description}
                                onChange={e => setNewService({ ...newService, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end pt-2">
                            <button type="submit" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
                                {editingId ? 'Update Module' : 'Initialize Module'}
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {services.map(service => (
                    <div key={service.id} className="flex justify-between items-center p-8 bg-white border border-slate-200 rounded-[2.5rem] group hover:shadow-lg transition-all shadow-sm">
                        <div className="flex items-center gap-8">
                            <div className="w-20 h-20 bg-slate-50 rounded-[1.8rem] flex items-center justify-center text-blue-600 border border-slate-100 group-hover:border-blue-500/30 transition-all shadow-inner">
                                {renderIcon(service.icon, 28)}
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900 mb-1 uppercase tracking-tight">{service.title}</h3>
                                <p className="text-slate-400 text-sm font-medium max-w-xl line-clamp-1">{service.description}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleEdit(service)}
                                className="px-6 py-3 text-slate-400 hover:text-blue-600 font-bold uppercase tracking-widest text-[10px] bg-slate-50 rounded-xl border border-slate-100 transition-all"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="p-3 text-slate-300 hover:text-red-500 bg-slate-50 rounded-xl border border-slate-100 transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
                {services.length === 0 && !loading && <p className="text-center text-slate-300 font-bold uppercase tracking-widest py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">No Modules Detected</p>}
            </div>
        </div>
    );
};

export default AdminServices;
