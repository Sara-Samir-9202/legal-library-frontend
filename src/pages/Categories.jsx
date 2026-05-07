import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/CategoriesApi';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nameEn: '', nameAr: '', description: '', lawField: '' });
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nameEn: form.nameEn,
      nameAr: form.nameAr,
      description: form.description,
      lawField: form.lawField,
    };
    try {
      if (editing) {
        await updateCategory(editing.id, payload);
      } else {
        await createCategory(payload);
      }
      setEditing(null);
      setForm({ nameEn: '', nameAr: '', description: '', lawField: '' });
      fetchCategories();
    } catch (err) {
      console.error('Error:', err.response?.data);
      alert(err.response?.data?.message || 'حدث خطأ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete category?')) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setForm({
      nameEn: cat.nameEn || '',
      nameAr: cat.nameAr || '',
      description: cat.description || '',
      lawField: cat.lawField || '',
    });
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ nameEn: '', nameAr: '', description: '', lawField: '' });
  };

  return (
    <div style={{ backgroundColor: 'var(--light)', minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: 'var(--primary)' }}
        >
          Categories Management
        </h1>

        {/* Form Card */}
        <div 
          className="rounded-xl shadow-md overflow-hidden mb-8"
          style={{ backgroundColor: 'white', border: `1px solid rgba(11,28,61,0.1)` }}
        >
          <form onSubmit={handleSubmit} className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name (English)"
                value={form.nameEn}
                onChange={e => setForm({ ...form, nameEn: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(11,28,61,0.2)',
                  backgroundColor: 'white',
                  color: 'var(--dark)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(11,28,61,0.2)'}
                required
              />
              <input
                type="text"
                placeholder="الاسم بالعربي"
                value={form.nameAr}
                onChange={e => setForm({ ...form, nameAr: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(11,28,61,0.2)',
                  backgroundColor: 'white',
                  color: 'var(--dark)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(11,28,61,0.2)'}
                required
              />
              <input
                type="text"
                placeholder="Law Field (e.g., Criminal, Civil)"
                value={form.lawField}
                onChange={e => setForm({ ...form, lawField: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(11,28,61,0.2)',
                  backgroundColor: 'white',
                  color: 'var(--dark)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(11,28,61,0.2)'}
                required
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'rgba(11,28,61,0.2)',
                  backgroundColor: 'white',
                  color: 'var(--dark)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(11,28,61,0.2)'}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-5 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--primary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {editing ? 'Update Category' : 'Add Category'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--dark)',
                    border: `1px solid var(--dark)`,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Categories List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg font-medium animate-pulse" style={{ color: 'var(--primary)' }}>
              Loading...
            </div>
          </div>
        ) : (
          <div 
            className="rounded-xl overflow-hidden shadow-md"
            style={{ backgroundColor: 'white', border: `1px solid rgba(11,28,61,0.1)` }}
          >
            {categories.map((cat, idx) => (
              <div 
                key={cat.id} 
                className="flex flex-wrap sm:flex-row justify-between items-center p-4 transition-all duration-200 hover:bg-amber-50"
                style={{ 
                  borderBottom: idx !== categories.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  backgroundColor: idx % 2 === 0 ? 'white' : 'rgba(11,28,61,0.02)'
                }}
              >
                <div className="flex-1">
                  <strong style={{ color: 'var(--primary)' }}>{cat.nameEn}</strong>
                  {cat.nameAr && (
                    <span className="mr-2 text-sm" style={{ color: 'var(--secondary)' }}>
                      ({cat.nameAr})
                    </span>
                  )}
                  {cat.lawField && (
                    <span className="text-sm ml-2 opacity-70" style={{ color: 'var(--dark)' }}>
                      - {cat.lawField}
                    </span>
                  )}
                  {cat.description && (
                    <p className="text-xs mt-1 opacity-60" style={{ color: 'var(--dark)' }}>
                      {cat.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      backgroundColor: 'var(--secondary)',
                      color: 'var(--primary)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="text-center py-8" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                📂 No categories found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}