export default class AuthorizationHeaderTransformer {
  async transform(headers) {
    const userSessionToken = 'a nice bearer token'
    headers.set('Authorization', `Bearer ${userSessionToken}`)
    return headers
  }
}
