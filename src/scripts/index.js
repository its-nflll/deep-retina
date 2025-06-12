// CSS imports
import '../styles/styles.css';

import App from './pages/app';

// Register service worker for PWA functionality only in production mode
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
} else if ('serviceWorker' in navigator) {
  // Always unregister service workers in non-production environment
  window.addEventListener('load', () => {
    // Unregister all service workers
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
        console.log('Service Worker unregistered for development mode');
      }
      // Clear browser cache for this origin to prevent looping issues
      if (window.caches) {
        window.caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              console.log(`Deleting cache: ${cacheName}`);
              return caches.delete(cacheName);
            })
          );
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  
  // Initialize navigation
  updateNavigation();
  
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    updateNavigation();
    await app.renderPage();
  });

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > 50) {
      // When scrolled down more than 50px, add scrolled class
      header.classList.add('scrolled');
    } else {
      // When at top or near top, remove scrolled class
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });
});

// Function to update navigation based on authentication status
function updateNavigation() {
  const navList = document.querySelector('#nav-list');
  const isAuthenticated = !!localStorage.getItem('access_token');
  
  if (navList) {
    if (isAuthenticated) {
      // User is logged in - show user menu
      const currentUser = JSON.parse(localStorage.getItem('current_user') || '{}');
      navList.innerHTML = `
        <li><a href="#/"><i class="fas fa-home"></i> Beranda</a></li>
        <li><a href="#/tentang"><i class="fas fa-info-circle"></i> Tentang Kami</a></li>
        <li><a href="#/hasil-scan"><i class="fas fa-eye"></i> Hasil Scan</a></li>
        <li><a href="#" id="logout-btn" class="login-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
      `;
      
      // Add logout functionality
      const logoutBtn = document.querySelector('#logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          logout();
        });
      }
    } else {
      // User is not logged in - show login menu
      navList.innerHTML = `
        <li><a href="#/"><i class="fas fa-home"></i> Beranda</a></li>
        <li><a href="#/tentang"><i class="fas fa-info-circle"></i> Tentang Kami</a></li>
        <li><a href="#/hasil-scan"><i class="fas fa-eye"></i> Hasil Scan</a></li>
        <li><a href="#/login" class="login-btn"><i class="fas fa-sign-in-alt"></i> Login/Register</a></li>
      `;
    }
  }
}

// Logout function
function logout() {
  // Clear authentication data
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');
  localStorage.removeItem('current_user');
  
  // Update navigation
  updateNavigation();
  
  // Redirect to home
  window.location.hash = '#/';
  
  // Show notification
  if (window.NotificationService) {
    window.NotificationService.showNotification({
      title: 'Logout Berhasil',
      message: 'Anda telah keluar dari sistem.',
      type: 'success',
    });
  }
}
