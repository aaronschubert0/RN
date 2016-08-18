import { Alert } from 'react-native'

const envs = {
  // stv3: 'http://news.api.metro-rn.stv3/v1',
  live: 'http://news.api.stv.tv/v1',
  stv2: 'http://news.api.stv2.tv/v1'
}
let baseUrl = envs.live

export function setActiveEnvironment (name) {
  Alert.alert('Environment changed', `Changed to ${name}`, [{ text: 'Ok' }])
  baseUrl = envs[name] || baseUrl
}

export function getBaseUrl () {
  return baseUrl
}

export function cycleEnvironments() {
  const keys = Object.keys(envs)
  const currentIndex = keys.findIndex((key) => {
    return envs[key] === baseUrl
  })
  if (currentIndex == keys.length-1) {
    setActiveEnvironment(keys[0])
  } else {
    setActiveEnvironment(keys[currentIndex+1])
  }
}
