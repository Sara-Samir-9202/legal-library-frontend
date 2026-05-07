import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { getStats } from '../api/statsApi';
import { BookOpen, FolderTree, Download, Eye, Users, TrendingUp, Sparkles, Activity, Award, BarChart3, Globe, BookMarked } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCategories: 0,
    totalDownloads: 0,
    totalOnlineReads: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getStats();
        setStats(res);
        // تشغيل العداد المتحرك
        Object.keys(res).forEach(key => {
          animateNumber(res[key], (value) => {
            setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(value) }));
          });
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const animateNumber = (target, callback) => {
    let start = 0;
    const duration = 1000;
    const step = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = progress * target;
      callback(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    let startTime = performance.now();
    requestAnimationFrame(step);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#c9a96e]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <BookOpen size={24} className="text-[#c9a96e] animate-pulse" />
        </div>
      </div>
    </div>
  );

  const cards = [
    { label: 'Total Books', value: stats.totalBooks, icon: BookOpen, gradient: 'from-blue-500/20 to-indigo-500/10', color: '#3b82f6' },
    { label: 'Total Categories', value: stats.totalCategories, icon: FolderTree, gradient: 'from-emerald-500/20 to-teal-500/10', color: '#10b981' },
    { label: 'Total Downloads', value: stats.totalDownloads, icon: Download, gradient: 'from-amber-500/20 to-orange-500/10', color: '#f59e0b' },
    { label: 'Online Reads', value: stats.totalOnlineReads, icon: Eye, gradient: 'from-purple-500/20 to-pink-500/10', color: '#8b5cf6' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, gradient: 'from-rose-500/20 to-red-500/10', color: '#ef4444' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Creative Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{ y: [null, -100, 100, -50, 50, 0], x: [null, 50, -50, 30, -30, 0] }}
            transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, repeatType: "reverse" }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-center">
                <Award size={24} className="text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', 'Cinzel', serif" }}>
                  Admin Dashboard
                </h1>
               
              </div>
              <p className="text-white/40 text-sm mt-1 ml-1">Welcome back, Admin — here's what's happening in your library today.</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards Grid - متحركة وجذابة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative rounded-2xl p-5 overflow-hidden group backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, rgba(15,25,45,0.9) 0%, rgba(25,35,55,0.8) 100%)`,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${card.color}40, ${card.color}00)`,
                }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${card.color}15` }}
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <card.icon size={26} color={card.color} />
                </motion.div>
                
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{card.label}</p>
                
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    className="text-4xl font-bold text-white"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    {card.value ?? 0}
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <TrendingUp size={16} className="text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((card.value / 100) * 100, 100)}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}80)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Advanced Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Most Popular Category */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl p-6 backdrop-blur-sm group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(25,35,55,0.6) 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Globe size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs">Most Popular</p>
                <p className="text-white font-semibold">Criminal Law</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Total books</span>
              <span className="text-amber-400 font-bold text-xl">24</span>
            </div>
            <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" style={{ width: '75%' }} />
            </div>
          </motion.div>

          {/* Monthly Growth */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-2xl p-6 backdrop-blur-sm group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(25,35,55,0.6) 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <BarChart3 size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs">Monthly Growth</p>
                <p className="text-white font-semibold">+12% this month</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">New users</span>
              <span className="text-amber-400 font-bold text-xl">145</span>
            </div>
            <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: '68%' }} />
            </div>
          </motion.div>

          {/* Top Reader */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="rounded-2xl p-6 backdrop-blur-sm group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(15,25,45,0.8) 0%, rgba(25,35,55,0.6) 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <BookMarked size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs">Top Reader</p>
                <p className="text-white font-semibold">Sara Samir </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Books read</span>
              <span className="text-amber-400 font-bold text-xl">47</span>
            </div>
            <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style={{ width: '82%' }} />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity Section - محسّن */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="rounded-2xl p-6 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(15,25,45,0.7) 0%, rgba(25,35,55,0.5) 100%)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Activity size={18} className="text-amber-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
          </div>
          
          <div className="space-y-3">
            {[
              { label: 'New books added this month', value: stats.totalBooks, icon: BookOpen, change: '+8' },
              { label: 'Total category count', value: stats.totalCategories, icon: FolderTree, change: '+2' },
              { label: 'Total user registrations', value: stats.totalUsers, icon: Users, change: '+15' },
              { label: 'Downloads this week', value: Math.floor(stats.totalDownloads * 0.2), icon: Download, change: '+24' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition">
                    <item.icon size={14} className="text-amber-400" />
                  </div>
                  <span className="text-white/60 text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">{item.value ?? 0}</span>
                  <span className="text-xs text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">{item.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}