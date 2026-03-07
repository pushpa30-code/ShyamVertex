import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import API_URL from '../../config';

const AdminJobs = () => {
    const [jobStatuses, setJobStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        fetch(`${API_URL}/api/jobs`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setJobStatuses(data);
                } else {
                    console.error('API Error:', data);
                    setJobStatuses([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching jobs:', err);
                setLoading(false);
            });
    };

    const toggleStatus = (role_id, currentStatus) => {
        const newStatus = !currentStatus;

        // Optimistic update
        setJobStatuses(prev => prev.map(job =>
            job.role_id === role_id ? { ...job, is_hiring: newStatus } : job
        ));

        fetch(`${API_URL}/api/jobs/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role_id, is_hiring: newStatus })
        })
            .then(res => res.json())
            .then(data => {
                // success
            })
            .catch(err => {
                console.error('Error updating status:', err);
                // Revert on error
                fetchJobs();
            });
    };

    if (loading) return <div className="text-center py-8">Loading jobs...</div>;

    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-tight">Hiring Console</h2>
            <div className="space-y-4">
                {jobStatuses.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No job roles found</p>
                    </div>
                ) : (
                    jobStatuses.map((job) => (
                        <div key={job.role_id} className="flex flex-col sm:flex-row items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 hover:border-blue-500/30 transition-all duration-300 gap-6">
                            <div className="text-center sm:text-left">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{job.label}</h3>
                                <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${job.is_hiring ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-slate-200 text-slate-400 border border-slate-300'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${job.is_hiring ? 'bg-blue-600 animate-pulse' : 'bg-slate-400'}`}></span>
                                    {job.is_hiring ? 'Recruitment Active' : 'Recruitment Paused'}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={job.is_hiring}
                                        onChange={() => toggleStatus(job.role_id, job.is_hiring)}
                                    />
                                    <div className={`w-16 h-8 rounded-full transition-all duration-300 ${job.is_hiring ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                                    <div className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-xl transition-all duration-300 ${job.is_hiring ? 'translate-x-8 scale-90' : 'scale-75'}`}>
                                        <div className={`w-2 h-2 rounded-full ${job.is_hiring ? 'bg-blue-600' : 'bg-slate-400'}`}></div>
                                    </div>
                                    <span className="ml-4 text-xs font-black uppercase tracking-widest text-slate-400 sm:hidden">
                                        {job.is_hiring ? 'Active' : 'Paused'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-10 p-6 bg-blue-50 rounded-2xl text-xs text-blue-700 border border-blue-100 font-bold uppercase tracking-widest flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <span>Changes are pushed to live production immediately.</span>
            </div>
        </div>
    );
};

export default AdminJobs;
