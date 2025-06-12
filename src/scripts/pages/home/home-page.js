export default class HomePage {
  async render() {
    return `
      <!-- Hero Section -->
      <section class="hero-section darkmode-ignore">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">Health Care Solution</h1>
              <p class="hero-description">
                Solusi kesehatan mata terdepan dengan teknologi AI untuk deteksi dini penyakit retina.
                Dapatkan diagnosis cepat dan akurat untuk kesehatan mata yang lebih baik.
              </p>
              <a href="#/hasil-scan" class="hero-button">Mulai Scan</a>
            </div>
            <div class="hero-image">
              <img src="./ai-agent.svg" alt="AI Agent" class="ai-agent-image">
            </div>
          </div>
        </div>
      </section>

      <!-- Search Section -->
      <section class="search-section" style="display: none;">
        <div class="container">
          <div class="search-container">
            <input type="text" class="search-input" placeholder="Cari informasi kesehatan mata...">
            <button class="search-button">
              <i class="fas fa-search"></i> Cari
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="features-title">Layanan Kami</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div style="background-color: #f0f8f8; height: 200px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-eye fa-4x" style="color: #38d1c0;"></i>
              </div>
              <div class="feature-content">
                <h3 class="feature-title">Eye Recognition</h3>
                <p>Identifikasi mata cepat untuk deteksi retinopati diabetik yang akurat dan terpercaya.</p>
              </div>
            </div>
            <div class="feature-card">
              <div style="background-color: #f0f8f8; height: 200px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-mobile-alt fa-4x" style="color: #38d1c0;"></i>
              </div>
              <div class="feature-content">
                <h3 class="feature-title">Web Apps</h3>
                <p>Akses layanan kesehatan mata kapan saja dan di mana saja melalui perangkat mobile Anda.</p>
              </div>
            </div>
            <div class="feature-card">
              <div style="background-color: #f0f8f8; height: 200px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-chart-line fa-4x" style="color: #38d1c0;"></i>
              </div>
              <div class="feature-content">
                <h3 class="feature-title">Hasil Scan</h3>
                <p>Analisis hasil scan retina dengan teknologi AI untuk diagnosis yang cepat dan akurat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Tambahkan event listener jika diperlukan
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    
    if (searchButton && searchInput) {
      // searchButton.addEventListener('click', () => { // Comment out or remove event listener
      //   const query = searchInput.value;
      //   if (query.trim() !== '') {
      //     // Implementasi pencarian
      //     console.log('Searching for:', query);
      //   }
      // });
      
      // // Tambahkan event listener untuk Enter key
      // searchInput.addEventListener('keypress', (e) => { // Comment out or remove event listener
      //   if (e.key === 'Enter') {
      //     const query = searchInput.value;
      //     if (query.trim() !== '') {
      //       // Implementasi pencarian
      //       console.log('Searching for:', query);
      //     }
      //   }
      // });
    }
  }
}
