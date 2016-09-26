import { LimcwebPage } from './app.po';

describe('limcweb App', function() {
  let page: LimcwebPage;

  beforeEach(() => {
    page = new LimcwebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
