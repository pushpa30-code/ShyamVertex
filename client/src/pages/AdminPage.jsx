import React, { useState } from 'react';
import { Shield, LogIn, Briefcase, Layers, FileText, Phone } from 'lucide-react';

import AdminJobs from '../components/admin/AdminJobs';
import AdminServices from '../components/admin/AdminServices';
import AdminBlogs from '../components/admin/AdminBlogs';
import AdminContact from '../components/admin/AdminContact';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('jobs');

    // Simple client-side auth for demonstration
    const ADMIN_PASSWORD = "admin";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
                        <p className="text-gray-500">Please enter password to manage website.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-4 h-4" /> Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'jobs': return <AdminJobs />;
            case 'services': return <AdminServices />;
            case 'blogs': return <AdminBlogs />;
            case 'contact': return <AdminContact />;
            default: return <AdminJobs />;
        }
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${activeTab === id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
        >
            <Icon size={18} />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Shield className="w-8 h-8 text-primary mr-3" />
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="ml-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-t-xl shadow-sm border-b border-gray-200 flex overflow-x-auto">
                    <TabButton id="jobs" label="Hiring" icon={Briefcase} />
                    <TabButton id="services" label="Services" icon={Layers} />
                    <TabButton id="blogs" label="Blogs" icon={FileText} />
                    <TabButton id="contact" label="Contact Info" icon={Phone} />
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-b-xl shadow p-6 min-h-[500px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
