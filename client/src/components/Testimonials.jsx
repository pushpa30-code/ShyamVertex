import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Nakul Agrawal',
        role: 'CTO, TechFlow',
        content: 'ShyamVertex transformed our digital presence. Their team is professional, skilled, and incredibly easy to work with.',
    },
    {
        name: 'Akhay Pandey',
        role: 'Founder, StartUp Inc',
        content: 'The custom software solution they built for us streamlined our operations and saved us countless hours. Highly recommended!',
    },
    {
        name: 'Jitender Singh',
        role: 'Marketing Director, GrowthCo',
        content: 'Their UI/UX design work is world-class. Our new website has seen a 200% increase in engagement since the redesign.',
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-slate-800 p-8 rounded-xl relative">
                            <Quote className="h-10 w-10 text-secondary/20 absolute top-4 right-4" />
                            <p className="text-gray-300 italic mb-6">"{testimonial.content}"</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-primary mr-3">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
