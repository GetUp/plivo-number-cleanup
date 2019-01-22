'use strict'

const rp = require('request-promise-native')
const fs = require('fs')

const file = 'numbers.txt'
const username = process.env['PLIVO_AUTH_ID']
const password = process.env['PLIVO_AUTH_TOKEN']
const auth = Buffer.from(`${username}:${password}`).toString('base64')
const initial = `/v1/Account/${username}/Number/`
const host = `https://api.plivo.com`
const headers = { 'Authorization': `Basic ${auth}` }
const defaults = {
  method: 'GET',
  headers,
  json: true,
}
const fields = ['number', 'alias', 'number_type', 'application']

fs.appendFileSync(file, `${fields.join(',')}\n`)

const request = async (path) => {
  if (path == null) return
  const options = Object.assign({ uri: `${host}${path}` }, defaults)
  const response = await rp(options)
  const lines = response.objects.map(o => fields.map(f => o[f]).join(','))
  fs.appendFileSync(file, `${lines.join('\n')}\n`)
  request(response.meta.next)
}

request(initial).catch(console.error.bind(console))
