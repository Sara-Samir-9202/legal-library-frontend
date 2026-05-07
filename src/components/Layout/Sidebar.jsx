import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FolderTree } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/books', icon: BookOpen, label: 'Books' },
    { to: '/admin/categories', icon: FolderTree, label: 'Categories' },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-72 flex flex-col shadow-2xl relative overflow-hidden"
      style={{
        background: 'rgba(11,28,61,0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(201,169,110,0.2)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 -right-20 w-40 h-40 bg-[#c9a96e]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-40 h-40 bg-[#c9a96e]/5 rounded-full blur-3xl" />

      {/* Logo / Brand */}
      <div className="relative p-6 text-center border-b" style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex justify-center mb-3"
        >
          <div className="w-16 h-16 bg-[#c9a96e]/20 rounded-2xl flex items-center justify-center border border-[#c9a96e]/30">
            <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#c9a96e" opacity="0.3"/>
              <line x1="18" y1="6" x2="18" y2="30" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="8" y1="12" x2="28" y2="12" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M8 12 L5 19 Q8 21 11 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
              <path d="M28 12 L25 19 Q28 21 31 19 Z" fill="none" stroke="#c9a96e" strokeWidth="1.5"/>
              <path d="M14 30 H22" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        </motion.div>
        <h2 className="text-xl font-bold tracking-wider" style={{ color: '#c9a96e', fontFamily: "'Playfair Display', 'Cinzel', serif" }}>
          MIZAN
        </h2>
        <p className="text-[10px] text-white/40 mt-1 tracking-wider">Admin Panel</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-5 space-y-2 relative z-10">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#c9a96e]/20 to-transparent border-l-2 border-[#c9a96e]'
                  : 'hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-[#c9a96e]' : 'text-white/50'} />
                <span className={`text-sm font-medium ${isActive ? 'text-[#c9a96e]' : 'text-white/70'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}