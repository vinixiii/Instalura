import redirects from './redirects';

// Test Driven Development
describe('config/redirects.js', () => {
  test('renders all current redirects', () => {
    expect(redirects).toMatchSnapshot();
  });
});
