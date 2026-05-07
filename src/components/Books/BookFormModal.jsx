import { useState, useEffect } from 'react';
import { uploadPdf, uploadCover } from '../../api/filesAPI';

export default function BookFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories
}) {
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    description: '',
    author: '',
    professor: '',
    academicLevel: '',
    lawField: '',
    categoryId: '',
    isPublished: true,

    // ✅ IMPORTANT: match backend fields
    pdfPath: '',
    coverImagePath: ''
  });

  const [loading, setLoading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  // ───────── Load edit data ─────────
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        titleAr: initialData.titleAr || '',
        description: initialData.description || '',
        author: initialData.author || '',
        professor: initialData.professor || '',
        academicLevel: initialData.academicLevel || '',
        lawField: initialData.lawField || '',
        categoryId: initialData.categoryId || '',
        isPublished: initialData.isPublished ?? true,

        pdfPath: initialData.pdfPath || '',
        coverImagePath: initialData.coverImagePath || ''
      });
    } else {
      setFormData({
        title: '',
        titleAr: '',
        description: '',
        author: '',
        professor: '',
        academicLevel: '',
        lawField: '',
        categoryId: '',
        isPublished: true,
        pdfPath: '',
        coverImagePath: ''
      });
    }
  }, [initialData, isOpen]);

  // ───────── Handle input change ─────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ───────── Upload PDF ─────────
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPdf(true);

    try {
      const path = await uploadPdf(file);
      if (!path) throw new Error('Upload failed');

      setFormData(prev => ({
        ...prev,
        pdfPath: path
      }));

    } catch (err) {
      console.error(err);
      alert('PDF upload failed');
    } finally {
      setUploadingPdf(false);
    }
  };

  // ───────── Upload Cover ─────────
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingCover(true);

    try {
      const path = await uploadCover(file);
      if (!path) throw new Error('Upload failed');

      setFormData(prev => ({
        ...prev,
        coverImagePath: path
      }));

    } catch (err) {
      console.error(err);
      alert('Cover upload failed');
    } finally {
      setUploadingCover(false);
    }
  };

  // ───────── Submit ─────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
      alert(
        'Save failed: ' +
        (err?.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* ───── Header ───── */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        {/* ───── Form ───── */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              name="titleAr"
              placeholder="Title Arabic"
              value={formData.titleAr}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
            />

            <input
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              name="professor"
              placeholder="Professor"
              value={formData.professor}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <select
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <input
              name="lawField"
              placeholder="Law Field"
              value={formData.lawField}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameAr || cat.nameEn || cat.name}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              Published
            </label>

          </div>

          {/* ───── Uploads ───── */}
          <div className="border p-3 rounded space-y-3">

            {/* PDF */}
            <div>
              <label>PDF File:</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
              />

              {uploadingPdf && <p>Uploading PDF...</p>}

              {formData.pdfPath && (
                <p className="text-green-600 text-sm">
                  PDF ready ✓
                </p>
              )}
            </div>

            {/* Cover */}
            <div>
              <label>Cover Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
              />

              {uploadingCover && <p>Uploading cover...</p>}

              {formData.coverImagePath && (
                <p className="text-green-600 text-sm">
                  Cover ready ✓
                </p>
              )}
            </div>

          </div>

          {/* ───── Buttons ───── */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}