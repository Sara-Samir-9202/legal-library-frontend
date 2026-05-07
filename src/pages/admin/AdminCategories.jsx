import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Search, X, Sparkles, FolderTree, TrendingUp } from 'lucide-react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const categoryImages = {
  'Criminal Law': '/images/categories/criminal.jpg',
  'Civil Law': '/images/categories/civil.jpg',
  'Commercial Law': '/images/categories/commercial.jpg',
  'Constitutional Law': '/images/categories/constitution.jpg',
  'Administrative Law': '/images/categories/admin.jpg',
  'Jurisprudence': '/images/categories/jurisprudence.jpg',
  'International Law': '/images/categories/international.jpg',
  'Human Rights Law': '/images/categories/human-rights.jpg',
  'Labor Law': '/images/categories/labor.jpg',
  'Family Law': '/images/categories/family.jpg',
  'Environmental Law': '/images/categories/environment.jpg',
  'Tax Law': '/images/categories/tax.jpg',
  'Cyber Law': '/images/categories/cyber.jpg',
  'Medical Law': '/images/categories/medical.jpg',
  'Intellectual Property': '/images/categories/ip.jpg',
};

export default function AdminCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({ 
    nameEn: '', 
    description: '', 
    lawField: '',
    imageUrl: '' 
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/Categories');
      const data = res.data?.data || res.data || [];
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      await api.delete(`/Categories/${id}`);
      fetchCategories();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      imageUrl: formData.imageUrl || categoryImages[formData.nameEn] || '/images/categories/default.jpg'
    };
    if (editingCat) {
      await api.put(`/Categories/${editingCat.id}`, submitData);
    } else {
      await api.post('/Categories', submitData);
    }
    setShowModal(false);
    setEditingCat(null);
    setFormData({ nameEn: '', description: '', lawField: '', imageUrl: '' });
    fetchCategories();
  };

  const getImageUrl = (cat) => {
    if (cat.imageUrl) return cat.imageUrl;
    return categoryImages[cat.nameEn] || '/images/categories/default.jpg';
  };

  const filtered = categories.filter(c => c.nameEn?.toLowerCase().includes(search.toLowerCase()));

  // Animated letters for title
  const titleLetters = ['C', 'a', 't', 'e', 'g', 'o', 'r', 'i', 'e', 's', ' ', 'M', 'a', 'n', 'a', 'g', 'e', 'm', 'e', 'n', 't'];

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#c9a96e]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FolderTree size={20} className="text-[#c9a96e] animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section - Animated */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-12 text-center"
        >
          <div className="mb-4">
            <div className="flex justify-center gap-1 flex-wrap">
              {titleLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="text-4xl md:text-5xl font-bold inline-block"
                  style={{ 
                    color: '#0b1c3d', 
                    fontFamily: "'Playfair Display', 'Cinzel', serif",
                    textShadow: '2px 2px 4px rgba(0,0,0,0.05)'
                  }}
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
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-500 text-sm"
          >
            Organize your library by legal fields and topics
          </motion.p>
        </motion.div>

        {/* Search + Add - Animated */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
        >
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 shadow-sm"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: ['0px 0px 0px rgba(245, 158, 11, 0)', '0px 0px 20px rgba(245, 158, 11, 0.3)', '0px 0px 0px rgba(245, 158, 11, 0)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => { setEditingCat(null); setFormData({ nameEn: '', description: '', lawField: '', imageUrl: '' }); setShowModal(true); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Plus size={18} /> Add Category
          </motion.button>
        </motion.div>

        {/* Categories Grid - Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ delay: index * 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <motion.img
                    src={getImageUrl(cat)}
                    alt={cat.nameEn}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => { e.target.src = '/images/categories/default.jpg'; }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">{cat.nameEn}</h3>
                     
                    </div>
                    <div className="flex gap-1 ml-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setEditingCat(cat); setFormData({ ...cat, imageUrl: getImageUrl(cat) }); setShowModal(true); }}
                        className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
                      >
                        <Edit size={14} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mt-2">{cat.description || 'No description'}</p>
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

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FolderTree size={32} className="text-gray-300" />
            </motion.div>
            <p className="text-gray-400 text-lg">No categories found</p>
          </motion.div>
        )}

        {/* Modal - كريتيف */}
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
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingCat ? 'Edit Category' : 'Add New Category'}
                  </h2>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Image Preview */}
              {(formData.imageUrl || categoryImages[formData.nameEn]) && (
                <div className="mb-4">
                  <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-amber-200">
                    <img
                      src={formData.imageUrl || categoryImages[formData.nameEn]}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/images/categories/default.jpg'; }}
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="text-[10px] bg-black/50 text-white px-2 py-1 rounded-full">Preview</span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name (English) *"
                  value={formData.nameEn}
                  onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  required
                />
                <textarea
                  placeholder="Description"
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition resize-none"
                />
                <input
                  type="text"
                  placeholder="Law Field"
                  value={formData.lawField}
                  onChange={e => setFormData({ ...formData, lawField: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                />
                <div>
                  <label className="text-gray-500 text-xs mb-1 block">Image URL (optional)</label>
                  <input
                    type="text"
                    placeholder="/images/categories/your-image.jpg"
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                  />
                  <p className="text-gray-400 text-[10px] mt-1">Leave empty to use default image based on name</p>
                </div>
                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {editingCat ? 'Update Category' : 'Save Category'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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