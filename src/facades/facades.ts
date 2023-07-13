import { MongoClient } from 'mongodb'
import CryptoJS from 'crypto-js'
import { writeFile } from 'fs'

export class Facades {
  constructor() {}
  public async getAllUsers() {
    const mongoClient = new MongoClient(
      'mongodb://root:root@localhost:27017/?authSource=admin'
    )
    const mongoConnection = await mongoClient.connect()
    const userCollection = mongoConnection
      .db('wisesight-trend')
      .collection('user')
    const users = await userCollection.find({ channel: 'facebook' }).toArray()

    return users
  }
  public decrypt(text: string) {
    const decodedText = CryptoJS.AES.decrypt(
      text,
      process.env.SECRET_KEY as string
    ).toString(CryptoJS.enc.Utf8)

    return decodedText
  }
  public createCsvFile(
    filename: string,
    csvContent: { header: string[]; data: object[] }
  ) {
    const header = Object.keys(csvContent.header).join(',') + '\n'
    const rows = csvContent.data
      .map(obj => Object.values(obj).join(','))
      .join('\n')
    const csvData = header + rows

    writeFile(filename, csvData, err => {
      if (err) {
        console.error('Error writing CSV file:', err)
      } else {
        console.log(`CSV file "${filename}" created successfully.`)
      }
    })
  }
}
