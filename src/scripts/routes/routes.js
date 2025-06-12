import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import ScanResultPage from '../pages/scan-result/scan-result-page';
import LoginPage from '../pages/login/login-page';
import ArticlePage from '../pages/article/article-page.js';

const routes = {
  '/': new HomePage(),
  '/tentang': new AboutPage(),
  '/hasil-scan': new ScanResultPage(),
  '/login': new LoginPage(),
  '/artikel': null,
};

export default routes;
