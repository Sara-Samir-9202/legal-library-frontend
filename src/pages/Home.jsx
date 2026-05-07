import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { getCategories } from '../api/CategoriesApi';

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(res => {
      const data = Array.isArray(res) ? res : [];
      setCategories(data);
    });
  }, []);

  const topCategories = categories.slice(0, 4);

  const mizanLetters = ['M', 'I', 'Z', 'A', 'N'];
  const subtitleWords = ['Your', 'Legal', 'Knowledge', 'Journey'];

  const descLines = [
    ['Access', 'a', 'curated', 'collection', 'of', 'legal', 'books,'],
    ['references', 'and', 'academic', 'resources', 'for', 'law'],
    ['students', 'and', 'professionals', 'worldwide.'],
  ];

  let globalWordIndex = 0;

  return (
    <div
      className="home"
      style={{
        backgroundImage: "url('/images/Home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <Navbar />
      </div>

      {/* HERO */}
      <section className="hero-advanced">
        <div className="hero-advanced-content">

          {/* MIZAN */}
          <div className="mizan-title">
            {mizanLetters.map((letter, i) => (
              <span
                key={i}
                className="letter"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <div className="hero-subtitle">
            {subtitleWords.map((word, i) => (
              <span
                key={i}
                className="word"
                style={{ animationDelay: `${0.5 + i * 0.12}s` }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="hero-desc">
            {descLines.map((line, lineIndex) => (
              <div key={lineIndex} className="line">
                {line.map((word) => {
                  const delay = 1.0 + globalWordIndex * 0.07;
                  globalWordIndex++;
                  return (
                    <span
                      key={globalWordIndex}
                      className="word"
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Explore Button - من غير خط متحرك */}
          <button
            onClick={() => navigate('/books')}
            className="btn-explore-advanced"
          >
            <span className="btn-text">
              Explore Library
            </span>
            <span className="btn-arrow">→</span>
          </button>

        </div>
      </section>

      {/* STATS */}
      <section className="py-10 bg-[#0b1c3d] text-white flex justify-center gap-10 flex-wrap">
        <Stat label="Books" />
        <Stat label="Categories" />
        <Stat label="Downloads" />
        <Stat label="Users" />
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-6 bg-[#f7f6f2]">
        <h2 className="text-center text-3xl font-bold mb-12 text-[#0b1c3d]">
          Browse by Field
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {topCategories.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.id}`)}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-xl transition"
            >
              <img
                src={`/images/categories/${cat.lawField?.toLowerCase() || 'default'}.jpg`}
                onError={(e) => { e.target.src = '/images/categories/default.jpg'; }}
                alt={cat.nameEn}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-[#0b1c3d] font-semibold text-sm">{cat.nameEn}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Fields Button */}
        <div className="flex justify-center mt-14">
          <button
            onClick={() => navigate('/categories')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
            }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('.explore-box').style.transform = 'rotate(45deg) scale(1.1)';
              e.currentTarget.querySelector('.explore-label').style.letterSpacing = '4px';
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('.explore-box').style.transform = 'rotate(0deg) scale(1)';
              e.currentTarget.querySelector('.explore-label').style.letterSpacing = '2.5px';
            }}
          >
            {/* الخط الجانبي الأيسر */}
            <span style={{
              width: '32px',
              height: '1.5px',
              background: 'linear-gradient(to right, transparent, #c9a96e)',
              display: 'inline-block',
            }} />

            {/* النص */}
            <span
              className="explore-label"
              style={{
                color: '#0b1c3d',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                transition: 'letter-spacing 0.3s ease',
                fontFamily: 'Georgia, serif',
              }}
            >
              Explore All Fields
            </span>

            {/* المربع الصغير */}
            <span
              className="explore-box"
              style={{
                width: '20px',
                height: '20px',
                border: '1.5px solid #c9a96e',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c9a96e',
                fontSize: '0.75rem',
                transition: 'transform 0.4s ease',
                transform: 'rotate(0deg)',
                flexShrink: 0,
              }}
            >
              ↗
            </span>

            {/* الخط الجانبي الأيمن */}
            <span style={{
              width: '32px',
              height: '1.5px',
              background: 'linear-gradient(to left, transparent, #c9a96e)',
              display: 'inline-block',
            }} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* Stat Component */
function Stat({ label }) {
  const [count, setCount] = useState(20);

  useEffect(() => {
    let current = 20;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 3) + 1;
      if (current >= 100) current = 20;
      setCount(current);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-[#c9a96e]">
        {count}+
      </h3>
      <p className="text-sm opacity-60">{label}</p>
    </div>
  );
}