import ApiService from '../api/api-service';
import CONFIG from '../config';

class ScanService {
  static async uploadAndAnalyzeImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('threshold', CONFIG.AI_MODEL.THRESHOLD);
      formData.append('version', CONFIG.AI_MODEL.VERSION);
      
      const response = await ApiService.postFormData(CONFIG.ENDPOINTS.SCAN, formData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Gagal menganalisis gambar. Silakan coba lagi.');
    }
  }

  static async getScanHistory(limit = 10, page = 1) {
    try {
      const response = await ApiService.get(`${CONFIG.ENDPOINTS.HISTORY}?limit=${limit}&page=${page}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Gagal memuat riwayat scan. Silakan coba lagi.');
    }
  }

  static async getScanDetail(scanId) {
    try {
      const response = await ApiService.get(`${CONFIG.ENDPOINTS.HISTORY}/${scanId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Gagal memuat detail scan. Silakan coba lagi.');
    }
  }

  static async deleteScan(scanId) {
    try {
      const response = await ApiService.delete(`${CONFIG.ENDPOINTS.HISTORY}/${scanId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Gagal menghapus scan. Silakan coba lagi.');
    }
  }

  // Metode untuk demo/simulasi saat backend belum tersedia
  static simulateUploadAndAnalyze(imageFile) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const diagnoses = ['Normal', 'Retinopati Diabetik', 'Glaukoma', 'Degenerasi Makula'];
        const severities = ['Ringan', 'Sedang', 'Berat'];
        
        const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
        const randomSeverity = randomDiagnosis === 'Normal' ? '-' : severities[Math.floor(Math.random() * severities.length)];
        
        let recommendation = '';
        if (randomDiagnosis === 'Normal') {
          recommendation = 'Tidak ada rekomendasi khusus. Lakukan pemeriksaan rutin setiap tahun.';
        } else if (randomSeverity === 'Ringan') {
          recommendation = 'Disarankan untuk konsultasi dengan dokter spesialis mata dalam 3 bulan ke depan.';
        } else if (randomSeverity === 'Sedang') {
          recommendation = 'Disarankan untuk konsultasi dengan dokter spesialis mata dalam 1 bulan ke depan.';
        } else {
          recommendation = 'Segera konsultasi dengan dokter spesialis mata.';
        }
        
        resolve({
          id: `scan_${Date.now()}`,
          diagnosis: randomDiagnosis,
          severity: randomSeverity,
          recommendation,
          date: new Date().toISOString(),
          imageUrl: URL.createObjectURL(imageFile),
        });
      }, 2000);
    });
  }

  static simulateGetScanHistory() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          scans: [
            {
              id: 'scan_1',
              diagnosis: 'Normal',
              severity: '-',
              date: '2025-05-20T10:30:00Z',
              imageUrl: 'https://via.placeholder.com/300x300?text=Normal',
            },
            {
              id: 'scan_2',
              diagnosis: 'Retinopati Diabetik',
              severity: 'Ringan',
              date: '2025-04-15T14:45:00Z',
              imageUrl: 'https://via.placeholder.com/300x300?text=Retinopati',
            },
            {
              id: 'scan_3',
              diagnosis: 'Glaukoma',
              severity: 'Sedang',
              date: '2025-03-10T09:15:00Z',
              imageUrl: 'https://via.placeholder.com/300x300?text=Glaukoma',
            },
          ],
          pagination: {
            total: 3,
            page: 1,
            limit: 10,
            totalPages: 1,
          },
        });
      }, 1000);
    });
  }

  static simulateGetScanDetail(scanId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const scans = {
          scan_1: {
            id: 'scan_1',
            diagnosis: 'Normal',
            severity: '-',
            recommendation: 'Tidak ada rekomendasi khusus. Lakukan pemeriksaan rutin setiap tahun.',
            date: '2025-05-20T10:30:00Z',
            imageUrl: 'https://via.placeholder.com/600x400?text=Normal',
            aiConfidence: 0.95,
          },
          scan_2: {
            id: 'scan_2',
            diagnosis: 'Retinopati Diabetik',
            severity: 'Ringan',
            recommendation: 'Disarankan untuk konsultasi dengan dokter spesialis mata dalam 3 bulan ke depan.',
            date: '2025-04-15T14:45:00Z',
            imageUrl: 'https://via.placeholder.com/600x400?text=Retinopati',
            aiConfidence: 0.87,
          },
          scan_3: {
            id: 'scan_3',
            diagnosis: 'Glaukoma',
            severity: 'Sedang',
            recommendation: 'Disarankan untuk konsultasi dengan dokter spesialis mata dalam 1 bulan ke depan.',
            date: '2025-03-10T09:15:00Z',
            imageUrl: 'https://via.placeholder.com/600x400?text=Glaukoma',
            aiConfidence: 0.82,
          },
        };
        
        if (scans[scanId]) {
          resolve(scans[scanId]);
        } else {
          reject(new Error('Scan tidak ditemukan'));
        }
      }, 500);
    });
  }
}

export default ScanService; 