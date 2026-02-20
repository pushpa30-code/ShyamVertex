import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import API_URL from '../../config';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0] });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs`);
            const data = await res.json();
            if (Array.isArray(data)) setBlogs(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newBlog.title);
        formData.append('excerpt', newBlog.excerpt);
        formData.append('content', newBlog.content);
        formData.append('author', newBlog.author);
        formData.append('date', newBlog.date);
        if (imageFile) formData.append('image', imageFile);

        try {
            const res = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                setNewBlog({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0] });
                setImageFile(null);
                setShowForm(false);
                fetchBlogs();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage Blogs</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                    <Plus size={18} /> Add Blog Post
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid gap-4">
                        <input
                            type="text"
                            placeholder="Blog Title"
                            className="w-full p-2 border rounded"
                            value={newBlog.title}
                            onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Excerpt (Short Summary)"
                            className="w-full p-2 border rounded"
                            value={newBlog.excerpt}
                            onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Full Content"
                            className="w-full p-2 border rounded h-32"
                            value={newBlog.content}
                            onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Author"
                                className="w-full p-2 border rounded"
                                value={newBlog.author}
                                onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
                            />
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={newBlog.date}
                                onChange={e => setNewBlog({ ...newBlog, date: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer bg-white border p-2 rounded hover:bg-gray-50">
                                <Upload size={18} /> Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => setImageFile(e.target.files[0])}
                                />
                            </label>
                            {imageFile && <span className="text-sm text-green-600">{imageFile.name}</span>}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">Publish Post</button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {blogs.map(blog => (
                    <div key={blog.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                            {blog.image ? (
                                <img src={`${API_URL}${blog.image}`} alt={blog.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <ImageIcon size={24} />
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg">{blog.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{blog.excerpt}</p>
                            <div className="mt-2 text-xs text-gray-500 flex gap-4">
                                <span>Author: {blog.author}</span>
                                <span>Date: {new Date(blog.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-500 hover:text-red-700 p-2 self-start"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
                {blogs.length === 0 && !loading && <p className="text-center text-gray-500">No blog posts found.</p>}
            </div>
        </div>
    );
};

export default AdminBlogs;
