import apiClient from '../apiClient';
import Cookies from 'js-cookie';

class AuthService {
  // 로그인 요청을 보내는 메소드
  async login(email, password) {
    try {
      // 쿠키에서 토큰 제거
      Cookies.remove('Authorization');

      const response = await apiClient.post('/api/users/login', { email, password });

      return response.data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  }

  // 회원가입 요청을 보내는 메소드
  async signup(userData) {
    try {
      const response = await apiClient.post('/api/users/signup', userData);
      return response.data;
    } catch (error) {
      console.error("Signup error", error);
      throw error;
    }
  }

  // 로그아웃 메소드
  logout() {
    // 쿠키에서 토큰 제거
    Cookies.remove('Authorization');
    // 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  }

  // 현재 로그인한 사용자 정보를 가져오는 메소드
  async getCurrentUser() {
    const token = Cookies.get('Authorization');
    if (!token) {
      return null; // 토큰이 없으면 null 반환
    }

    try {
      const response = await apiClient.get('/api/users/profile', {
        headers: { Authorization: token },
      });
      return response.data; // 사용자 정보 반환
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
