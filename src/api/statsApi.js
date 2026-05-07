import api from './axiosConfig';

export const getStats = async () => {
  try {
    const response = await api.get('/Books/dashboard/stats'); // ✅ الـ endpoint الصح
    return response.data?.data || response.data;
  } catch (error) {
    console.error('Get stats error:', error);
    return {
      totalBooks: 0,
      totalCategories: 0,
      totalDownloads: 0,
      totalOnlineReads: 0,
      totalUsers: 0
    };
  }
};