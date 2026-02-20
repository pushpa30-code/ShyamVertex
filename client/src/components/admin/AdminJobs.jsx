import React, { useState, useEffect } from 'react';
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
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Job Hiring Status</h2>
            <div className="space-y-4">
                {jobStatuses.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-500">No job roles found. Please check your database connection.</p>
                    </div>
                ) : (
                    jobStatuses.map((job) => (
                        <div key={job.role_id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow gap-4">
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-bold text-gray-800">{job.label}</h3>
                                <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.is_hiring ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {job.is_hiring ? 'Active · Hiring Open' : 'Inactive · Hiring Closed'}
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
                                    <div className={`w-14 h-7 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary transition-colors ${job.is_hiring ? 'bg-green-500' : ''}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${job.is_hiring ? 'translate-x-7' : ''}`}></div>
                                    <span className="ml-3 text-sm font-medium text-gray-700 sm:hidden">
                                        {job.is_hiring ? 'Turn Off' : 'Turn On'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                <strong>Note:</strong> Changes are applied immediately to the Career page.
            </div>
        </div>
    );
};

export default AdminJobs;
