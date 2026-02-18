import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPostPage = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h2>
                <Link to="/" className="text-primary hover:text-secondary flex items-center">
                    <ArrowLeft className="mr-2" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-white min-h-screen">
            <article className="container mx-auto px-4 max-w-4xl">
                <Link to="/#blog" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 w-5 h-5" /> Back to Blog
                </Link>

                <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center text-gray-500 mb-8 space-x-6 border-b pb-8">
                    <span className="flex items-center"><Calendar className="h-5 w-5 mr-2" /> {post.date}</span>
                    <span className="flex items-center"><User className="h-5 w-5 mr-2" /> {post.author}</span>
                </div>

                <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
                    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>

                <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </div>
    );
};

export default BlogPostPage;
