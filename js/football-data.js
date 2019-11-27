/**
 * Request football data from server.
 *
 * @param   string    url
 * @return  promise
 */
function footballServer(url) {
  return fetch(url, {
    mode: 'cors'
  })
    .then(responseStatus)
    .then(responseJSON)
}

/**
 * Request football data from cache.
 *
 * @param   string    url
 * @return  promise
 */
function footballCache(url) {
  if ('caches' in window) {
    return caches.match(url, { ignoreSearch: true })
      .then(function (res) {
        if (res) {
          return res.json()
        } else {
          return Promise.resolve(null)
        }
      })
  } else {
    return Promise.resolve(null)
  }
}

/**
 * Get list competitions.
 *
 * @return  promise
 */
function footballCompetitions() {
  url = `${soccer.api_url}/competitions`

  return footballCache(url)
    .then(function (res) {
      if (res === null) {
        return footballServer(url)
      } else {
        return Promise.resolve(res)
      }
    })
}
