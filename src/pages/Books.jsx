import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import BookCard from './students/BookCard';
import Navbar from './Navbar';
import Footer from './Footer';
import { BookOpen, Sparkles } from 'lucide-react';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const studentName = localStorage.getItem('studentName') || 'Student';
  const isLoggedIn = !!localStorage.getItem('studentToken');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/Books?pageSize=100');
        const allBooks = response.data?.data?.items || response.data?.data || response.data || [];
        setBooks(Array.isArray(allBooks) ? allBooks.filter(b => b.isPublished === true) : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load books.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // ✅ Read Online - يزيد عدد القراءات
  const handleRead = async (bookId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      await api.post(`/Books/${bookId}/read`);
      const res = await api.get(`/Books/${bookId}`);
      const book = res.data?.data || res.data;
      const path = book?.pdfPath || book?.pdfUrl;
      if (!path) {
        alert('Book not available for reading');
        return;
      }
      const base = api.defaults.baseURL.replace('/api', '');
      const fullUrl = path.startsWith('http') ? path : `${base}/${path}`;
      window.open(fullUrl, '_blank');
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      else alert('Failed to open book');
    }
  };

  // ✅ Download PDF - يزيد عدد التحميلات
  const handleDownload = async (bookId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      await api.post(`/Books/${bookId}/download`);
      const res = await api.get(`/Books/${bookId}`);
      const book = res.data?.data || res.data;
      const path = book?.pdfPath || book?.pdfUrl;
      if (!path) {
        alert('PDF not available');
        return;
      }
      const base = api.defaults.baseURL.replace('/api', '');
      const fullUrl = path.startsWith('http') ? path : `${base}/${path}`;
      window.open(fullUrl, '_blank');
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      else alert('Download failed');
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0f2a4a' }}>
      <Navbar />
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a96e]"></div>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#0f2a4a' }}>
      <Navbar />
      <div className="text-center py-20" style={{ color: '#fca5a5' }}>{error}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f2a4a' }}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#c9a96e]/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-[#c9a96e]/30">
            <Sparkles className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-[#c9a96e]/90 text-sm">Student Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#fff' }}>
            Welcome, <span style={{ color: '#c9a96e' }}>{studentName}</span>
          </h1>
          <p className="text-white/50 mt-2">{books.length} books available for you</p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No books available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onDownload={handleDownload}
                onRead={handleRead}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}