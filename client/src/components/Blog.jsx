import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'The Future of AI in Web Development',
        excerpt: 'How artificial intelligence is reshaping the way we build and interact with websites.',
        date: 'Oct 15, 2023',
        author: 'Admin',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: 2,
        title: 'Why UI/UX Design Matters for SEO',
        excerpt: 'Explaining the critical link between user experience and search engine rankings.',
        date: 'Sep 28, 2023',
        author: 'Jane Doe',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: 3,
        title: 'Migrating to the Cloud: A Beginners Guide',
        excerpt: 'Key considerations and steps for businesses looking to move their infrastructure to the cloud.',
        date: 'Sep 10, 2023',
        author: 'John Smith',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500',
    },
];

const Blog = () => {
    return (
        <section id="blog" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest Insights</h2>
                    <div className="w-20 h-1 bg-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest trends and news from the tech world.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {post.date}</span>
                                    <span className="flex items-center"><User className="h-4 w-4 mr-1" /> {post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 hover:text-secondary transition-colors cursor-pointer">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <a href={`/blog/${post.id}`} className="inline-flex items-center text-secondary font-semibold hover:underline">
                                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
