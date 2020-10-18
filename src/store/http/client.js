export default class HttpClient {
  constructor(basePath) {
    this._basePath = basePath
  }

  async get(path) {
    return fetch(this._basePath + path, {
      method: 'GET',
      headers: this._createHeaders()
    })
  }

  async post(path, body) {
    let options = {
      method: 'POST',
      headers: this._createHeaders(),
      body: JSON.stringify(body)
    }

    return fetch(this._basePath + path, options)
  }

  _createHeaders() {
    let headers = new Headers({
      // 'Content-Type': 'application/json'
    })

    return headers
  }
}
