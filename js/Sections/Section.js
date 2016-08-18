import React, { Component } from 'react'
import Feed from './Feed'
import requestRankedArticlesInSection from '../API/requestRankedArticlesInSection'
import Tombstones from '../TabNavigator/Tombstones'

export default class Section extends Component {

  static propTypes = {
    guid: React.PropTypes.number.isRequired
  }

  static defaultProps = {
    layout: 'chronological' // either chronological or ranked
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.shouldLoad && nextProps.shouldLoad && !this.state.loaded) {
      this.fetchArticles()
    }
  }

  componentWillMount() {
    if (this.props.shouldLoad) {
      this.fetchArticles()
    }
  }

  fetchArticles() {
    requestRankedArticlesInSection(this.props.guid).then((articles) => {
      this.setState({ articles, loaded: true })
    })
  }

  render() {
    if (!this.state.loaded) {
      return <Tombstones />
    } else {
      const { title, push, pop } = this.props
      return (
        <Feed
          onRefresh={this.fetchArticles.bind(this)}
          title={title}
          articles={this.state.articles}
          push={push}
          pop={pop}
          layout={this.props.layout}
        />
      )
    }
  }
}
