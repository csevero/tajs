import crypto from 'crypto'
import fsPromises from 'fs/promises'
import fs from 'fs'

export default class Service {
  #filename

  constructor({ filename }) {
    this.#filename = filename
  }

  #hashPassword(password) {
    const hash = crypto.createHash('sha256')
    hash.update(password)

    return hash.digest('hex')
  }

  async create({ username, password }) {
    const data = JSON.stringify({
      username,
      password: this.#hashPassword(password),
      createAt: new Date().toISOString()
    }).concat('\n')

    return fsPromises.appendFile(this.#filename, data)
  }

  async read() {
    const checkFileExists = fs.existsSync(this.#filename)

    if (!checkFileExists) return {}

    const lines = (await fsPromises.readFile(this.#filename, 'utf-8')).split('\n').filter(line => !!line)

    if (!lines.length) return {}

    return lines.map(line => JSON.parse(line)).map(({ password, ...rest }) => ({ ...rest }))
  }
}