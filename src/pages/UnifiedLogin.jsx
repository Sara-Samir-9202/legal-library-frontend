import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import api from '../api/axiosConfig';

export default function UnifiedLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.email || !form.password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/Auth/login', {
        email: form.email.trim(),
        password: form.password
      });

      const data = response.data?.data || response.data;
      const token = data?.token;
      const role = data?.role;
      const fullName = data?.fullName || 'User';

      if (!token) {
        setError('Login failed. Please try again.');
        return;
      }

      localStorage.removeItem('adminToken');
      localStorage.removeItem('studentToken');
      localStorage.removeItem('adminName');
      localStorage.removeItem('studentName');

      if (role === 'Admin') {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminName', fullName);
        navigate('/admin/dashboard');
      } else {
        localStorage.setItem('studentToken', token);
        localStorage.setItem('studentName', fullName);
        navigate('/books');
      }

    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message || '';

      if (status === 401) setError('Incorrect email or password. Please try again.');
      else if (status === 403) setError('Your account is locked. Please contact support.');
      else if (status === 404) setError('No account found with this email address.');
      else if (status === 400) setError('Invalid email or password format.');
      else if (!navigator.onLine) setError('No internet connection. Please check your network.');
      else setError(msg || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Montserrat', 'Georgia', serif" }}>
      <div style={{ flex: 1, backgroundImage: "url('/images/login-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0b1c3d 0%, #0f2a4a 50%, #1a3a6e 100%)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-[#c9a96e]/30 rounded-full" initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }} animate={{ y: [null, -50, 50, -30, 30, 0], x: [null, 30, -30, 20, -20, 0] }} transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: "reverse" }} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
          ))}
        </div>

        <div className="absolute top-20 left-20 w-64 h-64 bg-[#c9a96e]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#c9a96e]/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-700" />

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', borderRadius: '28px', border: '1px solid rgba(201,169,110,0.25)', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div className="text-center mb-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} style={{ width: '65px', height: '65px', background: 'rgba(201,169,110,0.15)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="18" fill="#c9a96e" opacity="0.3"/>
                  <line x1="18" y1="6" x2="18" y2="30" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="8" y1="12" x2="28" y2="12" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M8 12 L5 19 Q8 21 11 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
                  <path d="M28 12 L25 19 Q28 21 31 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
                  <path d="M14 30 H22" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#c9a96e', letterSpacing: '3px', marginBottom: '0.3rem', fontFamily: "'Playfair Display', 'Cinzel', serif" }}>Welcome Back</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Sign in to your account</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles className="w-4 h-4" /> {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: '14px', padding: '0 1rem' }}>
                  <Mail className="w-4 h-4 text-[#c9a96e]" />
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required autoComplete="new-password" style={{ width: '100%', padding: '13px 12px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: '14px', padding: '0 1rem' }}>
                  <Lock className="w-4 h-4 text-[#c9a96e]" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" style={{ width: '100%', padding: '13px 12px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.9rem' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{ marginTop: '0.5rem', padding: '13px', borderRadius: '14px', background: loading ? 'rgba(201,169,110,0.5)' : 'linear-gradient(135deg, #c9a96e, #e4c088)', color: '#0b1c3d', fontWeight: '700', fontSize: '0.9rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="text-center mt-6 pt-4 border-t border-[rgba(201,169,110,0.15)]">
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Don't have an account? <Link to="/register" style={{ color: '#c9a96e', textDecoration: 'none', fontWeight: '600' }}>Create Account</Link></p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } html, body { overflow: hidden; height: 100%; } @media (max-width: 768px) { div[style*="flex: 1"]:first-child { display: none !important; } }`}</style>
    </div>
  );
}