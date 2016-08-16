const envs = {
  stv3: 'http://news.api.metro-rn.stv3/v1',
  stv2: 'http://news.api.stv2.tv/v1',
  live: 'http://news.api.stv.tv/v1'
}
let baseUrl = envs.live

export function setActiveEnvironment (name) {
  baseUrl = envs[name] || baseUrl
}

export function getBaseUrl () {
  return baseUrl
}
