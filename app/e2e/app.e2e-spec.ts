import { ULikePage } from './app.po';

describe('u-like App', function() {
  let page: ULikePage;

  beforeEach(() => {
    page = new ULikePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
