import {
  generateRandomString,
  setAuthTokenForRequests
} from '../authentication';

const testAccessTokenString = '12345678';
const testAccessTokenNumber = 12345678;

describe('Authentication Util', () => {
  it('generates a random string with a given length', () => {
    const result = generateRandomString(16);
    expect(result.length).toBe(16);
  });

  it('sets the correct URL param as access token', () => {
    window.history.pushState(
      {},
      'Test URL',
      `/test.html?testParam=true#access_token=${testAccessTokenString}`
    );
    expect(setAuthTokenForRequests()).toBe(testAccessTokenString);
  });

  it('returns undefined for wrong access token type', () => {
    window.history.pushState(
      {},
      'Test URL',
      `/test.html?testParam=true#access_token=${testAccessTokenNumber}`
    );
    expect(setAuthTokenForRequests()).toBeUndefined;
  });
});
