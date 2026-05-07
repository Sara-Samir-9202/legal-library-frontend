import { motion } from 'framer-motion';
import { Download, Eye, Info } from 'lucide-react';
import { useState } from 'react';
import api from '../../api/axiosConfig';

export default function BookCard({ book, onDownload, onRead, onViewDetails }) {
  const [isHoveringCover, setIsHoveringCover] = useState(false);

  const getFullLevel = (level) => {
    switch(level) {
      case 'Beginner': return 'Beginner';
      case 'Intermediate': return 'Intermediate';
      case 'Advanced': return 'Advanced';
      default: return level;
    }
  };

  // ✅ دالة مخصصة للـ Read داخل الكارد
  const handleReadClick = async (e, bookId) => {
    e.stopPropagation();
    const token = localStorage.getItem('studentToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      // تسجيل القراءة في الداتابيز
      await api.post(`/Books/${bookId}/read`);
      
      // جلب بيانات الكتاب
      const res = await api.get(`/Books/${bookId}`);
      const bookData = res.data?.data || res.data;
      const pdfPath = bookData?.pdfPath || bookData?.pdfUrl;
      
      if (!pdfPath) {
        alert('Book not available for reading');
        return;
      }
      
      const base = api.defaults.baseURL.replace('/api', '');
      const fullUrl = pdfPath.startsWith('http') ? pdfPath : `${base}/${pdfPath}`;
      
      // فتح PDF للقراءة
      const link = document.createElement('a');
      link.href = fullUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Read error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      } else {
        alert('Failed to open book');
      }
    }
  };

  // ✅ دالة مخصصة للـ Download داخل الكارد
  const handleDownloadClick = async (e, bookId) => {
    e.stopPropagation();
    const token = localStorage.getItem('studentToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      // تسجيل التحميل في الداتابيز
      await api.post(`/Books/${bookId}/download`);
      
      // جلب بيانات الكتاب
      const res = await api.get(`/Books/${bookId}`);
      const bookData = res.data?.data || res.data;
      const pdfPath = bookData?.pdfPath || bookData?.pdfUrl;
      
      if (!pdfPath) {
        alert('PDF file not available');
        return;
      }
      
      const base = api.defaults.baseURL.replace('/api', '');
      const fullUrl = pdfPath.startsWith('http') ? pdfPath : `${base}/${pdfPath}`;
      
      // فتح PDF
      const link = document.createElement('a');
      link.href = fullUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      } else {
        alert('Download failed');
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group cursor-pointer"
    >
      <div 
        className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-400"
        style={{
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #0b1c3d, #c9a96e) border-box',
          border: '2px solid transparent',
        }}
      >
        
        {/* 3D Book Cover */}
        <div 
          className="relative p-2 bg-gradient-to-br from-gray-50 to-blue-50/30"
          onMouseEnter={() => setIsHoveringCover(true)}
          onMouseLeave={() => setIsHoveringCover(false)}
        >
          <div className="relative perspective-800">
            <motion.div
              whileHover={{ rotateY: -6, rotateX: 2 }}
              transition={{ duration: 0.2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Shadow */}
              <div className="absolute -bottom-2 left-1 right-1 h-2 bg-black/20 rounded-b-md blur-sm" />
              
              {/* Book Cover Image */}
              <div className="relative w-full aspect-[3/4] rounded-md shadow-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {book.coverImageUrl || book.coverImagePath ? (
                  <>
                    <img
                      src={book.coverImageUrl || book.coverImagePath}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      style={{ transform: 'scale(1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-blue-600/60 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-500/60 pointer-events-none" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0b1c3d] to-[#1a3a6e] flex items-center justify-center">
                    <div className="text-[#c9a96e] text-xs text-center px-2">
                      No Cover
                    </div>
                  </div>
                )}

                {/* Level Badge */}
                {isHoveringCover && book.academicLevel && (
                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-2 right-2 z-10"
                  >
                    <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-[9px] font-bold rounded-lg shadow-lg">
                      {getFullLevel(book.academicLevel)}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <div className="px-3 pt-2 pb-1 text-center">
          <h3 className="font-semibold text-xs text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
            {book.title}
          </h3>
        </div>

        {/* Buttons - Read و PDF يعملوا API calls مباشرة */}
        <div className="px-3 pb-3">
          <div className="flex gap-1.5">
            <button
              onClick={(e) => { e.stopPropagation(); onViewDetails(book.id); }}
              className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1.5 rounded-lg text-[10px] font-semibold hover:from-blue-700 hover:to-blue-800 transition"
            >
              <Info className="w-3.5 h-3.5" />
              Details
            </button>

            <button
              onClick={(e) => handleReadClick(e, book.id)}
              className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-[#0b1c3d] to-[#1a3a6e] text-white py-1.5 rounded-lg text-[10px] font-semibold hover:from-[#1a3a6e] hover:to-[#0b1c3d] transition"
            >
              <Eye className="w-3.5 h-3.5" />
              Read
            </button>

            <button
              onClick={(e) => handleDownloadClick(e, book.id)}
              className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white py-1.5 rounded-lg text-[10px] font-semibold hover:from-amber-400 hover:to-amber-500 transition"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0b1c3d] via-[#c9a96e] to-[#0b1c3d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  );
}