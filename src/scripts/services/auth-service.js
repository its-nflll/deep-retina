import ApiService from '../api/api-service';
import CONFIG from '../config';

class AuthService {
  static TOKEN_KEY = 'access_token';
  static USER_KEY = 'user';

  static setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static setUser(user) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser() {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static removeUser() {
    localStorage.removeItem(this.USER_KEY);
  }

  static isLoggedIn() {
    return !!this.getToken();
  }

  static async register(email, password) {
    try {
      const response = await ApiService.register(email, password);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registrasi gagal. Silakan coba lagi.');
    }
  }

  static async login(email, password) {
    try {
      const response = await ApiService.login(email, password);
      
      this.setToken(response.access_token);
      
      // Get user data after login
      const userData = await this.getCurrentUser();
      this.setUser(userData);
      
      return { token: response.access_token, user: userData };
    } catch (error) {
      throw new Error(error.message || 'Login gagal. Silakan coba lagi.');
    }
  }

  static async getCurrentUser() {
    try {
      return await ApiService.getCurrentUser();
    } catch (error) {
      throw new Error(error.message || 'Gagal mendapatkan data user.');
    }
  }

  static async register(userData) {
    try {
      const response = await ApiService.post(`${CONFIG.ENDPOINTS.AUTH}/register`, userData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registrasi gagal. Silakan coba lagi.');
    }
  }

  static logout() {
    this.removeToken();
    this.removeUser();
  }

  static async validateToken() {
    try {
      if (!this.getToken()) return false;
      const response = await ApiService.get(`${CONFIG.ENDPOINTS.AUTH}/validate`);
      return response.valid;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  static async updateProfile(userData) {
    try {
      const response = await ApiService.put(`${CONFIG.ENDPOINTS.USERS}/profile`, userData);
      
      // Update user in local storage
      const currentUser = this.getUser();
      const updatedUser = { ...currentUser, ...response.user };
      this.setUser(updatedUser);
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Gagal memperbarui profil. Silakan coba lagi.');
    }
  }

  static async changePassword(currentPassword, newPassword) {
    try {
      const response = await ApiService.put(`${CONFIG.ENDPOINTS.USERS}/password`, {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengubah password. Silakan coba lagi.');
    }
  }
}

export default AuthService; 