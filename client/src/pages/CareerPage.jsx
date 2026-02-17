import React, { useState } from 'react';
import { Briefcase, Clock, Globe } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';

const CareerPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = (role) => {
        setSelectedRole(role);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedRole(null);
    };

    const careers = [
        {
            id: 'fulltime',
            title: 'Full-time',
            icon: <Briefcase className="w-12 h-12 text-accent" />,
            description: 'Join our core team and build the future of tech with us. Competitive salary and benefits.',
        },
        {
            id: 'internship',
            title: 'Internship',
            icon: <Clock className="w-12 h-12 text-accent" />,
            description: 'Start your career with hands-on experience on real-world projects. Mentorship included.',
        },
        {
            id: 'freelance',
            title: 'Freelance',
            icon: <Globe className="w-12 h-12 text-accent" />,
            description: 'Work flexibly on exciting projects from anywhere in the world.',
        }
    ];

    return (
        <div className="bg-background min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Join Our Team</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore opportunities to grow with ShyamVertex. We are looking for passionate individuals to join our journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {careers.map((career) => (
                        <div key={career.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center text-center border-t-4 border-accent">
                            <div className="mb-6 p-4 bg-indigo-50 rounded-full">
                                {career.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-4">{career.title}</h2>
                            <p className="text-gray-600 mb-8">{career.description}</p>
                            <button
                                onClick={() => openForm(career.title)}
                                className="mt-auto bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <ApplicationForm
                isOpen={isFormOpen}
                onClose={closeForm}
                distinctRole={selectedRole}
            />
        </div>
    );
};

export default CareerPage;
