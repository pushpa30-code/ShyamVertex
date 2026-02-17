import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: 'What services do you offer?',
        answer: 'We offer a wide range of IT services including UI/UX Design, Website Development, App Development, Custom Software Solutions, Cloud Services, and IT Consultancy.',
    },
    {
        question: 'How much does a custom website cost?',
        answer: 'The cost varies depending on the complexity, features, and design requirements. Contact us for a free quote tailored to your specific needs.',
    },
    {
        question: 'Do you provide maintenance and support?',
        answer: 'Yes, we offer ongoing maintenance and support packages to ensure your software remains up-to-date, secure, and performs optimally.',
    },
    {
        question: 'How long does it take to develop a mobile app?',
        answer: 'Development timelines vary based on the app\'s scope. A simple app might take 4-8 weeks, while a complex enterprise app could take 3-6 months or more.',
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto"></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-semibold text-primary">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="h-5 w-5 text-secondary" />
                                ) : (
                                    <Plus className="h-5 w-5 text-secondary" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-4 bg-white text-gray-600 border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
