import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, BookOpen, X, ArrowRight } from 'lucide-react';
import api from '../../api/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminBooks() {
  const navigate = useNavigate();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', author: '', professor: '',
    academicLevel: 'Beginner', categoryId: '', pdfPath: '', coverImagePath: ''
  });

  const saveCurrentState = () => {
    const currentState = { search, showAll, scrollPosition: window.scrollY };
    localStorage.setItem('adminBooksState', JSON.stringify(currentState));
  };

  useEffect(() => { fetchBooks(); }, []);

  useEffect(() => {
    const savedState = localStorage.getItem('adminBooksState');
    if (savedState && !location.state?.justReturned) {
      const { search: savedSearch, showAll: savedShowAll, scrollPosition } = JSON.parse(savedState);
      setSearch(savedSearch || '');
      setShowAll(savedShowAll || false);
      setTimeout(() => { window.scrollTo(0, scrollPosition || 0); }, 100);
      localStorage.removeItem('adminBooksState');
    }
  }, [location]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/Books?pageSize=100');
      const allBooks = response.data?.data?.items || response.data?.data || response.data || [];
      setBooks(Array.isArray(allBooks) ? allBooks : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const res = await api.post('/Files/upload-cover', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, coverImagePath: res.data?.data }));
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploadingCover(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPdf(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const res = await api.post('/Files/upload-pdf', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, pdfPath: res.data?.data }));
    } catch (err) {
      alert('Failed to upload PDF');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await api.delete(`/Books/${id}`);
      fetchBooks();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await api.put(`/Books/${editingBook.id}`, formData);
      } else {
        await api.post('/Books', formData);
      }
      setShowModal(false);
      setEditingBook(null);
      setFormData({
        title: '', description: '', author: '', professor: '',
        academicLevel: 'Beginner', categoryId: '', pdfPath: '', coverImagePath: ''
      });
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save book');
    }
  };

  const handleViewDetails = (bookId) => {
    saveCurrentState();
    navigate(`/books/${bookId}`, { state: { fromAdmin: true } });
  };

  const filtered = books.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()));
  const displayedBooks = showAll ? filtered : filtered.slice(0, 6);
  const hasMore = filtered.length > 6;

  const titleLetters = ['B', 'o', 'o', 'k', 's', ' ', 'M', 'a', 'n', 'a', 'g', 'e', 'm', 'e', 'n', 't'];

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#c9a96e]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <BookOpen size={20} className="text-[#c9a96e] animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="mb-4">
            <div className="flex justify-center gap-1 flex-wrap">
              {titleLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="text-4xl md:text-5xl font-bold inline-block"
                  style={{ color: '#0b1c3d', fontFamily: "'Playfair Display', 'Cinzel', serif" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="h-0.5 bg-gradient-to-r from-amber-400 to-transparent mx-auto mt-3"
            />
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-gray-500 text-sm">
            Manage your library collection — add, edit, or remove books
          </motion.p>
        </motion.div>

        {/* Search + Add */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
        >
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 shadow-sm"
              placeholder="Search books by title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: ['0px 0px 0px rgba(245,158,11,0)', '0px 0px 20px rgba(245,158,11,0.3)', '0px 0px 0px rgba(245,158,11,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => {
              setEditingBook(null);
              setFormData({ title: '', description: '', author: '', professor: '', academicLevel: 'Beginner', categoryId: '', pdfPath: '', coverImagePath: '' });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Plus size={18} /> Add New Book
          </motion.button>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ delay: index * 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Book Cover */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {book.coverImagePath || book.coverImageUrl ? (
                    <motion.img
                      src={book.coverImagePath || book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full items-center justify-center bg-gradient-to-br from-[#0b1c3d] to-[#1a3a6e]"
                    style={{ display: (book.coverImagePath || book.coverImageUrl) ? 'none' : 'flex' }}
                  >
                    <BookOpen size={40} className="text-[#c9a96e]" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500 text-white shadow-md">
                      {book.academicLevel}
                    </span>
                  </div>
                  {/* PDF Badge */}
                  {book.pdfPath && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white shadow-md">
                        PDF ✓
                      </span>
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">{book.description || 'No description'}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">By:</span>
                      <span className="text-xs font-medium text-gray-700">{book.author || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{book.downloadCount || 0}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewDetails(book.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm font-medium"
                    >
                      <Eye size={14} /> View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditingBook(book);
                        setFormData({
                          title: book.title || '',
                          description: book.description || '',
                          author: book.author || '',
                          professor: book.professor || '',
                          academicLevel: book.academicLevel || 'Beginner',
                          categoryId: book.categoryId || '',
                          pdfPath: book.pdfPath || '',
                          coverImagePath: book.coverImagePath || '',
                        });
                        setShowModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition text-sm font-medium"
                    >
                      <Edit size={14} /> Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(book.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition text-sm font-medium"
                    >
                      <Trash2 size={14} /> Delete
                    </motion.button>
                  </div>
                </div>

                {/* Animated Bottom Border */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Less */}
        {hasMore && !showAll && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: ['0px 0px 0px rgba(245,158,11,0)', '0px 0px 30px rgba(245,158,11,0.4)', '0px 0px 0px rgba(245,158,11,0)'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Explore All Books ({filtered.length - 6} more)</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <ArrowRight size={18} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}

        {showAll && hasMore && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-8">
            <button onClick={() => setShowAll(false)} className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300">
              Show Less
            </button>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen size={32} className="text-gray-300" />
            </motion.div>
            <p className="text-gray-400 text-lg">No books found</p>
          </motion.div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              style={{ background: 'linear-gradient(135deg, #fff 0%, #fef9e6 100%)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-amber-500 to-amber-400" />
                  <h2 className="text-xl font-bold text-gray-800">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text" placeholder="Title *"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  required
                />
                <textarea
                  placeholder="Description" rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition resize-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text" placeholder="Author"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                  <input
                    type="text" placeholder="Professor"
                    value={formData.professor}
                    onChange={e => setFormData({ ...formData, professor: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={formData.academicLevel}
                    onChange={e => setFormData({ ...formData, academicLevel: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                  <input
                    type="text" placeholder="Category ID"
                    value={formData.categoryId}
                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>

                {/* Cover Upload */}
                <div>
                  <label className="text-xs font-medium mb-1 block text-gray-500">Cover Image</label>
                  <label className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 cursor-pointer hover:border-amber-400 transition-all duration-200">
                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                    <span className="text-sm" style={{ color: formData.coverImagePath ? 'green' : '#6b7280', opacity: uploadingCover ? 1 : 0.8 }}>
                      {uploadingCover ? '⏳ Uploading...' : formData.coverImagePath ? '✓ Image uploaded' : 'Choose cover image...'}
                    </span>
                  </label>
                  {formData.coverImagePath && (
                    <div className="flex justify-center mt-2">
                      <img src={formData.coverImagePath} alt="Preview" className="h-28 rounded-lg object-cover shadow-md border border-amber-200" onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>

                {/* PDF Upload */}
                <div>
                  <label className="text-xs font-medium mb-1 block text-gray-500">PDF File</label>
                  <label className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 cursor-pointer hover:border-amber-400 transition-all duration-200">
                    <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
                    <span className="text-sm" style={{ color: formData.pdfPath ? 'green' : '#6b7280', opacity: uploadingPdf ? 1 : 0.8 }}>
                      {uploadingPdf ? '⏳ Uploading...' : formData.pdfPath ? `✓ PDF uploaded` : 'Choose PDF file...'}
                    </span>
                  </label>
                  {formData.pdfPath && (
                    <p className="text-xs text-gray-400 mt-1 truncate px-1">📄 {formData.pdfPath}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {editingBook ? 'Update Book' : 'Save Book'}
                  </button>
                  <button
                    type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}