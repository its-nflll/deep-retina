import ProfileView from '../../views/profile-view';
import ProfilePresenter from '../../presenters/profile-presenter';

export default class ProfilePage {
  constructor() {
    this.view = new ProfileView();
    this.presenter = new ProfilePresenter(this.view);
  }

  async render() {
    return this.view.getTemplate();
  }

  async afterRender() {
    this.view.init();
    await this.presenter.init();
  }
}