import React, { Component } from 'react'
import Feed from './Feed'

export default class TopStories extends Component {

  constructor(props) {
    super(props)
    this.articles = [
      {
        infoPanel: true,
        lastUpdatedTime: "12:01pm"
      },
      {
        title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
        imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "bigimage"
      },
      {
        title: "Murder probe after elderly man stabbed to death in street",
        imageURL: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "smallimage"
      },
      {
        author: "Melanie Reid",
        quote: "We need leaders like Theresa May and Nicola Sturgeon in a world gone mad",
        section: "POLITICS",
        type: "opinion"
      },
      {
        title: "North Sea Oil workers announce 48-hours offshore strike",
        imageURL: 'https://files.stv.tv/imagebase/431/w768/431609-generic-stock-coastguard-rescue-helicopter-rescuegeneric.jpg',
        section: "ABERDEEN & NORTH",
        type: "live"
      },
      {
        title: "5 Guys opens up in Glasgow City Centre",
        imageURL: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/2/c1/2c1b327d-5967-5d22-bc0e-6e61971f19cb/51416f5fe66d5.image.jpg',
        section: "LOCAL",
        type: "ad"
      },
      {
        title: "Sturgeon: Tackling 'unnacceptable' child poverty a priority",
        imageURL: 'https://files.stv.tv/imagebase/461/w768/461445-daniel-roche-left-ramona-marquez-and-tyger-drew-honey-in-2011.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "bigimage"
      },
      {
        title: "Murder probe after elderly man stabbed to death in street",
        imageURL: 'https://files.stv.tv/imagebase/13/w768/13179-crash-at-busy-city-roundabout.jpg',
        section: "GLASGOW & WEST",
        time: "34 MIN",
        type: "smallimage"
      },
      {
        author: "Melanie Reid",
        quote: "We need leaders like Theresa May and Nicola Sturgeon in a world gone mad",
        section: "POLITICS",
        type: "opinion"
      },
      {
        title: "North Sea Oil workers announce 48-hours offshore strike",
        imageURL: 'https://files.stv.tv/imagebase/431/w768/431609-generic-stock-coastguard-rescue-helicopter-rescuegeneric.jpg',
        section: "ABERDEEN & NORTH",
        type: "live"
      },
      {
        title: "5 Guys opens up in Glasgow City Centre",
        imageURL: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/2/c1/2c1b327d-5967-5d22-bc0e-6e61971f19cb/51416f5fe66d5.image.jpg',
        section: "LOCAL",
        type: "ad"
      }
    ]
  }

  componentWillMount() {
    this.fetchArticles()
  }

  fetchArticles() {
    console.log('Fetch articles')
  }

  render() {
    const { title, articles, push, pop } = this.props
    return (
      <Feed
        onRefresh={this.fetchArticles}
        title={title}
        articles={this.articles}
        push={push}
        pop={pop}
      />
    )
  }
}
