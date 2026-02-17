import React from 'react';
import { Target, Award, Users } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-accent">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Us</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Innovating for tomorrow, delivering today.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Our Story</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Founded with a vision to redefine the IT landscape, ShyamVertex has grown from a small consultancy to a full-service technology partner.
                            We believe in the power of technology to transform businesses and improve lives. Our journey is defined by a relentless pursuit of excellence and a commitment to our clients' success.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            "Go Vertex, Go Beyond" isn't just a slogan; it's our ethos. We strive to reach the pinnacle of innovation and then push even further.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-secondary">
                        <h3 className="text-xl font-bold mb-6 text-primary">Why Choose Us?</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="bg-secondary/10 p-2 rounded-lg mr-4">
                                    <Users className="h-6 w-6 text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Client-Centric Approach</h4>
                                    <p className="text-sm text-gray-500">Your goals are our goals. We work as an extension of your team.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-secondary/10 p-2 rounded-lg mr-4">
                                    <Award className="h-6 w-6 text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Excellence in Quality</h4>
                                    <p className="text-sm text-gray-500">We don't settle for good. We deliver exceptional.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <Target className="h-12 w-12 text-secondary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                        <p className="text-gray-600">
                            To empower businesses with innovative technology solutions that drive growth, efficiency, and sustainable success.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                        <p className="text-gray-600">
                            To be a global leader in IT consultancy and development, known for our integrity, innovation, and impact.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-3">Our Values</h3>
                        <p className="text-gray-600">
                            Innovation, Integrity, Collaboration, and Customer Success are the pillars of our organization.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
