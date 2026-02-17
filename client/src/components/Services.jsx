import React from 'react';
import { Code, Smartphone, Layout, Cloud, Database, Monitor } from 'lucide-react';

const services = [
    {
        icon: <Layout className="h-12 w-12" />,
        title: 'UI/UX Design',
        description: 'Creating intuitive and visually stunning interfaces that provide seamless user experiences.',
    },
    {
        icon: <Code className="h-12 w-12" />,
        title: 'Website Development',
        description: 'Building responsive, fast, and SEO-friendly websites using the latest technologies.',
    },
    {
        icon: <Smartphone className="h-12 w-12" />,
        title: 'App Development',
        description: 'Developing high-performance mobile applications for iOS and Android platforms.',
    },
    {
        icon: <Monitor className="h-12 w-12" />,
        title: 'Custom Software',
        description: 'Tailored software solutions designed to meet the specific needs of your business.',
    },
    {
        icon: <Cloud className="h-12 w-12" />,
        title: 'Cloud Services',
        description: 'Secure and scalable cloud infrastructure setup, migration, and management.',
    },
    {
        icon: <Database className="h-12 w-12" />,
        title: 'IT Consultancy',
        description: 'Expert advice to bridge the gap between business requirements and technology solutions.',
    },
];

const Services = () => {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Services</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Comprehensive IT solutions designed to propel your business forward.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary/10 group hover:border-secondary/30"
                        >
                            <div className="text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
