import { ProplistPage } from './app.po';

describe('proplist App', () => {
  let page: ProplistPage;

  beforeEach(() => {
    page = new ProplistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
