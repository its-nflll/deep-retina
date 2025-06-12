class ProfileView {  constructor() {
    this.nameElement = null;
    this.emailElement = null;
    this.createdAtElement = null;
    this.updateProfileForm = null;
    this.updateProfileButton = null;
    this.profileUpdateError = null;
    this.changePasswordForm = null;
    this.changePasswordButton = null;
    this.passwordUpdateError = null;
    this.historyLoading = null;
    this.historyTable = null;
    this.historyTableBody = null;
    this.noHistory = null;
  }

  getTemplate() {
    return `
      <section class="container" style="padding: 60px 0;">
        <h1 style="margin-bottom: 30px; text-align: center;">Profil Pengguna</h1>
        
        <div style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
          <div style="background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="margin-bottom: 20px; color: #38d1c0;">Informasi Profil</h2>
            
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 30px;">
              <div style="flex: 1; min-width: 250px;">
                <div style="margin-bottom: 15px;">
                  <h3 style="margin-bottom: 5px; font-size: 16px;">Nama</h3>
                  <p id="profile-name" style="font-size: 18px;">-</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <h3 style="margin-bottom: 5px; font-size: 16px;">Email</h3>
                  <p id="profile-email" style="font-size: 18px;">-</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <h3 style="margin-bottom: 5px; font-size: 16px;">Tanggal Bergabung</h3>
                  <p id="profile-created-at" style="font-size: 18px;">-</p>
                </div>
              </div>
            </div>
            
            <div style="margin-top: 20px;">
              <button id="edit-profile-toggle" style="background-color: #38d1c0; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
                Edit Profil
              </button>
            </div>
            
            <div id="update-profile-form" style="display: none; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <h3 style="margin-bottom: 15px; font-size: 18px;">Edit Profil</h3>
              
              <div id="profile-update-error" style="display: none; background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 20px;"></div>
              
              <div style="margin-bottom: 15px;">
                <label for="update-name" style="display: block; margin-bottom: 5px; font-weight: bold;">Nama</label>
                <input type="text" id="update-name" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
              
              <div style="margin-bottom: 15px;">
                <label for="update-email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email</label>
                <input type="email" id="update-email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
              </div>
              
              <button id="update-profile-button" style="background-color: #38d1c0; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
                Simpan Perubahan
              </button>
              <button id="cancel-profile-update" style="background-color: #f8f9fa; color: #333; border: 1px solid #ddd; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                Batal
              </button>
            </div>
          </div>
          
          <div style="background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="margin-bottom: 20px; color: #38d1c0;">Ubah Password</h2>
            
            <div id="password-update-error" style="display: none; background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 20px;"></div>
            
            <div style="margin-bottom: 15px;">
              <label for="current-password" style="display: block; margin-bottom: 5px; font-weight: bold;">Password Saat Ini</label>
              <input type="password" id="current-password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 15px;">
              <label for="new-password" style="display: block; margin-bottom: 5px; font-weight: bold;">Password Baru</label>
              <input type="password" id="new-password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <label for="confirm-password" style="display: block; margin-bottom: 5px; font-weight: bold;">Konfirmasi Password Baru</label>
              <input type="password" id="confirm-password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <button id="change-password-button" style="background-color: #38d1c0; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
              Ubah Password
            </button>
          </div>
            <div style="background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px; color: #38d1c0;">Riwayat Scan</h2>
            
            <div id="history-container" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
              <div id="history-loading" style="text-align: center; padding: 20px;">
                <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #38d1c0; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 10px;">Memuat riwayat scan...</p>
              </div>
              <table id="history-table" style="width: 100%; border-collapse: collapse; display: none;">                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Tanggal</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Diagnosis</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Tingkat</th>
                  </tr>
                </thead>
                <tbody id="history-table-body">
                  <!-- Riwayat scan akan dimuat di sini -->
                </tbody>
              </table>
              <div id="no-history" style="text-align: center; padding: 20px; display: none;">
                <p>Belum ada riwayat scan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
  }

  init() {
    this.nameElement = document.getElementById('profile-name');
    this.emailElement = document.getElementById('profile-email');
    this.createdAtElement = document.getElementById('profile-created-at');
    this.updateProfileForm = document.getElementById('update-profile-form');
    this.updateProfileButton = document.getElementById('update-profile-button');
    this.profileUpdateError = document.getElementById('profile-update-error');
    this.changePasswordForm = document.getElementById('change-password-form');
    this.changePasswordButton = document.getElementById('change-password-button');
    this.passwordUpdateError = document.getElementById('password-update-error');    this.historyLoading = document.getElementById('history-loading');
    this.historyTable = document.getElementById('history-table');
    this.historyTableBody = document.getElementById('history-table-body');
    this.noHistory = document.getElementById('no-history');
    
    // Toggle edit profile form
    const editProfileToggle = document.getElementById('edit-profile-toggle');
    const cancelProfileUpdate = document.getElementById('cancel-profile-update');
    
    if (editProfileToggle) {
      editProfileToggle.addEventListener('click', () => {
        this.updateProfileForm.style.display = 'block';
        
        // Pre-fill form with current values
        document.getElementById('update-name').value = this.nameElement.textContent;
        document.getElementById('update-email').value = this.emailElement.textContent;
      });
    }
    
    if (cancelProfileUpdate) {
      cancelProfileUpdate.addEventListener('click', () => {
        this.updateProfileForm.style.display = 'none';
      });
    }
  }

  renderUserProfile(user) {
    if (this.nameElement && this.emailElement && this.createdAtElement) {
      this.nameElement.textContent = user.name;
      this.emailElement.textContent = user.email;
      
      if (user.createdAt) {
        const date = new Date(user.createdAt);
        this.createdAtElement.textContent = date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      } else {
        this.createdAtElement.textContent = '-';
      }
    }
  }

  bindUpdateProfileForm(handler) {
    if (this.updateProfileButton) {
      this.updateProfileButton.addEventListener('click', () => {
        const name = document.getElementById('update-name').value;
        const email = document.getElementById('update-email').value;
        handler(name, email);
      });
    }
  }

  bindChangePasswordForm(handler) {
    if (this.changePasswordButton) {
      this.changePasswordButton.addEventListener('click', () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        handler(currentPassword, newPassword, confirmPassword);
      });
    }  }

  showProfileUpdateLoading() {
    if (this.updateProfileButton) {
      this.updateProfileButton.disabled = true;
      this.updateProfileButton.textContent = 'Menyimpan...';
    }
  }

  hideProfileUpdateLoading() {
    if (this.updateProfileButton) {
      this.updateProfileButton.disabled = false;
      this.updateProfileButton.textContent = 'Simpan Perubahan';
    }
  }

  showProfileUpdateError(message) {
    if (this.profileUpdateError) {
      this.profileUpdateError.textContent = message;
      this.profileUpdateError.style.display = 'block';
    }
  }

  hideProfileUpdateError() {
    if (this.profileUpdateError) {
      this.profileUpdateError.style.display = 'none';
    }
  }

  showPasswordUpdateLoading() {
    if (this.changePasswordButton) {
      this.changePasswordButton.disabled = true;
      this.changePasswordButton.textContent = 'Menyimpan...';
    }
  }

  hidePasswordUpdateLoading() {
    if (this.changePasswordButton) {
      this.changePasswordButton.disabled = false;
      this.changePasswordButton.textContent = 'Ubah Password';
    }
  }

  showPasswordUpdateError(message) {
    if (this.passwordUpdateError) {
      this.passwordUpdateError.textContent = message;
      this.passwordUpdateError.style.display = 'block';
    }
  }

  hidePasswordUpdateError() {
    if (this.passwordUpdateError) {
      this.passwordUpdateError.style.display = 'none';
    }
  }

  resetPasswordForm() {
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
  }

  showHistoryLoading() {
    if (this.historyLoading) {
      this.historyLoading.style.display = 'block';
    }
    if (this.historyTable) {
      this.historyTable.style.display = 'none';
    }
    if (this.noHistory) {
      this.noHistory.style.display = 'none';
    }
  }

  hideHistoryLoading() {
    if (this.historyLoading) {
      this.historyLoading.style.display = 'none';
    }
  }

  showNoHistory() {
    if (this.noHistory) {
      this.noHistory.style.display = 'block';
    }
    if (this.historyTable) {
      this.historyTable.style.display = 'none';
    }
  }

  showHistoryError(message) {
    if (this.noHistory) {
      this.noHistory.style.display = 'block';
      this.noHistory.innerHTML = `
        <p>Gagal memuat riwayat scan. <a href="#" id="retry-history" style="color: #38d1c0;">Coba lagi</a></p>
      `;
    }
    if (this.historyTable) {
      this.historyTable.style.display = 'none';
    }
  }

  renderScanHistory(scans) {
    if (this.historyTableBody && this.historyTable) {
      this.historyTableBody.innerHTML = '';
      
      scans.forEach(scan => {
        const row = document.createElement('tr');        row.innerHTML = `
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${scan.getFormattedDate()}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${scan.diagnosis}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${scan.severity}</td>
        `;
        this.historyTableBody.appendChild(row);
      });
        this.historyTable.style.display = 'table';
    }
  }
}

export default ProfileView;