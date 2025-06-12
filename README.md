# Deep Retina - Diabetic Retinopathy Detection Web App

Deep Retina adalah aplikasi web berbasis AI untuk deteksi retinopati diabetik. Aplikasi ini memungkinkan pengguna untuk mengunggah foto retina mata dan mendapatkan analisis otomatis menggunakan teknologi artificial intelligence untuk mendeteksi tingkat keparahan retinopati diabetik.

## 🚀 Fitur Utama

- **Deteksi Retinopati Diabetik**: Upload foto retina untuk analisis AI
- **Riwayat Scan**: Menyimpan dan mengelola hasil scan sebelumnya
- **Dashboard Interaktif**: Antarmuka yang user-friendly dan responsif
- **Hasil Detail**: Diagnosis, tingkat keparahan, dan rekomendasi tindak lanjut
- **Manajemen Profil**: Sistem login dan profil pengguna
- **Progressive Web App**: Dapat diinstall sebagai aplikasi mobile

## 📋 Table of Contents

- [Teknologi](#teknologi)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Features](#features)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🛠 Teknologi

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Build Tool**: Webpack 5
- **Bundling**: Babel untuk transpile ES6+
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Icons**: Font Awesome 6
- **PWA**: Service Worker, Web App Manifest
- **Architecture**: Model-View-Presenter (MVP)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (versi 14 atau lebih tinggi)
- [npm](https://www.npmjs.com/) (Node package manager)
- Browser modern (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone repository ini:
   ```bash
   git clone https://github.com/its-nflll/deep-retina.git
   cd deep-retina
   ```

2. Install dependencies:
   ```shell
   npm install
   ```

3. Jalankan development server:
   ```shell
   npm run start-dev
   ```

4. Buka browser dan akses `http://localhost:8080`

## 📜 Scripts

- **Development Server**:
  ```shell
  npm run start-dev
  ```
  Menjalankan webpack dev server dengan live reload pada `http://localhost:8080`

- **Build for Production**:
  ```shell
  npm run build
  ```
  Membuat build optimized untuk production di folder `dist/`

- **Serve Production Build**:
  ```shell
  npm run serve
  ```
  Menyajikan build production menggunakan http-server

- **Lint Code**:
  ```shell
  npm run lint
  ```
  Menjalankan ESLint untuk memeriksa kualitas kode

## 📁 Project Structure

Proyek ini menggunakan arsitektur **Model-View-Presenter (MVP)** untuk memisahkan concerns dan meningkatkan maintainability.

```text
deep-retina/
├── dist/                       # Compiled files for production
├── src/                        # Source project files
│   ├── public/                 # Static assets
│   │   ├── images/             # Image assets
│   │   ├── *.svg              # SVG illustrations
│   │   ├── favicon.png        # App icon
│   │   ├── manifest.json      # PWA manifest
│   │   └── sw.js              # Service worker
│   ├── scripts/               # JavaScript source files
│   │   ├── index.js           # Main entry point
│   │   ├── config.js          # App configuration
│   │   ├── api/               # API layer
│   │   ├── data/              # Data layer
│   │   ├── models/            # Data models
│   │   ├── pages/             # Page components
│   │   │   ├── app.js         # Main app component
│   │   │   ├── home/          # Homepage
│   │   │   ├── about/         # About page
│   │   │   ├── scan-result/   # Scan results page
│   │   │   ├── profile/       # User profile
│   │   │   ├── login/         # Authentication
│   │   │   └── article/       # Articles page
│   │   ├── presenters/        # Business logic layer
│   │   ├── views/             # UI components
│   │   ├── services/          # Service layer
│   │   ├── routes/            # Routing system
│   │   └── utils/             # Utility functions
│   ├── styles/                # CSS files
│   │   └── styles.css         # Main stylesheet
│   └── index.html             # Main HTML template
├── package.json               # Project dependencies
├── webpack.common.js          # Webpack common config
├── webpack.dev.js             # Webpack development config
├── webpack.prod.js            # Webpack production config
└── README.md                  # Project documentation
```

## ✨ Features

### 🔍 Deteksi Retinopati Diabetik
- Upload foto retina dalam format JPG, PNG, atau JPEG
- Analisis AI untuk mendeteksi retinopati diabetik
- Hasil diagnosis dengan tingkat keparahan
- Rekomendasi tindak lanjut medis

### 📊 Dashboard & Riwayat
- Dashboard dengan statistik scan
- Riwayat scan lengkap dengan tanggal
- Kemampuan melihat hasil scan sebelumnya
- Fitur hapus riwayat scan

### 👤 Manajemen User
- Sistem registrasi dan login
- Profil pengguna yang dapat diedit
- Autentikasi yang aman

### 📱 Progressive Web App
- Dapat diinstall sebagai aplikasi mobile
- Offline support dengan service worker
- Responsive design untuk semua device

### 🎨 UI/UX Modern
- Desain clean dan intuitive
- Animasi smooth menggunakan CSS
- Loading states dan feedback visual
- Dark mode support (opsional)

## 🚀 Deployment

### Build Production
```bash
npm run build
```

### Deploy ke Netlify/Vercel
1. Build project: `npm run build`
2. Upload folder `dist/` ke hosting platform
3. Configure routing untuk SPA

### Deploy ke GitHub Pages
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

## 🤝 Contributing

1. Fork repository ini
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m 'Add new feature'`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat Pull Request

## 📄 License

Project ini menggunakan [MIT License](LICENSE).

## 👥 Tim Pengembang

- **Naufal** - Lead Developer & UI/UX Designer
- **Tim DBS Capstone** - Project Contributors

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan:
- Buat [Issue](https://github.com/its-nflll/deep-retina/issues) di GitHub
- Email: info@deepretina.id

---

⭐ **Star repository ini jika bermanfaat!**
