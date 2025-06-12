import AuthService from '../services/auth-service';
import NotificationService from '../services/notification-service';
import ScanService from '../services/scan-service';
import ScanModel from '../models/scan-model';

class ProfilePresenter {
  constructor(view) {
    this.view = view;
    this.user = null;
    this.scanHistory = [];
  }

  async init() {
    if (!AuthService.isLoggedIn()) {
      window.location.hash = '#/login';
      return;
    }

    this.user = AuthService.getUser();
    this.view.renderUserProfile(this.user);

    this.view.bindUpdateProfileForm(this.handleUpdateProfile.bind(this));
    this.view.bindChangePasswordForm(this.handleChangePassword.bind(this));
    
    await this.loadScanHistory();
  }

  async loadScanHistory() {
    try {
      this.view.showHistoryLoading();
      
      // Untuk demo, gunakan simulasi
      // Dalam aplikasi nyata, ini akan memanggil ScanService.getScanHistory
      const response = await ScanService.simulateGetScanHistory();
      
      this.scanHistory = response.scans.map(scan => ScanModel.fromJson(scan));
        if (this.scanHistory.length === 0) {
        this.view.showNoHistory();
      } else {
        this.view.renderScanHistory(this.scanHistory);
      }
    } catch (error) {
      this.view.showHistoryError(error.message);
    } finally {
      this.view.hideHistoryLoading();
    }
  }

  async handleUpdateProfile(name, email) {
    if (!this._validateProfileForm(name, email)) return;
    
    try {
      this.view.showProfileUpdateLoading();
      
      // Untuk demo, gunakan timeout untuk simulasi loading
      // Dalam aplikasi nyata, ini akan memanggil AuthService.updateProfile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulasi update berhasil
      const updatedUser = {
        ...this.user,
        name,
        email,
      };
      
      AuthService.setUser(updatedUser);
      this.user = updatedUser;
      
      NotificationService.showNotification({
        title: 'Profil Diperbarui',
        message: 'Profil Anda berhasil diperbarui',
        type: 'success',
      });
      
      this.view.renderUserProfile(this.user);
    } catch (error) {
      this.view.showProfileUpdateError(error.message || 'Gagal memperbarui profil. Silakan coba lagi.');
    } finally {
      this.view.hideProfileUpdateLoading();
    }
  }

  async handleChangePassword(currentPassword, newPassword, confirmPassword) {
    if (!this._validatePasswordForm(currentPassword, newPassword, confirmPassword)) return;
    
    try {
      this.view.showPasswordUpdateLoading();
      
      // Untuk demo, gunakan timeout untuk simulasi loading
      // Dalam aplikasi nyata, ini akan memanggil AuthService.changePassword
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulasi update berhasil
      NotificationService.showNotification({
        title: 'Password Diperbarui',
        message: 'Password Anda berhasil diperbarui',
        type: 'success',
      });
      
      this.view.resetPasswordForm();
    } catch (error) {
      this.view.showPasswordUpdateError(error.message || 'Gagal memperbarui password. Silakan coba lagi.');
    } finally {
      this.view.hidePasswordUpdateLoading();    }
  }

  _validateProfileForm(name, email) {
    if (!name || !email) {
      this.view.showProfileUpdateError('Silakan isi semua field');
      return false;
    }
    
    if (!this._isValidEmail(email)) {
      this.view.showProfileUpdateError('Format email tidak valid');
      return false;
    }
    
    return true;
  }

  _validatePasswordForm(currentPassword, newPassword, confirmPassword) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      this.view.showPasswordUpdateError('Silakan isi semua field');
      return false;
    }
    
    if (newPassword.length < 6) {
      this.view.showPasswordUpdateError('Password baru harus minimal 6 karakter');
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      this.view.showPasswordUpdateError('Password baru tidak cocok');
      return false;
    }
    
    return true;
  }

  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default ProfilePresenter; 