import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center px-6 py-3 shadow-lg sticky top-0 z-10"
      style={{
        background: 'rgba(15,42,74,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-[#c9a96e]/20 rounded-full blur-md" />
          <div className="relative w-9 h-9 bg-[#c9a96e]/20 rounded-full flex items-center justify-center border border-[#c9a96e]/30">
            <User size={16} color="#c9a96e" />
          </div>
        </div>
        <div>
          <p className="text-[10px] text-white/40 tracking-wider">Welcome back</p>
          <p className="text-sm font-semibold" style={{ color: '#c9a96e' }}>{adminName}</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        style={{
          background: 'rgba(201,169,110,0.1)',
          color: '#c9a96e',
          border: '1px solid rgba(201,169,110,0.3)',
        }}
      >
        <LogOut size={14} />
        Logout
      </motion.button>
    </motion.header>
  );
}