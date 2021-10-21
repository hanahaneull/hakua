const HTTP = require('./http')

const Channel = require('../discord/channel')

module.exports = class Discord {
  constructor (token = '') {
    this.token = token
    this.http = new HTTP(token)
    this.channel = new Channel(this.http.client)
    this.guild = 0
    this.message = 0
    this.user = 0
  }
}
