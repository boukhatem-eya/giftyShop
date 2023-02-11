export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'https://api.giftyshop.pro/ui/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
