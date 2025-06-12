import LoginView from '../../views/login-view';
import LoginPresenter from '../../presenters/login-presenter';

export default class LoginPage {
  constructor() {
    this.view = new LoginView();
    this.presenter = new LoginPresenter(this.view);
  }

  async render() {
    return this.view.getTemplate();
  }

  async afterRender() {
    this.view.init();
    await this.presenter.init();
  }
} 