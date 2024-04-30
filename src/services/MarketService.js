import apiClient from '../apiClient';

class MarketService {
  async getTotalMarkets() {
    try {
      const response = await apiClient.get('/api/markets/total');
      return response.data;
    } catch (error) {
      console.error('Error fetching total markets:', error);
      throw error;
    }
  }

  async getMarkets(page, size, sortBy, isAsc, searchTerm = '') {
    try {
      // 검색어가 있는 경우 검색 파라미터를 추가
      const searchParam = searchTerm ? `&keyword=${searchTerm}` : ''; // 'search'를 'keyword'로 수정
      // API 요청 URL에 검색 및 정렬 파라미터 포함
      const response = await apiClient.get(`/api/markets?page=${page}&size=${size}&sortBy=${sortBy}&isAsc=${isAsc}${searchParam}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching markets:', error);
      throw error;
    }
  }


  async getMarketById(marketId) {
    try {
      const response = await apiClient.get(`/api/markets/${marketId}`);
      return response; // 데이터 반환
    } catch (error) {
      console.error('Error fetching market:', error);
      throw error; // 에러 처리
    }
  }

  async createMarket(formData) {
    try {
      const response = await apiClient.post('/api/markets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating market:', error);
      throw error;
    }
  }

  async updateMarket(marketId, formData) {
    try {
      const response = await apiClient.put(`/api/markets/${marketId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating market:', error);
      throw error;
    }
  }



  async deleteMarket(marketId) {
    try {
      const response = await apiClient.delete(`/api/markets/${marketId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting market:', error);
      throw error;
    }
  }
}

const marketService = new MarketService();
export default marketService;
