import CONFIG from '../config.js';

class ApiService {
  static async fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('access_token');
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.headers,
      },
    });
  }

  static async get(endpoint) {
    const response = await this.fetchWithToken(`${CONFIG.BASE_URL}${endpoint}`);
    return this._processResponse(response);
  }

  static async post(endpoint, data) {
    const response = await this.fetchWithToken(`${CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return this._processResponse(response);
  }

  static async postFormUrlEncoded(endpoint, data) {
    const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data),
    });
    return this._processResponse(response);
  }

  static async postFormData(endpoint, formData) {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });
    return this._processResponse(response);
  }

  static async put(endpoint, data) {
    const response = await this.fetchWithToken(`${CONFIG.BASE_URL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return this._processResponse(response);
  }

  static async delete(endpoint) {
    const response = await this.fetchWithToken(`${CONFIG.BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return this._processResponse(response);
  }
  // Authentication methods
  static async register(email, password) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Registrasi gagal';
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.detail || errorJson.message || errorMessage;
          
          // Handle specific registration errors
          if (errorMessage.toLowerCase().includes('already') || 
              errorMessage.toLowerCase().includes('exists')) {
            errorMessage = 'Email sudah terdaftar';
          }
        } catch (e) {
          // If not JSON, use status-based message
          if (response.status === 422) {
            errorMessage = 'Email sudah terdaftar atau data tidak valid';
          }
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error('Tidak dapat terhubung ke server');
      }
      throw error;
    }
  }
  static async login(username, password) {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.TOKEN}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Login gagal';
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.detail || errorJson.message || errorMessage;
        } catch (e) {
          // If not JSON, use status-based message
          if (response.status === 401) {
            errorMessage = 'Email atau password salah';
          } else if (response.status === 422) {
            errorMessage = 'Data login tidak valid';
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Store token if login successful
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token_type', data.token_type || 'bearer');
      }

      return data;
    } catch (error) {
      // Re-throw with appropriate message
      if (error.message.includes('fetch')) {
        throw new Error('Tidak dapat terhubung ke server');
      }
      throw error;
    }
  }

  static async getCurrentUser() {
    return this.get(CONFIG.ENDPOINTS.USERS_ME);
  }

  // Prediction methods
  static async predictRetinopathy(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.postFormData(CONFIG.ENDPOINTS.PREDICT, formData);
  }

  static async getPredictionHistory() {
    return this.get(CONFIG.ENDPOINTS.HISTORY);
  }

  // Utility methods
  static logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
  }

  static isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }

  static getDRClassDescription(classNumber) {
    return CONFIG.DR_CLASSES[classNumber] || 'Unknown';
  }

  static async _processResponse(response) {
    if (response.status === 204) {
      return null;
    }
    
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    }
    throw new Error(responseJson.detail || responseJson.message || 'Terjadi kesalahan pada server');
  }
}

export default ApiService;