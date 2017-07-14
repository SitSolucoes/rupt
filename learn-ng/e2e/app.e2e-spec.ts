import { LearnNgPage } from './app.po';

describe('learn-ng App', () => {
  let page: LearnNgPage;

  beforeEach(() => {
    page = new LearnNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
