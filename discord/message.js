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
}
