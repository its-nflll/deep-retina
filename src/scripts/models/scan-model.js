class ScanModel {
  constructor({
    id = null,
    diagnosis = '',
    severity = '',
    recommendation = '',
    date = null,
    imageUrl = '',
    aiConfidence = 0,
    userId = null,
  }) {
    this.id = id;
    this.diagnosis = diagnosis;
    this.severity = severity;
    this.recommendation = recommendation;
    this.date = date;
    this.imageUrl = imageUrl;
    this.aiConfidence = aiConfidence;
    this.userId = userId;
  }

  static fromJson(json) {
    return new ScanModel({
      id: json.id,
      diagnosis: json.diagnosis,
      severity: json.severity,
      recommendation: json.recommendation,
      date: json.date ? new Date(json.date) : null,
      imageUrl: json.imageUrl,
      aiConfidence: json.aiConfidence || 0,
      userId: json.userId,
    });
  }

  toJson() {
    return {
      id: this.id,
      diagnosis: this.diagnosis,
      severity: this.severity,
      recommendation: this.recommendation,
      date: this.date ? this.date.toISOString() : null,
      imageUrl: this.imageUrl,
      aiConfidence: this.aiConfidence,
      userId: this.userId,
    };
  }

  getFormattedDate() {
    if (!this.date) return '-';
    
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    return this.date.toLocaleDateString('id-ID', options);
  }

  getAiConfidencePercentage() {
    return `${Math.round(this.aiConfidence * 100)}%`;
  }
}

export default ScanModel; 