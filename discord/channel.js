module.exports = class Channel {
  constructor (client) {
    this.http = client.http.client
  }

  async get(id) {
    const res = await this.http(`channels/${id}`)
    console.log(res)
  }

  async send(id, message) {
    const res = await this.http.post(`channels/${id}/messages`, {
      json: {
        content: message
      }
    })
    console.log(res)
  }
}
