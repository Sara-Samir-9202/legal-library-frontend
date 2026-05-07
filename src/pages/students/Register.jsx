import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, ArrowRight } from 'lucide-react';
import api from '../../api/axiosConfig';

export default function StudentRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) { setError('Full name is required'); return; }
    if (form.name.length < 3) { setError('Name must be at least 3 characters'); return; }
    if (!form.email) { setError('Email is required'); return; }
    if (!validateEmail(form.email)) { setError('Please enter a valid email address'); return; }
    if (!form.password) { setError('Password is required'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);

    try {
      const response = await api.post('/Auth/register', {
        fullName: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password
      });

      if (response.data?.success === true) {
        const data = response.data?.data;
        if (data?.token) {
          localStorage.setItem('studentToken', data.token);
          localStorage.setItem('studentName', data.fullName);
        }
        navigate('/books');
      } else {
        setError(response.data?.message || 'Registration failed. Please try again.');
      }

    } catch (err) {
      const errorData = err.response?.data;
      let errorMessage = 'Registration failed. Please try again.';
      if (errorData?.message) errorMessage = errorData.message;
      else if (errorData?.errors?.length) errorMessage = errorData.errors[0];
      else if (err.response?.status === 409) errorMessage = 'Email already exists. Please use a different email.';
      else if (err.response?.status === 400) errorMessage = 'Invalid data. Please check your information.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Montserrat', 'Georgia', serif" }}>
      <div style={{ flex: 1, backgroundImage: "url('/images/login-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0b1c3d 0%, #0f2a4a 50%, #1a3a6e 100%)', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-[#c9a96e]/30 rounded-full" initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }} animate={{ y: [null, -50, 50, -30, 30, 0], x: [null, 30, -30, 20, -20, 0] }} transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: "reverse" }} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
          ))}
        </div>

        <div className="absolute top-20 left-20 w-64 h-64 bg-[#c9a96e]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#c9a96e]/8 rounded-full blur-3xl animate-pulse delay-1000" />

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(201,169,110,0.25)', padding: '1.8rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div className="text-center mb-5">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} style={{ width: '55px', height: '55px', background: 'rgba(201,169,110,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.8rem' }}>
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="18" fill="#c9a96e" opacity="0.3"/>
                  <line x1="18" y1="6" x2="18" y2="30" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="8" y1="12" x2="28" y2="12" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M8 12 L5 19 Q8 21 11 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
                  <path d="M28 12 L25 19 Q28 21 31 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
                  <path d="M14 30 H22" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#c9a96e', letterSpacing: '3px', marginBottom: '0.2rem', fontFamily: "'Playfair Display', 'Cinzel', serif" }}>Create Account</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Join Legal Library today</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles className="w-4 h-4" /> {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: '12px', padding: '0 1rem' }}>
                  <User className="w-4 h-4 text-[#c9a96e]" />
                  <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required autoComplete="new-password" style={{ width: '100%', padding: '11px 12px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: '12px', padding: '0 1rem' }}>
                  <Mail className="w-4 h-4 text-[#c9a96e]" />
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required autoComplete="new-password" style={{ width: '100%', padding: '11px 12px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Password</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: '12px', padding: '0 1rem' }}>
                  <Lock className="w-4 h-4 text-[#c9a96e]" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" style={{ width: '100%', padding: '11px 12px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.85rem' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{ marginTop: '0.3rem', padding: '11px', borderRadius: '12px', background: loading ? 'rgba(201,169,110,0.5)' : 'linear-gradient(135deg, #c9a96e, #e4c088)', color: '#0b1c3d', fontWeight: '700', fontSize: '0.85rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {loading ? 'Creating...' : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="text-center mt-4 pt-4 border-t border-[rgba(201,169,110,0.15)]">
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Already have an account? <Link to="/login" style={{ color: '#c9a96e', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link></p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } html, body { overflow: hidden; height: 100%; } @media (max-width: 768px) { div[style*="flex: 1"]:first-child { display: none !important; } }`}</style>
    </div>
  );
}