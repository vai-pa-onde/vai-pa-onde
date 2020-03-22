import createHttpClient from './createHttpClient'

// This HTTP client is modified inside the Store creation, because we depend of authentication store
// to create the AuthorizationHeaderTransformer.
export default createHttpClient()
