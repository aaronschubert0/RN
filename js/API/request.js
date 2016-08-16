import { getBaseUrl } from './environments'
import { readCache, cacheResponse } from './cache'

const defaultMaxAge = 60

export default function request (pathQuery) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/${pathQuery}`
  const cached = readCache(url)
  return cached ? Promise.resolve(cached) : fetch(url).then(
      response => {
          const cacheControl = response.headers.get('cache-control') || ''
          const maxAge = cacheControl.match(/max-age=([^,]+)/)[1] || defaultMaxAge
          const expiry = Date.now() + parseInt(maxAge*1000)
          return response.json().then(response => {
            if (!response.success) {
              throw new Error(`Unable to load ${url}`)
            }
            cacheResponse(url, response, expiry)
            return response
          })
      }
  )
}
