module.exports = class Message {
  constructor (client) {
    this.http = client.http.client
  }

  delete(channelID, messageID) {
    return new Promise(async (resolve, reject) => {
      if (!channelID) reject('Invalid channel ID')
      if (!messageID) reject('Invalid message ID')
      const res = this.http.delete(`channels/${channelID}/messages/${messageID}`).catch(reject)
      resolve(res)
    })
  }

  edit(channelID, messageID, content) {
    return new Promise(async (resolve, reject) => {
      if (!channelID) reject('Invalid channel ID')
      if (!messageID) reject('Invalid message ID')
      if (!content) reject('Message must have content')
      const res = this.http.patch(`channels/${channelID}/messages/${messageID}`, {
        json: {
          content
        }
      }).catch(reject)
      resolve(res)
    })
  }
}
