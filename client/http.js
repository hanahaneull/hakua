const got = require('got')
const BASE = 'https://discord.com/api'
const VERSION = 'v9'
const ENDPOINT = `${BASE}/${VERSION}`

module.exports = class HTTP {
  constructor (client) {
    this.token = client.token
    this.device = client.device
    this.client = got.extend({
      prefixUrl: ENDPOINT,
      headers: {
        authorization: client.token,
        'User-Agent': client.device.browser_user_agent,
        'X-Super-Properties': Buffer.from(client.device.browser_user_agent).toString('base64')
      },
      responseType: 'json',
      resolveBodyOnly: true
    })
  }
}
