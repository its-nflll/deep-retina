import ScanResultView from '../../views/scan-result-view';
import ScanResultPresenter from '../../presenters/scan-result-presenter';

export default class ScanResultPage {
  constructor() {
    this.view = new ScanResultView();
    this.presenter = new ScanResultPresenter(this.view);
  }

  async render() {
    return this.view.getTemplate();
  }

  async afterRender() {
    this.view.init();
    await this.presenter.init();
  }
} 