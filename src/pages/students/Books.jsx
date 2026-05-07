import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import BookCard from './BookCard';
import Navbar from '../Navbar';
import { Search, BookOpen, X } from 'lucide-react';

export default function StudentBooks() {
  const [books, setBooks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const navigate = useNavigate();

  const studentName = localStorage.getItem('studentName') || 'Student';
  const isLoggedIn  = !!localStorage.getItem('studentToken');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/Books?pageSize=100'); // ✅ كل الكتب
        const allBooks =
          response.data?.data?.items ||
          response.data?.data ||
          response.data || [];
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

  const handleDownload = async (bookId) => {
    if (!isLoggedIn) { navigate('/login'); return; }
    try {
      await api.post(`/Books/${bookId}/download`);
      const res  = await api.get(`/Books/${bookId}`);
      const book = res.data?.data || res.data;
      const path = book?.pdfPath || book?.pdfUrl;
      if (!path) { alert('PDF not available'); return; }
      const base = api.defaults.baseURL.replace('/api', '');
      window.open(path.startsWith('http') ? path : `${base}/${path}`, '_blank');
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      else alert('Download failed');
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0' }}>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{
          width: '48px', height: '48px', border: '3px solid #c9a96e',
          borderTopColor: 'transparent', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '4rem', color: 'red' }}>{error}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0', fontFamily: 'Georgia, serif' }}>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '7rem 5% 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#0b1c3d', fontWeight: '700' }}>
            Welcome, <span style={{ color: '#c9a96e' }}>{studentName}</span>
          </h1>
          <p style={{ color: 'rgba(11,28,61,0.5)', marginTop: '0.5rem' }}>
            {books.length} books available
          </p>
        </div>

        {books.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem' }}>📚</div>
            <p style={{ color: '#0b1c3d', marginTop: '1rem' }}>No books available</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.8rem'
          }}>
            {books.map(book => (
              <BookCard key={book.id} book={book} onDownload={handleDownload} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}