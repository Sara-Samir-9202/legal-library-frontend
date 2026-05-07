import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { getCategories } from '../api/CategoriesApi';
import Navbar from './Navbar';
import Footer from './Footer';

const categoryImages = {
  'Criminal Law':            '/images/categories/criminal.jpg',
  'Civil Law':               '/images/categories/civil.jpg',
  'Commercial Law':          '/images/categories/commercial.jpg',
  'Constitutional Law':      '/images/categories/constitution.jpg',
  'Administrative Law':      '/images/categories/admin.jpg',
  'Jurisprudence':           '/images/categories/jurisprudence.jpg',
  'International Law':       '/images/categories/international.jpg',
  'Human Rights Law':        '/images/categories/human-rights.jpg',
  'Labor Law':               '/images/categories/labor.jpg',
  'Family Law':              '/images/categories/family.jpg',
  'Environmental Law':       '/images/categories/environment.jpg',
  'Tax Law':                 '/images/categories/tax.jpg',
  'Cyber Law':               '/images/categories/cyber.jpg',
  'Medical Law':             '/images/categories/medical.jpg',
  'Intellectual Property':   '/images/categories/ip.jpg',
};

export default function PublicCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(data =>
      setCategories(Array.isArray(data) ? data : [])
    );
  }, []);

  const filtered = categories.filter(c =>
    !search || c.nameEn?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
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
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', 'Cinzel', serif" }}>
              <span className="text-white">Law</span>
              <span className="bg-gradient-to-r from-[#c9a96e] to-[#e4c088] bg-clip-text text-transparent"> Categories</span>
            </h1>
            
            <p className="text-lg text-blue-100/60 max-w-2xl mx-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Browse legal topics by category
            </p>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Search Section */}
      <div className="sticky top-0 z-20 bg-white border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-amber-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all duration-300"
                placeholder="Search categories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '2rem',
        }}>
          <span style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(to right, transparent, #c9a96e)',
          }} />
          <p style={{
            color: '#0b1c3d', fontSize: '0.72rem',
            letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6,
            fontFamily: "'Cinzel', serif", margin: 0,
          }}>
            {filtered.length} Fields Available
          </p>
          <span style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(to right, #c9a96e, transparent)',
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.id}`)}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: hovered === cat.id
                  ? '0 20px 40px rgba(0,0,0,0.1)'
                  : '0 2px 8px rgba(0,0,0,0.04)',
                transform: hovered === cat.id ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                position: 'relative',
                // بوردر خفيف جداً حول الكارت
                border: '1.5px solid #c9a96e',
              }}
            >
              {/* الصورة */}
              <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <img
                  src={categoryImages[cat.nameEn] || '/images/categories/default.jpg'}
                  onError={(e) => { e.target.src = '/images/categories/default.jpg'; }}
                  alt={cat.nameEn}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered === cat.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.4s ease',
                  }}
                />

                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: hovered === cat.id
                    ? 'rgba(11,28,61,0.3)'
                    : 'rgba(11,28,61,0.1)',
                  transition: 'background 0.3s ease',
                }} />
              </div>

              {/* المحتوى */}
              <div style={{ padding: '1.2rem 1.2rem', textAlign: 'center' }}>
                <h3 style={{
                  color: '#0b1c3d',
                  fontSize: '1rem',
                  fontWeight: '700',
                  letterSpacing: '0.3px',
                  marginBottom: '0.3rem',
                  fontFamily: "'Playfair Display', 'Cinzel', serif"
                }}>
                  {cat.nameEn}
                </h3>

                <p style={{
                  color: '#999',
                  fontSize: '0.75rem',
                  fontFamily: "'Montserrat', sans-serif",
                  marginBottom: '0.8rem'
                }}>
                  {cat.nameAr}
                </p>

                {/* زر */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '0.3rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: hovered === cat.id ? '25px' : '15px',
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, #c9a96e)',
                      transition: 'width 0.3s ease',
                    }} />
                    <span style={{
                      color: '#c9a96e',
                      fontSize: '0.6rem',
                      fontWeight: '600',
                      letterSpacing: hovered === cat.id ? '2px' : '1.5px',
                      textTransform: 'uppercase',
                      fontFamily: "'Cinzel', serif",
                      transition: 'letter-spacing 0.3s ease',
                    }}>
                      Browse Books
                    </span>
                  </div>

                  {/* السهم */}
                  <div style={{
                    width: '12px', height: '12px',
                    border: '1px solid #c9a96e',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#c9a96e',
                    transform: hovered === cat.id ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    fontSize: '8px',
                  }}>
                    ↗
                  </div>
                </div>
              </div>

              {/* البوردر السفلي عند hover فقط */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: hovered === cat.id ? '100%' : '0%',
                height: '2px',
                background: 'linear-gradient(to right, #c9a96e, #0b1c3d)',
                transition: 'width 0.3s ease',
              }} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}