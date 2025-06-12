/**
 * Environment utility to detect development or production mode
 */

const ENV = {
  /**
   * Check if current environment is development
   * 
   * @returns {boolean} True if in development mode
   */
  isDevelopment: () => {
    return process.env.NODE_ENV === 'development' || 
           window.location.hostname === 'localhost' || 
           window.location.hostname.includes('127.0.0.1') ||
           window.location.hostname.includes('192.168.');
  },
  
  /**
   * Check if current environment is production
   * 
   * @returns {boolean} True if in production mode
   */
  isProduction: () => {
    return process.env.NODE_ENV === 'production' &&
           window.location.hostname !== 'localhost' &&
           !window.location.hostname.includes('127.0.0.1') &&
           !window.location.hostname.includes('192.168.');
  }
};

export default ENV;
