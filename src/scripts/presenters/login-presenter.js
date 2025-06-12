import ApiService from '../api/api-service.js';
import NotificationService from '../services/notification-service.js';

class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async init() {
    if (ApiService.isAuthenticated()) {
      window.location.hash = '#/hasil-scan';
      return;
    }
    
    this.view.bindLoginForm(this.handleLogin.bind(this));
    this.view.bindRegisterForm(this.handleRegister.bind(this));
    this.view.bindTabSwitching();
  }

  async handleLogin(email, password) {
    if (!this.validateLoginForm(email, password)) return;
    
    try {
      this.view.showLoginLoading();
      
      const response = await ApiService.login(email, password);
      
      if (response.access_token) {
        try {
          const userData = await ApiService.getCurrentUser();
          localStorage.setItem('current_user', JSON.stringify(userData));
          
          NotificationService.showNotification({
            title: 'Login Berhasil',
            message: 'Selamat datang kembali!',
            type: 'success',
          });
        } catch (userError) {
          console.warn('Could not fetch user data:', userError);
        }
        
        window.location.hash = '#/hasil-scan';
      }
    } catch (error) {
      let msg = error.message;
      // Tangani error login dari API
      if (msg.toLowerCase().includes('login gagal') || msg.toLowerCase().includes('unauthorized') || msg.toLowerCase().includes('401')) {
        msg = 'Email atau password salah';
      } else if (msg.toLowerCase().includes('data login tidak valid')) {
        msg = 'Data login tidak valid';
      } else if (msg.toLowerCase().includes('tidak dapat terhubung')) {
        msg = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
      }
      this.view.showLoginError(msg);
    } finally {
      this.view.hideLoginLoading();
    }
  }

  async handleRegister(name, email, password, confirmPassword, agreeTerms) {
    if (!this.validateRegisterForm(name, email, password, confirmPassword, agreeTerms)) return;
    
    try {
      this.view.showRegisterLoading();
      
      const response = await ApiService.register(email, password);
      
      if (response.email) {
        this.view.showRegisterSuccess('Registrasi berhasil! Silakan login dengan akun baru Anda.');
        this.view.resetRegisterForm();
        
        setTimeout(() => {
          this.view.switchToLoginTab();
        }, 2000);
      }
    } catch (error) {
      // Tampilkan error register yang lebih spesifik
      let msg = error.message;
      if (msg.toLowerCase().includes('password salah')) {
        msg = 'Email sudah terdaftar';
      }
      this.view.showRegisterError(this.getErrorMessage(msg));
    } finally {
      this.view.hideRegisterLoading();
    }
  }

  validateLoginForm(email, password) {
    if (!email || !password) {
      this.view.showLoginError('Silakan isi semua field');
      return false;
    }
    
    if (!this.isValidEmail(email)) {
      this.view.showLoginError('Format email tidak valid');
      return false;
    }
    
    return true;
  }

  validateRegisterForm(name, email, password, confirmPassword, agreeTerms) {
    if (!name || !email || !password || !confirmPassword) {
      this.view.showRegisterError('Silakan isi semua field');
      return false;
    }
    
    if (!this.isValidEmail(email)) {
      this.view.showRegisterError('Format email tidak valid');
      return false;
    }
    
    if (password.length < 6) {
      this.view.showRegisterError('Password harus minimal 6 karakter');
      return false;
    }
    
    if (password !== confirmPassword) {
      this.view.showRegisterError('Password tidak cocok');
      return false;
    }
    
    if (!agreeTerms) {
      this.view.showRegisterError('Anda harus menyetujui syarat dan ketentuan');
      return false;
    }
    
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  getErrorMessage(errorMessage) {
    // Return the original error message if it's already user-friendly
    if (errorMessage.includes('Email atau password salah') ||
        errorMessage.includes('Email sudah terdaftar') ||
        errorMessage.includes('Data login tidak valid') ||
        errorMessage.includes('Tidak dapat terhubung ke server')) {
      return errorMessage;
    }
    
    // Fallback for other errors
    if (errorMessage.includes('401') || errorMessage.includes('credentials')) {
      return 'Email atau password salah';
    }
    if (errorMessage.includes('422') || errorMessage.includes('validation')) {
      return 'Data yang dimasukkan tidak valid';
    }
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    }
    
    return 'Terjadi kesalahan. Silakan coba lagi.';
  }
}

export default LoginPresenter;