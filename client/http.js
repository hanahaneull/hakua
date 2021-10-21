const got = require('got')
const device = require('./device')
const BASE = 'https://discord.com/api'
const VERSION = 'v9'
const ENDPOINT = `${BASE}/${VERSION}`

module.exports = class HTTP {
  constructor (token = '') {
    this.token = token
    this.device = device
    this.client = got.extend({
      prefixUrl: ENDPOINT,
      headers: {
        authorization: token,
        'User-Agent': device.browser_user_agent,
        'X-Super-Properties': Buffer.from(device.browser_user_agent).toString('base64')
      },
      responseType: 'json',
      resolveBodyOnly: true
    })
  }


}
