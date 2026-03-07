import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import API_URL from '../../config';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0] });
    const [imageFile, setImageFile] = useState(null);

    const [editingId, setEditingId] = useState(null);

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

    const handleEdit = (blog) => {
        setNewBlog({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            date: blog.date.split('T')[0]
        });
        setEditingId(blog.id);
        setShowForm(true);
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
            const url = editingId ? `${API_URL}/api/blogs/${editingId}` : `${API_URL}/api/blogs`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                body: formData
            });
            if (res.ok) {
                setNewBlog({ title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0] });
                setImageFile(null);
                setEditingId(null);
                setShowForm(false);
                fetchBlogs();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Blog <span className="text-blue-600">Management</span></h2>
                <button
                    onClick={() => { setShowForm(!showForm); if (showForm) setEditingId(null); }}
                    className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                >
                    <Plus size={20} /> {showForm ? 'Cancel' : 'New Post'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-12 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-inner overflow-hidden">
                    <div className="grid gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Post Title</label>
                            <input
                                type="text"
                                placeholder="Article Title"
                                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 transition-all font-bold"
                                value={newBlog.title}
                                onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Excerpt</label>
                            <textarea
                                placeholder="Short summary..."
                                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 transition-all font-medium h-24 resize-none"
                                value={newBlog.excerpt}
                                onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Article Content</label>
                            <textarea
                                placeholder="Full content..."
                                className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 transition-all font-medium h-48 resize-none"
                                value={newBlog.content}
                                onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Author</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 transition-all font-bold"
                                    value={newBlog.author}
                                    onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Public Date</label>
                                <input
                                    type="date"
                                    className="w-full px-6 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 transition-all font-bold"
                                    value={newBlog.date}
                                    onChange={e => setNewBlog({ ...newBlog, date: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <label className="flex items-center gap-3 cursor-pointer bg-blue-50 border border-blue-100 px-8 py-4 rounded-2xl hover:bg-blue-100 transition-all font-bold uppercase tracking-widest text-[10px] text-blue-700">
                                <Upload size={18} className="text-blue-600" /> {editingId ? 'Change Image' : 'Upload Image'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => setImageFile(e.target.files[0])}
                                />
                            </label>
                            {imageFile && <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{imageFile.name}</span>}
                        </div>
                        <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                            <button type="submit" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
                                {editingId ? 'Update Post' : 'Publish Post'}
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid gap-6">
                {blogs.map(blog => (
                    <div key={blog.id} className="flex gap-8 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] group hover:shadow-lg transition-all shadow-sm">
                        <div className="w-32 h-32 flex-shrink-0 bg-white rounded-[1.8rem] overflow-hidden border border-slate-200 shadow-inner group-hover:border-blue-500/30 transition-all">
                            {blog.image ? (
                                <img src={`${API_URL}${blog.image}`} alt={blog.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-200">
                                    <ImageIcon size={40} />
                                </div>
                            )}
                        </div>
                        <div className="flex-grow py-2">
                            <h3 className="font-bold text-xl text-slate-900 mb-2 uppercase tracking-tight">{blog.title}</h3>
                            <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-4 leading-relaxed">{blog.excerpt}</p>
                            <div className="flex gap-6 items-center">
                                <span className="text-[10px] uppercase font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {blog.author}
                                </span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-slate-300">
                                    {new Date(blog.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 justify-center">
                            <button
                                onClick={() => handleEdit(blog)}
                                className="px-6 py-3 text-slate-400 hover:text-blue-600 font-bold uppercase tracking-widest text-[10px] bg-white rounded-xl border border-slate-100 transition-all"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(blog.id)}
                                className="p-3 text-slate-300 hover:text-red-500 bg-white rounded-xl border border-slate-100 transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
                {blogs.length === 0 && !loading && <p className="text-center text-slate-300 font-bold uppercase tracking-widest py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">No posts found.</p>}
            </div>
        </div>
    );
};

export default AdminBlogs;
