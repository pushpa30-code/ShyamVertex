import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Code, Smartphone, Layout, Cloud, Database, Monitor, Server, Globe, Cpu } from 'lucide-react';
import API_URL from '../../config';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newService, setNewService] = useState({ title: '', description: '', icon: 'Code' });

    const ICONS = ['Code', 'Smartphone', 'Layout', 'Cloud', 'Database', 'Monitor', 'Server', 'Globe', 'Cpu'];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService)
            });
            if (res.ok) {
                setNewService({ title: '', description: '', icon: 'Code' });
                setShowForm(false);
                fetchServices();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage Services</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                    <Plus size={18} /> Add Service
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid gap-4">
                        <input
                            type="text"
                            placeholder="Service Title"
                            className="w-full p-2 border rounded"
                            value={newService.title}
                            onChange={e => setNewService({ ...newService, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full p-2 border rounded"
                            value={newService.description}
                            onChange={e => setNewService({ ...newService, description: e.target.value })}
                            required
                        />
                        <select
                            className="w-full p-2 border rounded"
                            value={newService.icon}
                            onChange={e => setNewService({ ...newService, icon: e.target.value })}
                        >
                            {ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">Save Service</button>
                        </div>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {services.map(service => (
                    <div key={service.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div>
                            <h3 className="font-bold text-lg">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">Icon: {service.icon}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(service.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
                {services.length === 0 && !loading && <p className="text-center text-gray-500">No services found.</p>}
            </div>
        </div>
    );
};

export default AdminServices;
