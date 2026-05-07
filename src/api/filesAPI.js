import api from './axiosConfig';

export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // تأكدي من اسم الحقل (قد يكون 'file' أو 'pdfFile')
  const response = await api.post('/Files/upload-pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  // استخراج رابط الملف من الاستجابة
  return response.data.data?.url || response.data.url || response.data.fileUrl;
};

export const uploadCover = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/Files/upload-cover', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data?.url || response.data.url || response.data.fileUrl;
};
// في ملف api/filesAPI.js
export const getFileUrl = (filename) => {
  return `/api/files/${filename}`; // أو أي منطق لبناء رابط الملف
};

// للحفاظ على التوافق مع الكود القديم (اختياري)
export const uploadFile = async (file, type) => {
  if (type === 'pdf') return uploadPdf(file);
  if (type === 'cover') return uploadCover(file);
  // تحديد تلقائي حسب نوع الملف
  if (file.type === 'application/pdf') return uploadPdf(file);
  return uploadCover(file);
};