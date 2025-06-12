export default class AboutPage {
  async render() {
    return `
      <section class="about-section">
        <div class="container">
          <h1 class="about-title">Tentang Kami</h1>
          
          <div class="about-content">
            <div class="about-image">
              <div class="image-placeholder">
                <img src="./images/logo.png" alt="Deep Retina Logo" style="width: 120px; height: 120px; object-fit: contain;">
              </div>
            </div>
            
            <div class="about-text">
              <p>
                Deep Retina adalah platform kesehatan digital yang berfokus pada deteksi dini penyakit mata melalui teknologi 
                kecerdasan buatan (AI) dan machine learning. Kami mengembangkan solusi inovatif untuk membantu dokter dan pasien 
                dalam mendiagnosis dan memantau kondisi kesehatan mata.
              </p>
              
              <p>
                Misi kami adalah menyediakan akses kesehatan mata yang terjangkau dan berkualitas untuk semua orang, 
                terutama di daerah dengan akses terbatas ke dokter spesialis mata. Dengan teknologi Deep Retina, 
                diagnosis penyakit mata seperti retinopati diabetik, glaukoma, dan degenerasi makula dapat dilakukan 
                lebih cepat dan akurat.
              </p>
            </div>
          </div>
          
          <div class="vision-mission">
            <div class="vision-box">
              <h2><i class="fas fa-eye"></i> Visi Kami</h2>
              <p>
                Menjadi pionir dalam teknologi kesehatan mata digital dan berkontribusi dalam mengurangi angka kebutaan 
                yang dapat dicegah di seluruh dunia.
              </p>
            </div>
            
            <div class="mission-box">
              <h2><i class="fas fa-bullseye"></i> Misi Kami</h2>
              <p>
                Mengembangkan dan menyediakan teknologi AI terbaik untuk deteksi dini penyakit mata, 
                meningkatkan akses layanan kesehatan mata berkualitas, dan mendukung tenaga medis 
                dalam memberikan perawatan yang optimal.
              </p>
            </div>
          </div>
          
          <div class="values-section">
            <h2 class="values-title">Nilai-Nilai Kami</h2>
            <div class="values-grid">
              <div class="value-card">
                <div class="value-icon">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <h3>Inovasi</h3>
                <p>Kami terus mengembangkan teknologi terbaru untuk meningkatkan kualitas layanan</p>
              </div>
              
              <div class="value-card">
                <div class="value-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h3>Akurasi</h3>
                <p>Kami berkomitmen untuk memberikan hasil diagnosa yang akurat dan dapat diandalkan</p>
              </div>
              
              <div class="value-card">
                <div class="value-icon">
                  <i class="fas fa-universal-access"></i>
                </div>
                <h3>Aksesibilitas</h3>
                <p>Kami berusaha membuat layanan kesehatan mata tersedia untuk semua orang</p>
              </div>
              
              <div class="value-card">
                <div class="value-icon">
                  <i class="fas fa-users"></i>
                </div>
                <h3>Kolaborasi</h3>
                <p>Kami bekerja sama dengan tenaga medis dan institusi kesehatan untuk hasil terbaik</p>
              </div>
            </div>
          </div>
          
          <div class="team-section">
            <h2 class="team-title">Tim Kami</h2>
            
            <div class="team-category">
              <h3 class="category-title" style="color: #38d1c0; margin: 30px 0 20px; position: relative; display: inline-block;">
                <i class="fas fa-laptop-code"></i> Fullstack Developer
                <span style="position: absolute; bottom: -10px; left: 0; width: 80%; height: 3px; background-color: #38d1c0;"></span>
              </h3>
              
              <div class="team-grid">
                <div class="team-card">
                  <div class="team-photo">
                    <img src="./naufal.svg" alt="Naufal Haidar Nityasa" class="team-image">
                  </div>
                  <h3>Naufal Haidar Nityasa</h3>
                  <p>Front-End dan Back-End Developer</p>
                  <span class="team-id" style="display: block; font-size: 0.8rem; color: #666; margin-top: 5px;">FC183D5Y0361</span>
                </div>
                
                <div class="team-card">
                  <div class="team-photo">
                    <img src="./topik.svg" alt="Taufiq Hidayatullah" class="team-image">
                  </div>
                  <h3>Taufiq Hidayatullah</h3>
                  <p>Front-End dan Back-End Developer</p>
                  <span class="team-id" style="display: block; font-size: 0.8rem; color: #666; margin-top: 5px;">FC183D5Y1868</span>
                </div>
                
                <div class="team-card">
                  <div class="team-photo">
                    <img src="./dinda.svg" alt="Dinda Lolyta Buma Lestari" class="team-image">
                  </div>
                  <h3>Dinda Lolyta Buma Lestari</h3>
                  <p>Front-End dan Back-End Developer</p>
                  <span class="team-id" style="display: block; font-size: 0.8rem; color: #666; margin-top: 5px;">FC183D5X2401</span>
                </div>
              </div>
            </div>
            
            <div class="team-category">
              <h3 class="category-title" style="color: #1e3a8a; margin: 30px 0 20px; position: relative; display: inline-block;">
                <i class="fas fa-brain"></i> Machine Learning Engineer
                <span style="position: absolute; bottom: -10px; left: 0; width: 80%; height: 3px; background-color: #1e3a8a;"></span>
              </h3>
              
              <div class="team-grid">
                <div class="team-card">
                  <div class="team-photo">
                    <img src="./satria.svg" alt="Satriatama Putra" class="team-image">
                  </div>
                  <h3>Satriatama Putra</h3>
                  <p>Machine Learning Engineer - Ketua Tim</p>
                  <span class="team-id" style="display: block; font-size: 0.8rem; color: #666; margin-top: 5px;">MC299D5Y2065</span>
                </div>
                
                <div class="team-card">
                  <div class="team-photo">
                    <img src="./ichwan.svg" alt="Ichwan Akmaluddin" class="team-image">
                  </div>
                  <h3>Ichwan Akmaluddin</h3>
                  <p>Machine Learning Engineer</p>
                  <span class="team-id" style="display: block; font-size: 0.8rem; color: #666; margin-top: 5px;">MC299D5Y1451</span>
                </div>
                
                <div class="team-card">
                  <div class="team-photo">
                    <img src="./cahya.svg" alt="Cahya Abdurrahman" class="team-image">
                  </div>
                  <h3>Cahya Abdurrahman</h3>
                  <p>Machine Learning Engineer</p>
                  <span class="team-id" style="display: block; font-size: 0.8rem; color: #666; margin-top: 5px;">MC299D5Y1469</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Tidak ada fungsi khusus yang perlu dijalankan setelah render
  }
}
