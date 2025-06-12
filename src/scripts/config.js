const CONFIG = {
  BASE_URL: 'http://31.56.56.22:8000',
  ENDPOINTS: {
    ROOT: '/',
    REGISTER: '/register',
    TOKEN: '/token',
    USERS_ME: '/users/me',
    PREDICT: '/predict',
    HISTORY: '/history',
  },
  AI_MODEL: {
    VERSION: 'v1.0',
    THRESHOLD: 0.75,
  },
  DR_CLASSES: {
    0: 'No DR (Tidak ada Retinopati Diabetik)',
    1: 'Mild (Ringan)',
    2: 'Moderate (Sedang)',
    3: 'Severe (Parah)',
    4: 'Proliferative DR (Paling Parah)'
  }
};

export default CONFIG;
