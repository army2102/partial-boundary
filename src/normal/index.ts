import { MongoClient } from 'mongodb'
import CryptoJS from 'crypto-js'
import { writeFile } from 'fs'

const main = async () => {
  const mongoClient = new MongoClient(
    'mongodb://root:root@localhost:27017/?authSource=admin'
  )
  const mongoConnection = await mongoClient.connect()
  const userCollection = mongoConnection
    .db('wisesight-trend')
    .collection('user')
  const users = await userCollection.find({ channel: 'facebook' }).toArray()
  const decodedUsers = users.map(user => {
    const decodedAccessToken = CryptoJS.AES.decrypt(
      user.accessToken,
      process.env.SECRET_KEY as string
    ).toString(CryptoJS.enc.Utf8)

    return {
      id: user._id.toHexString(),
      name: user.name,
      accessToken: decodedAccessToken
    }
  })
  const csvContent = {
    header: ['id', 'name', 'accessToken'],
    data: decodedUsers
  }
  const header = Object.keys(csvContent.header).join(',') + '\n'
  const rows = csvContent.data
    .map(obj => Object.values(obj).join(','))
    .join('\n')
  const csvData = header + rows
  const filename = 'Wisesight Trend Facebook User Access Token'
  writeFile(filename, csvData, err => {
    if (err) {
      console.error('Error writing CSV file:', err)
    } else {
      console.log(`CSV file "${filename}" created successfully.`)
    }
  })
}

main()
