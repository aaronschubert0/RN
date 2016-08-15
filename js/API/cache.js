const cache = {}

export function cacheResponse (url, response, expiry) {
    cache[url] = {
        response,
        expiry
    }
}

export function readCache (url) {
    const cacheItem = cache[url]
    const valid = cacheItem && cacheItem.expiry > Date.now()
    if (!valid && cacheItem) delete cache[url]
    return valid ? cacheItem.response : undefined
}
