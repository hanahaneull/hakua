module.exports = class Message {
  constructor (client) {
    this.http = client.http.client
  }
}
