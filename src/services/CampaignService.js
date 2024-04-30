import apiClient from '../apiClient';

class CampaignService {
  async getRecommendedCampaigns() {
    try {
      const response = await apiClient.get('/api/campaigns/recommend');
      return response.data;
    } catch (error) {
      console.error('Error fetching total campaigns:', error);
      throw error;
    }
  }

  async getCampaigns(page, size, sortBy, isAsc, searchTerm = '') {
    try {
      // 검색어가 있는 경우 검색 파라미터를 추가
      const searchParam = searchTerm ? `&keyword=${searchTerm}` : ''; // 'search'를 'keyword'로 수정
      // API 요청 URL에 검색 및 정렬 파라미터 포함
      const response = await apiClient.get(`/api/campaigns?page=${page}&size=${size}&sortBy=${sortBy}&isAsc=${isAsc}${searchParam}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }



  async getCampaignById(campaignId) {
    try {
      const response = await apiClient.get(`/api/campaigns/${campaignId}`);
      return response.data; // 데이터 반환
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw error; // 에러 처리
    }
  }

  async createCampaign(formData) {
    try {
      const response = await apiClient.post('/api/campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  async updateCampaign(campaignId, formData) {
    try {
      const response = await apiClient.put(`/api/campaigns/${campaignId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }



  async deleteCampaign(campaignId) {
    try {
      const response = await apiClient.delete(`/api/campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  }
}

const campaignService = new CampaignService();
export default campaignService;
