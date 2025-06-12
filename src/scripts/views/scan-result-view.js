class ScanResultView {
  constructor() {
    this.scanButton = null;
    this.retinaImageInput = null;
    this.resultContainer = null;
    this.loadingContainer = null;
    this.previewImage = null;
    this.diagnosisResult = null;
    this.severityResult = null;
    this.recommendationResult = null;
    this.fileName = null;
    this.errorMessage = null;
    this.historyLoading = null;
    this.historyTable = null;
    this.historyTableBody = null;
    this.noHistory = null;
  }

  getTemplate() {
    return `
      <section class="container" style="padding: 60px 0;">
        <h1 style="margin-bottom: 30px; text-align: center;">Deteksi Retinopati Diabetik</h1>
        <div style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h2 style="margin-bottom: 15px; color: #38d1c0;">Cek Kesehatan Retina Anda</h2>
            <p style="margin-bottom: 20px;">
              Deep Retina adalah aplikasi berbasis web yang membantu Anda mendeteksi retinopati diabetik secara cepat dan mudah. Cukup unggah foto retina mata Anda, dan sistem akan menganalisis serta memberikan hasil diagnosis tingkat keparahan beserta rekomendasi tindak lanjut.
            </p>
            <div id="error-message" style="display: none; background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 20px; border: 1px solid #f5c6cb;"></div>
            <div style="display: flex; flex-direction: column; gap: 15px;">
              <div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                  <label for="retina-image" class="custom-file-upload" style="background-color: #38d1c0; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; width: fit-content;">
                    <i class="fas fa-upload"></i> Pilih Foto Retina
                  </label>
                  <input type="file" id="retina-image" accept="image/*" style="display: none;">
                  <p id="file-name" style="margin: 5px 0; font-size: 0.9rem; color: #666;">Belum ada file dipilih</p>
                </div>
              </div>
              <button id="scan-button" style="background-color: #38d1c0; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
                Analisis Gambar
              </button>
            </div>
          </div>
          <div id="loading-container" style="display: none; text-align: center; margin: 20px 0;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #38d1c0; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 10px;">Sedang menganalisis gambar retina...</p>
            <style>
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </div>
          <div id="result-container" style="display: none; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-top: 20px;">
            <h3 style="margin-bottom: 15px; color: #1e3a8a;">Hasil Analisis Retinopati Diabetik</h3>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 250px;">
                <img id="preview-image" src="" alt="Preview Retina" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">
              </div>
              <div style="flex: 1; min-width: 250px;">
                <div style="margin-bottom: 15px;">
                  <h4 style="margin-bottom: 5px;">Diagnosis:</h4>
                  <p id="diagnosis-result">-</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <h4 style="margin-bottom: 5px;">Tingkat Keparahan:</h4>
                  <p id="severity-result">-</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <h4 style="margin-bottom: 5px;">Rekomendasi:</h4>
                  <p id="recommendation-result">-</p>
                </div>
                <div id="ai-confidence" style="margin-bottom: 15px; display: none;">
                  <h4 style="margin-bottom: 5px;">Tingkat Kepercayaan AI:</h4>
                  <div style="background-color: #f0f0f0; border-radius: 4px; height: 20px; width: 100%; overflow: hidden;">
                    <div id="ai-confidence-bar" style="background-color: #38d1c0; height: 100%; width: 0%;"></div>
                  </div>
                  <p id="ai-confidence-text" style="margin-top: 5px; font-size: 0.9rem; text-align: right;">-</p>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <h3 style="margin-bottom: 15px;">Riwayat Scan Retina</h3>
            <div id="history-container" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
              <div id="history-loading" style="text-align: center; padding: 20px;">
                <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #38d1c0; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 10px;">Memuat riwayat scan retina...</p>
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
                <p>Belum ada riwayat scan retina.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  init() {
    this.scanButton = document.getElementById('scan-button');
    this.retinaImageInput = document.getElementById('retina-image');
    this.resultContainer = document.getElementById('result-container');
    this.loadingContainer = document.getElementById('loading-container');
    this.previewImage = document.getElementById('preview-image');
    this.diagnosisResult = document.getElementById('diagnosis-result');
    this.severityResult = document.getElementById('severity-result');
    this.recommendationResult = document.getElementById('recommendation-result');
    this.fileName = document.getElementById('file-name');
    this.errorMessage = document.getElementById('error-message');
    this.historyLoading = document.getElementById('history-loading');
    this.historyTable = document.getElementById('history-table');
    this.historyTableBody = document.getElementById('history-table-body');
    this.noHistory = document.getElementById('no-history');
    this.aiConfidence = document.getElementById('ai-confidence');
    this.aiConfidenceBar = document.getElementById('ai-confidence-bar');
    this.aiConfidenceText = document.getElementById('ai-confidence-text');
  }

  bindFileUpload(handler) {
    if (this.retinaImageInput) {
      this.retinaImageInput.addEventListener('change', function() {
        const file = this.files && this.files[0];
        handler(file);
      });
    }
  }

  bindScanButton(handler) {
    if (this.scanButton && this.retinaImageInput) {
      this.scanButton.addEventListener('click', () => {
        const file = this.retinaImageInput.files[0];
        handler(file);
      });
    }
  }  updateFileName(name) {
    if (this.fileName) {
      this.fileName.textContent = name;
    }
  }

  resetFileInput() {
    if (this.retinaImageInput) {
      this.retinaImageInput.value = '';
      this.fileName.textContent = 'Belum ada file dipilih';
    }
  }

  showError(message) {
    if (this.errorMessage) {
      this.errorMessage.textContent = message;
      this.errorMessage.style.display = 'block';
    }
  }

  hideError() {
    if (this.errorMessage) {
      this.errorMessage.style.display = 'none';
    }
  }

  showLoading() {
    if (this.loadingContainer) {
      this.loadingContainer.style.display = 'block';
      // Hapus shape loading jika ada
      const prev = document.getElementById('shape-loading');
      if (prev) prev.remove();
    }
  }

  hideLoading() {
    if (this.loadingContainer) {
      this.loadingContainer.style.display = 'none';
      // Hapus shape animasi jika ada
      const container = document.getElementById('shape-loading');
      if (container) container.remove();
    }
  }

  showResult() {
    if (this.resultContainer) {
      this.resultContainer.style.display = 'block';
    }
  }

  hideResult() {
    if (this.resultContainer) {
      this.resultContainer.style.display = 'none';
    }
  }

  setPreviewImage(url) {
    if (this.previewImage) {
      this.previewImage.src = url;
    }
  }

  renderScanResult(scan) {
    if (this.diagnosisResult && this.severityResult && this.recommendationResult) {
      this.diagnosisResult.textContent = scan.diagnosis;
      this.severityResult.textContent = scan.severity;
      this.recommendationResult.textContent = scan.recommendation;
      
      // Tampilkan tingkat kepercayaan AI jika ada
      if (scan.aiConfidence && this.aiConfidence) {
        const confidencePercentage = Math.round(scan.aiConfidence * 100);
        this.aiConfidenceBar.style.width = `${confidencePercentage}%`;
        this.aiConfidenceText.textContent = `${confidencePercentage}%`;
        this.aiConfidence.style.display = 'block';
      } else if (this.aiConfidence) {
        this.aiConfidence.style.display = 'none';
      }
    }
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

  showLoginRequired() {
    if (this.noHistory) {
      this.noHistory.style.display = 'block';
      this.noHistory.innerHTML = `
        <p>Silakan <a href="#/login" style="color: #38d1c0;">login</a> untuk melihat riwayat scan Anda.</p>
      `;
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
      if (!scans || scans.length === 0) {
        this.showNoHistory();
        return;
      }
      scans.forEach(scan => {
        const row = document.createElement('tr');
        row.innerHTML = `          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${typeof scan.getFormattedDate === 'function' ? scan.getFormattedDate() : this.formatDate(scan.date || scan.timestamp)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${scan.diagnosis}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${scan.severity}</td>
        `;
        this.historyTableBody.appendChild(row);
      });
      this.historyTable.style.display = 'table';
      if (this.noHistory) this.noHistory.style.display = 'none';
    }
  }

  formatDate(date) {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  }
  scrollToResult() {
    if (this.resultContainer) {
      this.resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export default ScanResultView;