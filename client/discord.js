const HTTP = require('./http')
const got = require('got')
const UAParser = require('ua-parser-js')

const Channel = require('../discord/channel')

// noinspection SpellCheckingInspection
module.exports = class Discord {
  constructor (token, options) {
    this.token = token
    this.options = options
    this.loaded = false
  }

  async init(force) {
   const createDevice = async () => {
     const UAList = await got('https://jnrbsn.github.io/user-agents/user-agents.json', {
       resolveBodyOnly: true,
       responseType: 'json'
     })
     const distok = await got('http://distok.top/state.json', {
       resolveBodyOnly: true,
       responseType: 'json'
     })
     const UA = UAParser(UAList[~~Math.random() * UAList.length])

     this.device = {
       os: UA.os.name,
       browser: UA.browser.name,
       device: UA.device.vendor || '',
       system_locale: 'en-US',
       browser_user_agent: UA.ua,
       browser_version: UA.browser.version,
       os_version: UA.os.version,
       referrer: '',
       referring_domain: '',
       referrer_current: '',
       referring_domain_current: '',
       release_channel: 'stable',
       client_build_number: distok.assets.stable.build,
       client_event_source: null
     }
     this.http = new HTTP(this)
     this.channel = new Channel(this)
     this.loaded = true
   }
   if (force === true || !this.loaded) { await createDevice() }
   if (this.loaded) throw Error('Client already initialized!')
  }
}
