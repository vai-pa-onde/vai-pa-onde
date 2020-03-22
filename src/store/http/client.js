import config from '@/config'

export default class HttpClient {
  constructor(basePath) {
    this._basePath = basePath
    this._headerTransformers = []
    this._applicationKey = config.applicationKey
  }

  addTransformer(transformer) {
    this._headerTransformers.push(transformer)
  }

  async get(path) {
    return fetch(this._basePath + path, {
      method: 'GET',
      headers: await this._createHeaders()
    })
  }

  async post(path, body) {
    let options = {
      method: 'POST',
      headers: await this._createHeaders(),
      body: JSON.stringify(body)
    }

    return fetch(this._basePath + path, options)
  }

  async _createHeaders() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-fstr-application-key': this._applicationKey
    })

    for (let transformer of this._headerTransformers) {
      headers = await transformer.transform(headers)
    }

    return headers
  }
}
