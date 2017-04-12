import { RuptFrontendPage } from './app.po';

describe('rupt-frontend App', () => {
  let page: RuptFrontendPage;

  beforeEach(() => {
    page = new RuptFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
