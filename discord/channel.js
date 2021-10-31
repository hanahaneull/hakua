module.exports = class Channel {
  constructor (client) {
    this.http = client.http.client
  }

  get(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) reject('Invalid channel ID')
      const res = await this.http(`channels/${id}`).catch(reject)
      resolve(res)
    })
  }

  send(id, message) {
    return new Promise(async (resolve, reject) => {
      if (!id) reject('Invalid channel ID')
      if (!message) reject('Message cannot be empty')
      const res = await this.http.post(`channels/${id}/messages`, {
        json: {
          content: message
        }
      }).catch(reject)
      resolve(res)
    })
  }

  create(guild, name, parent, type) {
    return new Promise(async (resolve, reject) => {
      if (!guild) reject('Invalid guild ID')
      if (!name) reject('Channel must have name')
      const res = await this.http.post(`guilds/${guild}/channels`, {
        json: {
          name,
          permission_overwrites: [],
          parent_id: parent,
          type: type?.toLowerCase() === 'voice' ? 2 : 0
        }
      }).catch(reject)
      resolve(res)
    })
  }

  rename(id, name) {
    return new Promise(async (resolve, reject) => {
      if (!id) reject('Invalid channel ID')
      if (!name) reject('Channel must have name')
      const res = await this.http.patch(`channels/${id}`, {
        json: {
          name
        }
      }).catch(reject)
      resolve(res)
    })
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) reject('Invalid channel ID')
      const res = await this.http.delete(`channels/${id}`).catch(reject)
      resolve(res)
    })
  }
}
