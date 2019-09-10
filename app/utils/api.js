import humps from 'humps'
import Encode from 'jquery-param'

module.exports = {
  baseUrl(dev = false) {
    if (dev) {
      return 'http://192.168.1.103:4000'
    } else {
      return 'https://hire.enlist.io'
    }
  },

  namespace: 'api/v1',
  authenticationToken: null,

  setAuthenticationToken(token) {
    return (this.authenticationToken = token)
  },

  url(token, params, namespaced = true) {
    let baseUrl = this.baseUrl()

    if (namespaced) {
      baseUrl = `${baseUrl}/${this.namespace}`
    } else {
      baseUrl = baseUrl
    }

    if (params) {
      let encoded = this.__encode(params)
      return `${baseUrl}/${token}?${encoded}`
    } else {
      return `${baseUrl}/${token}/`
    }
  },

  __getHeaders(token) {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  },

  __encode(params) {
    return Encode(params)
  },

  __normalize(response) {
    return humps.camelizeKeys(response)
  },

  __parseResponse(response, resolve, reject) {
    return response
      .json()
      .then(json => {
        if (response.ok) {
          return resolve(this.__normalize(json))
        } else if (response.status && response.status === 422) {
          return reject({ status: 422, errors: json.errors })
        } else if (response.status && response.status === 403) {
          return reject({ status: 403, errors: 'Unauthorized' })
        } else {
          return reject(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  },

  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: this.__getHeaders(this.authenticationToken)
      }).then(response => {
        return this.__parseResponse(response, resolve, reject)
      })
    })
  },

  post(url, data) {
    let post = fetch(url, {
      method: 'POST',
      headers: this.__getHeaders(this.authenticationToken),
      body: JSON.stringify(humps.decamelizeKeys(data))
    })

    return new Promise((resolve, reject) => {
      post.then(response => {
        return this.__parseResponse(response, resolve, reject)
      })
    })
  },

  put(url, data) {
    let post = fetch(url, {
      method: 'PUT',
      headers: this.__getHeaders(this.authenticationToken),
      body: JSON.stringify(humps.decamelizeKeys(data))
    })

    return new Promise((resolve, reject) => {
      post.then(response => {
        return this.__parseResponse(response, resolve, reject)
      })
    })
  }
}
