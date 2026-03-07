import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import CareerPage from './pages/CareerPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import AboutUsPage from './pages/AboutUsPage';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    return (
        <div className="min-h-screen bg-dark font-sans text-white">
            {!isAdminPage && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/career" element={<CareerPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
            {!isAdminPage && <Footer />}
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <AppContent />
        </Router>
    );
};

export default App;
