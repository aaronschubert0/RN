import request from './request'

export default function requestRankedArticlesInSection (sectionId) {
  return request(`sections/ranked/?id=${sectionId}`).then(
    response => response.results[0] && response.results[0].articles
  )
}
