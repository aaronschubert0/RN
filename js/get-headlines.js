const localSections = [
  'west-central',
  'east-central',
  'north',
  'tayside',
  'stirling-central',
  'highlands-islands'
]

export default function getHeadlines () {
  return fetch('http://news.api.stv.tv/v1/mobile')
    .then(res => res.json())
    .then(parseLegacyStructure)
}

function parseLegacyStructure (apiResponse) {
  try {
    const { results } = apiResponse
    return results.sections.reduce((newResponse, section) => {
      const slug = getAlternativeSlug(section.slug, section.id) || section.slug

      if (slug === 'and-finally') return newResponse

      const existingHeadlines = newResponse[slug] ? newResponse[slug].headlines : []

      if (section.slug === 'breaking-news') {
         newResponse[slug] = {
           title: getAlternativeTitle(section.slug, section.id) || section.title,
           headlines: [{
             id: '2472342-34234',
             title: 'Peru drugs mule Melissa Reid flying home to Scotland',
             image: 'http://files.stv.tv/imagebase/451/w768/451398-melissa-reid-taken-through-lima-airport-after-release-from-prison-in-peru-image-grabbed-from-gmb.jpg',
             published: '2016-06-22T06:18:51+01:00',
             originalSection: section.slug
           }]
         }
         return newResponse
      }
      if (!section.articles) {
        return newResponse
      }
     newResponse[slug] = {
       title: getAlternativeTitle(section.slug, section.id) || section.title,
       headlines: [...existingHeadlines, ...section.articles.map(article => ({
         id: article.id,
         title: article.title,
         image: article.image,
         published: article.published,
         originalSection: section.slug
       }))]
     }
      // console.log('Response ', newResponse)
      return newResponse
    }, {});
  } catch (e) {
    console.error(e)
  }
}

function getAlternativeSlug(slug, id) {
  if (localSections.indexOf(slug) > -1) return 'local'
  if (id === 3057) return 'top-stories'
  if (id === 3135) return 'sport'
  return undefined
}

function getAlternativeTitle (slug, id) {
  if (localSections.indexOf(slug) > -1) return 'Local'
  if (id === 3057) return 'Top Stories'
  if (id === 3135) return 'Sport'
  return undefined
}
