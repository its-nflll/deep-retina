import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import AuthService from '../services/auth-service';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
    this._updateAuthUI();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  _updateAuthUI() {
    const loginLink = document.querySelector('a[href="#/login"]');
    const profileLink = document.querySelector('a[href="#/profile"]');
    const logoutButton = document.getElementById('logout-button');
    
    if (AuthService.isLoggedIn()) {
      // User is logged in
      if (loginLink) loginLink.style.display = 'none';
      if (profileLink) profileLink.style.display = 'block';
      
      // Create logout button if it doesn't exist
      if (!logoutButton && profileLink) {
        const newLogoutButton = document.createElement('button');
        newLogoutButton.id = 'logout-button';
        newLogoutButton.textContent = 'Logout';
        newLogoutButton.style.cssText = `
          background-color: #f44336;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
        `;
        
        newLogoutButton.addEventListener('click', () => {
          AuthService.logout();
          window.location.hash = '#/';
          this._updateAuthUI();
        });
        
        profileLink.parentNode.insertBefore(newLogoutButton, profileLink.nextSibling);
      }
    } else {
      // User is not logged in
      if (loginLink) loginLink.style.display = 'block';
      if (profileLink) profileLink.style.display = 'none';
      if (logoutButton) logoutButton.style.display = 'none';
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    // Tambahkan kelas untuk animasi fade out
    this.#content.classList.add('page-transition-out');
    
    // Tunggu animasi fade out selesai
    setTimeout(async () => {
      // Render konten baru
      this.#content.innerHTML = await page.render();
      
      // Reset scroll ke atas
      window.scrollTo(0, 0);
      
      // Hapus kelas fade out dan tambahkan fade in
      this.#content.classList.remove('page-transition-out');
      this.#content.classList.add('page-transition-in');
      
      // Jalankan afterRender setelah konten dimasukkan ke DOM
      await page.afterRender();
      
      // Perbarui UI autentikasi setelah render
      this._updateAuthUI();
      
      // Hapus kelas fade in setelah animasi selesai
      setTimeout(() => {
        this.#content.classList.remove('page-transition-in');
      }, 500);
    }, 300);
  }
}

export default App;
