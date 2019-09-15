import SpotifyWebApi from 'spotify-web-api-js';
import queryString from 'query-string';

const authUrl = 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// const redirectUrl = 'http://localhost:3000/redirect';
const redirectUrl = 'https://spotipaca.netlify.com';
const userScope = 'user-library-read user-library-modify user-top-read';

export const generateRandomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const authQueryParams = {
  client_id: clientId,
  response_type: 'token',
  redirect_uri: redirectUrl,
  scope: userScope,
  state: generateRandomString(16)
};

export const spotifyApi = new SpotifyWebApi();

export const getFreshAuthToken = () => {
  window.location.href = `${authUrl}?${queryString.stringify(authQueryParams)}`;
};

export const setAuthTokenForRequests = () => {
  const authTokenObj = queryString.parse(window.location.hash);
  const { access_token } = authTokenObj;

  if (typeof access_token === 'string') {
    spotifyApi.setAccessToken(access_token);
    return access_token;
  }
};

export const authenticate = () => {
  getFreshAuthToken();
  setAuthTokenForRequests();
};
