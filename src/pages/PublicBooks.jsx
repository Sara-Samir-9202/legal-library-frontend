import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, X, Sparkles } from 'lucide-react';
import api from '../api/axiosConfig';
import BookCard from '../pages/students/BookCard';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/Books?pageSize=100');
        const data = res.data?.data?.items || res.data?.data || res.data || [];
        setBooks(Array.isArray(data) ? data.filter(b => b.isPublished) : []);
      } catch {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDownload = async (id) => {
    const token = localStorage.getItem('studentToken');
    if (!token) return navigate('/login');

    try {
      await api.post(`/Books/${id}/download`);
      const res = await api.get(`/Books/${id}`);
      const book = res.data?.data || res.data;
      const url = book?.pdfUrl || book?.pdfPath;
      if (!url) return alert('PDF not found');
      const base = api.defaults.baseURL.replace('/api', '');
      window.open(url.startsWith('http') ? url : `${base}/${url}`, '_blank');
    } catch {
      alert('Download failed');
    }
  };

  const handleRead = async (id) => {
    try {
      const res = await api.get(`/Books/${id}`);
      const book = res.data?.data || res.data;
      const url = book?.pdfUrl || book?.pdfPath;
      if (!url) return alert('Book not available');
      const base = api.defaults.baseURL.replace('/api');
      window.open(url.startsWith('http') ? url : `${base}/${url}`, '_blank');
    } catch {
      alert('Cannot open book');
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const filtered = books.filter(b => {
    const s = search.toLowerCase();
    return (
      (!search ||
        b.title?.toLowerCase().includes(s) ||
        b.author?.toLowerCase().includes(s)) &&
      (!level || b.academicLevel === level)
    );
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />

      {/* Hero Section - Blue Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1c3d] via-[#0f2a4a] to-[#1a3a6e]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#c9a96e]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* تم حذف Discover Legal Knowledge من هنا */}
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', 'Cinzel', serif" }}>
              <span className="text-white">Explore</span>
              <span className="bg-gradient-to-r from-[#c9a96e] to-[#e4c088] bg-clip-text text-transparent"> Legal Books</span>
            </h1>
            
            <p className="text-lg text-blue-100/60 max-w-2xl mx-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Find the perfect legal resources for your journey
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-20 bg-white border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-amber-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all duration-300"
                placeholder="Search books by title or author..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>

            {/* Level Filters */}
            <div className="flex gap-2">
              {levels.map(lvl => (
                <motion.button
                  key={lvl}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLevel(lvl === level ? '' : lvl)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    level === lvl
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg border border-amber-400'
                      : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-amber-300 hover:border-amber-400'
                  }`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {lvl}
                </motion.button>
              ))}
              
              {level && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLevel('')}
                  className="px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-gray-600 transition"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid - 4 columns */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 rounded-xl h-56 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* عدد الكتب */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '2rem',
            }}>
              <span style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, #c9a96e)',
              }} />
              <p style={{
                color: '#0b1c3d',
                fontSize: '0.72rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                opacity: 0.6,
                fontFamily: "'Cinzel', serif",
                margin: 0,
              }}>
                {filtered.length} Books Available
              </p>
              <span style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to right, #c9a96e, transparent)',
              }} />
            </div>

            {/* Grid - 4 columns */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filtered.map((book, index) => (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                  >
                    <BookCard
                      book={book}
                      onDownload={handleDownload}
                      onRead={handleRead}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  No books found
                </p>
                <button
                  onClick={() => { setSearch(''); setLevel(''); }}
                  className="mt-4 text-amber-600 hover:text-amber-700 transition"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}