const Metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const debug = require('metalsmith-debug')
const feed = require('metalsmith-feed')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown')
const metallic = require('metalsmith-metallic')
const moment = require('metalsmith-moment')
const permalinks = require('metalsmith-permalinks')
const jsonfeed = require('metalsmith-json-feed')

const isDev = !!process.env.DEVELOPMENT

module.exports = function () {
  Metalsmith(__dirname)
    .metadata({
      site: {
        url: isDev ? 'http://localhost:4000/' : 'https://TODO.YOUR.PRODUCTION.URL/',
        production_url: 'https://TODO.YOUR.PRODUCTION.URL/',
        title: 'TODO: YOUR SITE TITLE',
        description: 'TODO: YOUR SITE DESCRIPTION',
        generator: 'Metalsmith',
        author: 'TODO: YOUR NAME'
      },
      isDev,
      description: '',
      disqus: false
    })
    .source('./source')
    .destination('./public')
    .clean(false)
    .use(collections({
      posts: {
        pattern: ['*.md', '!index.md'].concat(isDev ? ['drafts/*.md'] : []),
        sortBy: 'date',
        reverse: true
      }
    }))
    .use(metallic())
    .use(markdown())
    .use(permalinks({
      relative: false
    }))
    .use(moment(['date']))
    .use(layouts({
      engine: 'ejs',
      default: 'post.ejs'
    }))
    .use(feed({
      collection: 'posts',
      description: 'TODO: YOUR FEED DESCRIPTION',
      destination: 'feed.xml'
    }))
    .use(jsonfeed({
      collection: 'posts',
      destination: 'feed.json'
    }))
    .use(debug())
    .build(function(err, files) {
      if (err) {
        console.log('❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌')
        console.log('Metalsmith build error:')
        console.log(err)
      }
    })
}
