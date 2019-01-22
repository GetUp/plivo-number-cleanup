'use strict'

const rp = require('request-promise-native')
const fs = require('fs')

const file = 'numbers_to_delete.txt'
const username = process.env['PLIVO_AUTH_ID']
const password = process.env['PLIVO_AUTH_TOKEN']
const auth = Buffer.from(`${username}:${password}`).toString('base64')
const url = `https://api.plivo.com/v1/Account/${username}/Number/`
const headers = { 'Authorization': `Basic ${auth}` }
const defaults = {
  method: 'DELETE',
  headers,
  json: true,
  resolveWithFullResponse: true,
}

const numbers = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean)
const main = async () => {
  for (const number of numbers) {
    let response
    const options = Object.assign({ uri: `${url}${number}/` }, defaults)
    try {
      response = await rp(options)
    } catch (error) {
      if (error.statusCode === 404) {
        console.warn(`Number with ID ${number} already deleted`)
      } else {
        throw new Error(error)
      }
      continue
    }
    if (response.statusCode === 204) {
      console.log(`Deleted Number with ID: ${number}`)
    } else {
      throw new Error(response)
    }
  }
}

main().catch(console.error.bind(console))
