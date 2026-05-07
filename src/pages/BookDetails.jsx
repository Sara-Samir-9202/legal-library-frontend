import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Eye, BookOpen, Calendar, User, ArrowLeft, Layers, Sparkles, FileText } from 'lucide-react';
import api from '../api/axiosConfig';
import Navbar from './Navbar';
import Footer from './Footer';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFromAdmin = location.state?.fromAdmin === true;
  const isAdmin = !!localStorage.getItem('adminToken');

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/Books/${id}`);
      const bookData = response.data?.data || response.data;
      setBook(bookData);
    } catch (err) {
      setError('Failed to load book details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Read Online - يزيد عدد القراءات
  const handleRead = async () => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const pdfPath = book?.pdfPath || book?.pdfUrl;
    if (!pdfPath) {
      alert('Book not available for reading');
      return;
    }

    try {
      setIsReading(true);
      
      // تسجيل القراءة في الداتابيز
      await api.post(`/Books/${id}/read`);
      
      // تحديث العداد في الواجهة
      setBook(prev => ({ 
        ...prev, 
        onlineReadCount: (prev.onlineReadCount || 0) + 1 
      }));
      
      // فتح PDF للقراءة
      const base = api.defaults.baseURL.replace('/api', '');
      const fullUrl = pdfPath.startsWith('http') ? pdfPath : `${base}/${pdfPath.replace(/^\//, '')}`;
      
      const link = document.createElement('a');
      link.href = fullUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Read error:', error);
      alert('Failed to open book');
    } finally {
      setIsReading(false);
    }
  };

  // ✅ Download PDF - يزيد عدد التحميلات
  const handleDownload = async () => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const pdfPath = book?.pdfPath || book?.pdfUrl;
    if (!pdfPath) {
      alert('PDF file not available');
      return;
    }

    try {
      setIsDownloading(true);
      
      // تسجيل التحميل في الداتابيز
      await api.post(`/Books/${id}/download`);
      
      // تحديث العداد في الواجهة
      setBook(prev => ({ 
        ...prev, 
        downloadCount: (prev.downloadCount || 0) + 1 
      }));
      
      // فتح التبويب
      const base = api.defaults.baseURL.replace('/api', '');
      const fullUrl = pdfPath.startsWith('http') ? pdfPath : `${base}/${pdfPath.replace(/^\//, '')}`;
      
      const link = document.createElement('a');
      link.href = fullUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download book');
    } finally {
      setIsDownloading(false);
    }
  };

  const getImageUrl = () => {
    if (imageError) return null;
    const imagePath = book?.coverImagePath || book?.coverImageUrl;
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const base = api.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
    return `${base}/${imagePath.replace(/^\//, '')}`;
  };

  const handleBack = () => {
    if (isFromAdmin || isAdmin) {
      navigate('/admin/books');
    } else {
      navigate('/books');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <BookOpen className="w-6 h-6 text-amber-500 animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <div className="text-center py-32">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-red-500 text-lg mb-4">{error || 'Book not found'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition shadow-lg"
          >
            Back to Books
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = getImageUrl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1c3d] via-[#0f2a4a] to-[#1a3a6e]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#c9a96e]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all duration-300 hover:translate-x-[-4px]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            Back to Books
          </button>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Book Cover */}
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative group/card"
              >
                <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="relative perspective-1000">
                    <motion.div
                      whileHover={{ rotateY: -5, rotateX: 5 }}
                      transition={{ duration: 0.3 }}
                      className="relative transform-style-3d"
                    >
                      {imageUrl ? (
                        <div className="relative">
                          <img
                            src={imageUrl}
                            alt={book.title}
                            className="w-full object-cover"
                            onError={() => setImageError(true)}
                          />
                          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                          <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
                          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#0b1c3d] to-[#1a3a6e] flex flex-col items-center justify-center gap-3">
                          <BookOpen className="w-16 h-16 text-[#c9a96e]" />
                          <span className="text-[#c9a96e] text-sm">No Cover Image</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#c9a96e]/30 pointer-events-none" />
                  <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-2 border-r-2 border-[#c9a96e]/50 rounded-br-2xl pointer-events-none" />
                  <div className="absolute -top-1 -left-1 w-12 h-12 border-t-2 border-l-2 border-[#c9a96e]/50 rounded-tl-2xl pointer-events-none" />
                </div>
              </motion.div>
            </div>

            {/* Book Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              {/* Level Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#c9a96e]/20 rounded-full text-[#c9a96e] text-sm font-semibold mb-4 backdrop-blur-sm border border-[#c9a96e]/30">
                <Sparkles className="w-3.5 h-3.5" />
                {book.academicLevel}
              </div>

              {/* Title */}
              <div className="mb-5">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', 'Cinzel', serif" }}>
                  {book.title}
                </h1>
              </div>

              {/* Info Cards */}
              <div className="space-y-3 mb-6">
                {book.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-[#c9a96e]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-white/50 text-xs block">Author</span>
                      <p className="text-white font-medium">{book.author}</p>
                    </div>
                  </div>
                )}

                {book.professor && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-[#c9a96e]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-white/50 text-xs block">Professor</span>
                      <p className="text-white font-medium">{book.professor}</p>
                    </div>
                  </div>
                )}

                {book.category && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center">
                      <Layers className="w-4 h-4 text-[#c9a96e]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-white/50 text-xs block">Category</span>
                      <p className="text-white font-medium">
                        {book.category.nameEn}
                        {book.category.nameAr && <span className="text-white/60 text-sm ml-2">({book.category.nameAr})</span>}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#c9a96e]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white/50 text-xs block">Added Date</span>
                    <p className="text-white font-medium">{new Date(book.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Stats - Downloads & Reads */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-full flex items-center justify-center">
                    <Download className="w-4 h-4 text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{book.downloadCount || 0}</p>
                    <p className="text-xs text-white/50">Downloads</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{book.onlineReadCount || 0}</p>
                    <p className="text-xs text-white/50">Reads</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/5 rounded-xl p-5 mb-6 border-l-4 border-[#c9a96e]">
                <h3 className="text-[#c9a96e] font-semibold text-sm mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  About this Book
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {book.description || 'No description available for this book.'}
                </p>
              </div>

              {/* Action Buttons - Read & Download */}
              <div className="flex flex-wrap gap-4 relative z-50">
                <button
                  onClick={handleRead}
                  disabled={isReading}
                  className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#c9a96e] to-[#e4c088] text-[#0b1c3d] rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Eye className="w-5 h-5 group-hover:animate-pulse" />
                  {isReading ? 'Opening...' : 'Read Online'}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="group flex items-center gap-2 px-8 py-3 border-2 border-[#c9a96e] text-white rounded-xl font-semibold hover:bg-[#c9a96e]/10 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  {isDownloading ? 'Opening...' : 'Download PDF'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      <Footer />
    </div>
  );
}