import ApiService from '../api/api-service.js';
import NotificationService from '../services/notification-service.js';
import ScanModel from '../models/scan-model.js';
import CONFIG from '../config.js';

class ScanResultPresenter {
  constructor(view) {
    this.view = view;
    this.scanHistory = [];
    this.currentScan = null;
  }

  async init() {
    this.view.bindFileUpload(this.handleFileChange.bind(this));
    this.view.bindScanButton(this.handleScanImage.bind(this));
    
    await this.loadScanHistory();
  }

  async loadScanHistory() {
    try {
      this.view.showHistoryLoading();
      
      if (!ApiService.isAuthenticated()) {
        this.view.showLoginRequired();
        return;
      }
      
      const historyData = await ApiService.getPredictionHistory();
      
      this.scanHistory = historyData.map(scan => {
        return new ScanModel({
          id: scan.filename + '_' + scan.timestamp,
          fileName: scan.filename,
          diagnosis: ApiService.getDRClassDescription(scan.predicted_class),
          severity: this.getSeverityLevel(scan.predicted_class),
          recommendation: this.getRecommendation(scan.predicted_class),
          aiConfidence: scan.confidence,
          date: new Date(scan.timestamp),
          predictedClass: scan.predicted_class        });      });
      
      if (this.scanHistory.length === 0) {
        this.view.showNoHistory();
      } else {
        this.view.renderScanHistory(this.scanHistory);
      }
    } catch (error) {
      console.error('Error loading scan history:', error);
      this.view.showHistoryError(error.message);
    } finally {
      this.view.hideHistoryLoading();
    }
  }

  handleFileChange(file) {
    if (!file) {
      this.view.resetFileInput();
      return;
    }
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      this.view.showError('Format file tidak didukung. Gunakan format JPG atau PNG.');
      this.view.resetFileInput();
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      this.view.showError('Ukuran file terlalu besar. Maksimal 5MB.');
      this.view.resetFileInput();
      return;
    }
    
    this.view.updateFileName(file.name);
    this.view.hideError();
  }

  async handleScanImage(file) {
    if (!file) {
      this.view.showError('Silakan pilih file gambar terlebih dahulu.');
      return;
    }
    
    if (!ApiService.isAuthenticated()) {
      this.view.showError('Silakan login terlebih dahulu untuk melakukan scan.');
      return;
    }
    
    try {
      this.view.showLoading();
      this.view.hideResult();
      this.view.hideError();
      
      const imageUrl = URL.createObjectURL(file);
      this.view.setPreviewImage(imageUrl);
      
      const scanResult = await ApiService.predictRetinopathy(file);
      
      this.currentScan = new ScanModel({
        id: scanResult.filename + '_' + Date.now(),
        fileName: scanResult.filename,
        diagnosis: ApiService.getDRClassDescription(scanResult.predicted_class),
        severity: this.getSeverityLevel(scanResult.predicted_class),
        recommendation: this.getRecommendation(scanResult.predicted_class),
        aiConfidence: scanResult.confidence,
        timestamp: new Date(),
        predictedClass: scanResult.predicted_class
      });
        this.view.renderScanResult(this.currentScan);
      this.view.showResult();
      this.view.scrollToResult();        // Tambahkan scan baru ke array tanpa reload dari API
      this.scanHistory.unshift(this.currentScan);
      this.view.renderScanHistory(this.scanHistory);
      
      NotificationService.showNotification({
        title: 'Scan Berhasil',
        message: 'Analisis retina telah selesai.',
        type: 'success',
      });
    } catch (error) {
      console.error('Scan error:', error);
      this.view.showError(this.getErrorMessage(error.message));    } finally {
      this.view.hideLoading();
    }  }

  getSeverityLevel(predictedClass) {
    const severityMap = {
      0: 'Normal',
      1: 'Ringan',
      2: 'Sedang', 
      3: 'Parah',
      4: 'Sangat Parah'
    };
    return severityMap[predictedClass] || 'Tidak Diketahui';
  }

  getRecommendation(predictedClass) {
    const recommendationMap = {
      0: 'Kondisi mata normal. Lanjutkan pemeriksaan rutin.',
      1: 'Retinopati ringan terdeteksi. Konsultasi dengan dokter mata dan kontrol gula darah.',
      2: 'Retinopati sedang terdeteksi. Segera konsultasi dengan dokter spesialis mata.',
      3: 'Retinopati parah terdeteksi. Butuh perawatan medis segera dari dokter spesialis mata.',
      4: 'Retinopati proliferatif terdeteksi. Butuh penanganan medis darurat segera.'
    };
    return recommendationMap[predictedClass] || 'Konsultasi dengan dokter mata untuk evaluasi lebih lanjut.';
  }

  getErrorMessage(errorMessage) {
    if (errorMessage.includes('401') || errorMessage.includes('authentication')) {
      return 'Sesi login telah berakhir. Silakan login kembali.';
    }
    if (errorMessage.includes('422') || errorMessage.includes('validation')) {
      return 'File gambar tidak valid. Pastikan file adalah gambar retina yang jelas.';
    }
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    }
    
    return 'Terjadi kesalahan saat menganalisis gambar. Silakan coba lagi.';
  }
}

export default ScanResultPresenter;