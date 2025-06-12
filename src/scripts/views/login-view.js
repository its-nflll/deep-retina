class LoginView {
  constructor() {
    this.loginTab = null;
    this.registerTab = null;
    this.loginForm = null;
    this.registerForm = null;
    this.loginButton = null;
    this.registerButton = null;
    this.loginError = null;
    this.registerError = null;
    this.registerSuccess = null;
  }

  getTemplate() {
    return `
      <section class="container" style="padding: 60px 0;">
        <div style="max-width: 800px; margin: 0 auto;">
          <div style="display: flex; gap: 20px; margin-bottom: 30px;">
            <button id="login-tab" class="active-tab" style="flex: 1; padding: 15px; background-color: #38d1c0; color: white; border: none; border-radius: 4px 4px 0 0; font-weight: bold; cursor: pointer;">Login</button>
            <button id="register-tab" style="flex: 1; padding: 15px; background-color: #f8f9fa; color: #333; border: none; border-radius: 4px 4px 0 0; font-weight: bold; cursor: pointer;">Register</button>
          </div>
          
          <div id="login-form" style="background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px; text-align: center; color: #38d1c0;">Login ke Akun Anda</h2>
            
            <div id="login-error" style="display: none; background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 20px;"></div>
            
            <div style="margin-bottom: 20px;">
              <label for="login-email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email</label>
              <input type="email" id="login-email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <label for="login-password" style="display: block; margin-bottom: 5px; font-weight: bold;">Password</label>
              <input type="password" id="login-password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Ingat saya</label>
              </div>
              <a href="#" style="color: #38d1c0; text-decoration: none;">Lupa password?</a>
            </div>
            
            <button id="login-button" style="width: 100%; padding: 12px; background-color: #38d1c0; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Login</button>
          </div>
          
          <div id="register-form" style="display: none; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 20px; text-align: center; color: #38d1c0;">Buat Akun Baru</h2>
            
            <div id="register-error" style="display: none; background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 20px;"></div>
            <div id="register-success" style="display: none; background-color: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 20px;"></div>
            
            <div style="margin-bottom: 20px;">
              <label for="register-name" style="display: block; margin-bottom: 5px; font-weight: bold;">Nama Lengkap</label>
              <input type="text" id="register-name" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <label for="register-email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email</label>
              <input type="email" id="register-email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <label for="register-password" style="display: block; margin-bottom: 5px; font-weight: bold;">Password</label>
              <input type="password" id="register-password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <label for="register-confirm-password" style="display: block; margin-bottom: 5px; font-weight: bold;">Konfirmasi Password</label>
              <input type="password" id="register-confirm-password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <input type="checkbox" id="agree-terms">
              <label for="agree-terms">Saya setuju dengan <a href="#" style="color: #38d1c0;">Syarat dan Ketentuan</a></label>
            </div>
            
            <button id="register-button" style="width: 100%; padding: 12px; background-color: #38d1c0; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Register</button>
          </div>
        </div>
      </section>
    `;
  }

  init() {
    this.loginTab = document.getElementById('login-tab');
    this.registerTab = document.getElementById('register-tab');
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');
    this.loginButton = document.getElementById('login-button');
    this.registerButton = document.getElementById('register-button');
    this.loginError = document.getElementById('login-error');
    this.registerError = document.getElementById('register-error');
    this.registerSuccess = document.getElementById('register-success');
  }

  bindTabSwitching() {
    if (this.loginTab && this.registerTab) {
      this.loginTab.addEventListener('click', () => {
        this.switchToLoginTab();
      });
      
      this.registerTab.addEventListener('click', () => {
        this.switchToRegisterTab();
      });
    }
  }

  switchToLoginTab() {
    this.loginTab.style.backgroundColor = '#38d1c0';
    this.loginTab.style.color = 'white';
    this.registerTab.style.backgroundColor = '#f8f9fa';
    this.registerTab.style.color = '#333';
    
    this.loginForm.style.display = 'block';
    this.registerForm.style.display = 'none';
  }

  switchToRegisterTab() {
    this.registerTab.style.backgroundColor = '#38d1c0';
    this.registerTab.style.color = 'white';
    this.loginTab.style.backgroundColor = '#f8f9fa';
    this.loginTab.style.color = '#333';
    
    this.registerForm.style.display = 'block';
    this.loginForm.style.display = 'none';
  }

  bindLoginForm(handler) {
    if (this.loginButton) {
      this.loginButton.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        handler(email, password);
      });
      
      // Tambahkan event listener untuk Enter key pada form login
      document.getElementById('login-email').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          handler(email, password);
        }
      });
      
      document.getElementById('login-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          handler(email, password);
        }
      });
    }
  }

  bindRegisterForm(handler) {
    if (this.registerButton) {
      this.registerButton.addEventListener('click', () => {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        handler(name, email, password, confirmPassword, agreeTerms);
      });
    }
  }

  showLoginError(message) {
    this.loginError.textContent = message;
    this.loginError.style.display = 'block';
  }

  showRegisterError(message) {
    this.registerError.textContent = message;
    this.registerError.style.display = 'block';
  }

  showRegisterSuccess(message) {
    this.registerSuccess.textContent = message;
    this.registerSuccess.style.display = 'block';
  }

  showLoginLoading() {
    this.loginButton.disabled = true;
    this.loginButton.textContent = 'Loading...';
  }

  hideLoginLoading() {
    this.loginButton.disabled = false;
    this.loginButton.textContent = 'Login';
  }

  showRegisterLoading() {
    this.registerButton.disabled = true;
    this.registerButton.textContent = 'Loading...';
  }

  hideRegisterLoading() {
    this.registerButton.disabled = false;
    this.registerButton.textContent = 'Register';
  }

  resetRegisterForm() {
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
    document.getElementById('agree-terms').checked = false;
  }
}

export default LoginView; 