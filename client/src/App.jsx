import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CareerPage from './pages/CareerPage'

import BlogPostPage from './pages/BlogPostPage'

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/career" element={<CareerPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
