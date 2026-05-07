import api from './axiosConfig';

// ─── GET ALL BOOKS ───────────────────────────────────────────
export const getBooks = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search)        params.append('search',        filters.search);
    if (filters.categoryId)    params.append('categoryId',    filters.categoryId);
    if (filters.lawField)      params.append('lawField',      filters.lawField);
    if (filters.academicLevel) params.append('academicLevel', filters.academicLevel);
    if (filters.page)          params.append('page',          filters.page);
    if (filters.pageSize)      params.append('pageSize',      filters.pageSize);

    const response = await api.get(`/Books?${params}`);
    const data = response.data;

    if (data?.data?.items) return data.data.items;
    if (data?.data)        return data.data;
    if (data?.items)       return data.items;
    if (Array.isArray(data)) return data;
    return [];
  } catch (error) {
    console.error("Get books error:", error);
    return [];
  }
};

// ─── GET SINGLE BOOK ─────────────────────────────────────────
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/Books/${id}`);
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error("Get book error:", error);
    return null;
  }
};

// ─── CREATE BOOK ─────────────────────────────────────────────
export const createBook = async (bookData) => {
  try {
    const payload = {
      title:          bookData.title,
      titleAr:        bookData.titleAr,
      description:    bookData.description,
      author:         bookData.author,
      professor:      bookData.professor,
      academicLevel:  bookData.academicLevel,
      lawField:       bookData.lawField,
      categoryId:     parseInt(bookData.categoryId),
      isPublished:    bookData.isPublished ?? true,
      pdfPath:        bookData.pdfUrl,
      coverImagePath: bookData.coverImageUrl
    };

    const response = await api.post('/Books', payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Create book error:", error);
    throw error;
  }
};

// ─── UPDATE BOOK ─────────────────────────────────────────────
export const updateBook = async (id, bookData) => {
  try {
    const payload = {
      title:          bookData.title,
      titleAr:        bookData.titleAr,
      description:    bookData.description,
      author:         bookData.author,
      professor:      bookData.professor,
      academicLevel:  bookData.academicLevel,
      lawField:       bookData.lawField,
      categoryId:     parseInt(bookData.categoryId),
      isPublished:    bookData.isPublished ?? true,
      pdfPath:        bookData.pdfUrl,
      coverImagePath: bookData.coverImageUrl
    };

    const response = await api.put(`/Books/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Update book error:", error);
    throw error;
  }
};

// ─── DELETE BOOK ─────────────────────────────────────────────
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/Books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete book error:", error);
    throw error;
  }
};

// ─── DASHBOARD STATS ─────────────────────────────────────────
export const getStats = async () => {
  try {
    const response = await api.get('/Books/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error("Get stats error:", error);
    return { success: false, data: null };
  }
};

// ─── RECORD DOWNLOAD ─────────────────────────────────────────
export const recordDownload = async (id) => {
  try {
    const response = await api.post(`/Books/${id}/download`);
    return response.data;
  } catch (error) {
    console.error("Record download error:", error);
  }
};

// ─── RECORD READ ─────────────────────────────────────────────
export const recordRead = async (id) => {
  try {
    const response = await api.post(`/Books/${id}/read`);
    return response.data;
  } catch (error) {
    console.error("Record read error:", error);
  }
};