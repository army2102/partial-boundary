import { MongoClient } from 'mongodb'

import { UserDb, UserSchema } from './deps/userDb'
import { UseCase } from './useCases/usecase'
import { EncryptService } from './deps/encryptService'
import { CsvService } from './deps/csvService'

const main = async () => {
  const mongoClient = new MongoClient(
    'mongodb://root:root@localhost:27017/?authSource=admin'
  )
  const mongoConnection = await mongoClient.connect()
  const collection = mongoConnection
    .db('wisesight-trend')
    .collection<UserSchema>('users')
  const userDb = new UserDb(collection)
  const encryptService = new EncryptService(process.env.SECRET_KEY as string)
  const csvService = new CsvService()
  const useCase = new UseCase(userDb, encryptService, csvService)

  useCase.execute()
}

main()
